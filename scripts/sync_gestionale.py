#!/usr/bin/env python3
"""Importa il feed XML di GestionaleImmobiliare.it negli asset statici del sito."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import tarfile
import tempfile
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import unicodedata
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "gi-properties.json"
IMAGE_DIR = ROOT / "public" / "images" / "gestionale"

CATEGORIES = {
    1: "Casa indipendente", 2: "Bifamiliare", 3: "Trifamiliare",
    4: "Casa a schiera", 5: "Monolocale", 7: "Cantina", 8: "Garage",
    9: "Magazzino", 10: "Attività commerciale", 11: "Appartamento",
    12: "Attico", 13: "Rustico", 14: "Negozio", 15: "Quadrifamiliare",
    16: "Capannone", 17: "Ufficio", 18: "Villa", 19: "Terreno",
    20: "Laboratorio", 21: "Posto auto", 22: "Bed and breakfast",
    23: "Loft", 24: "Multiproprietà", 25: "Agriturismo", 26: "Palazzo",
    27: "Hotel", 28: "Stanza",
}

MICRO_CATEGORIES = {
    44: ("Monolocale", 1), 45: ("Bilocale", 2), 46: ("Trilocale", 3),
    47: ("Quadrilocale", 4), 48: ("Pentalocale", 5),
    49: ("Appartamento con più di 5 locali", 6), 50: ("Duplex", 4),
    51: ("Mansarda", 3), 65: ("Rustico di campagna", 4),
    72: ("Casale", 5), 77: ("Villa moderna", 5),
    78: ("Villa contemporanea", 5), 79: ("Villa d'epoca", 5),
    95: ("Villa veneta", 6),
}

ENERGY_CLASSES = {
    0: "In definizione", 1: "A+", 10: "A4", 11: "A3", 12: "A2",
    13: "A1", 2: "A", 3: "B", 4: "C", 5: "D", 6: "E", 7: "F",
    8: "G", 9: "Non soggetto",
}


def text(parent: ET.Element | None, name: str, default: str = "") -> str:
    if parent is None:
        return default
    value = parent.findtext(name)
    return value.strip() if value else default


def number(value: str, default: int = 0) -> int:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return default


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFD", value.lower())
    value = "".join(char for char in value if unicodedata.category(char) != "Mn")
    value = value.replace("'", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def clean_description(value: str) -> str:
    value = html.unescape(value or "")
    value = re.sub(r"<br\s*/?>", "\n", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def add_feed_options(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    query = dict(urllib.parse.parse_qsl(parsed.query, keep_blank_values=True))
    query.update({
        "abstract": "1",
        "latlng": "1",
        "geo_id": "1",
        "micro_categorie": "1",
        "video": "1",
        "virtual": "1",
    })
    return urllib.parse.urlunsplit(
        (parsed.scheme, parsed.netloc, parsed.path, urllib.parse.urlencode(query), parsed.fragment)
    )


def safe_extract(archive: tarfile.TarFile, destination: Path) -> None:
    destination = destination.resolve()
    for member in archive.getmembers():
        target = (destination / member.name).resolve()
        if destination not in target.parents and target != destination:
            raise RuntimeError("Archivio feed non sicuro")
    archive.extractall(destination)


def log(message: str) -> None:
    print(message, flush=True)


def download(url: str, destination: Path, timeout: int = 90) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": "STARTHOME-feed-sync/1.0"})
    with urllib.request.urlopen(request, timeout=timeout) as response, destination.open("wb") as output:
        shutil.copyfileobj(response, output)


def get_info_values(announcement: ET.Element) -> dict[int, int]:
    values: dict[int, int] = {}
    for item in announcement.findall("./info_inserite/info"):
        info_id = number(text(item, "id") or item.get("id", ""))
        if info_id:
            values[info_id] = number(text(item, "valore_assegnato"))
    return values


def floor_label(values: dict[int, int]) -> str:
    floor_number = values.get(33)
    if floor_number is not None and floor_number >= 0:
        return "Piano terra" if floor_number == 0 else f"{floor_number}° piano"
    for info_id, label in ((31, "Ultimo piano"), (30, "Piano intermedio"), (29, "Primo piano"), (28, "Piano terra"), (64, "Piano rialzato"), (63, "Piano seminterrato"), (27, "Piano interrato")):
        if values.get(info_id) == 1:
            return label
    return "Non indicato"


def image_extension(url: str) -> str:
    suffix = Path(urllib.parse.urlsplit(url).path).suffix.lower()
    return suffix if suffix in {".jpg", ".jpeg", ".png", ".webp", ".gif"} else ".jpg"


def sync_images(announcement: ET.Element, property_id: str, allow_download: bool) -> tuple[list[str], list[str]]:
    photos: list[str] = []
    floorplans: list[str] = []
    if not allow_download:
        return photos, floorplans

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    for index, attachment in enumerate(announcement.findall("./file_allegati/allegato"), start=1):
        url = text(attachment, "file_path")
        if not url.startswith(("http://", "https://")):
            continue
        attachment_id = text(attachment, "id", str(index))
        filename = f"gi-{slugify(property_id)}-{slugify(attachment_id)}{image_extension(url)}"
        destination = IMAGE_DIR / filename
        if allow_download and not destination.exists():
            try:
                download(url, destination, timeout=25)
            except Exception as error:
                log(f"Avviso: immagine non scaricata {url}: {error}")
                continue
        if not destination.exists() and allow_download:
            continue
        public_path = f"/images/gestionale/{filename}"
        is_floorplan = attachment.get("planimetria", "0") == "1"
        (floorplans if is_floorplan else photos).append(public_path)
    return photos, floorplans


def parse_feed(xml_path: Path, allow_image_download: bool) -> list[dict]:
    root = ET.parse(xml_path).getroot()
    announcements = [root] if root.tag == "annuncio" else root.findall(".//annuncio")
    properties: list[dict] = []
    log(f"Trovati {len(announcements)} annunci nel feed")

    for announcement in announcements:
        info = announcement.find("./info")
        if info is None:
            continue
        if number(text(info, "deleted")) == 1 or number(text(info, "flag_storico")) == 1:
            continue

        property_id = text(info, "id")
        if not property_id:
            continue
        values = get_info_values(announcement)
        contract = "affitto" if values.get(10) == 1 else "vendita"
        category_id = number(text(info, "categorie_id"))
        micro_id = number(text(info, "categorie_micro_id"))
        category = CATEGORIES.get(category_id, "Immobile")
        micro = MICRO_CATEGORIES.get(micro_id)
        property_type = micro[0] if micro else category
        city = text(info, "comune", "Località riservata").title()
        zone = text(info, "zona", "Zona riservata")
        title = f"{property_type} a {city}"
        if zone and zone.lower() not in {"zona riservata", city.lower()}:
            title += f" - {zone}"

        rooms = values.get(65, 0)
        if not rooms and micro:
            rooms = micro[1]
        if not rooms:
            rooms = max(values.get(2, 0) + 1, 1)

        photos, floorplans = sync_images(announcement, property_id, allow_image_download)
        fallback = "/images/appartamento-vigonza.webp"
        if category_id in {1, 2, 3, 4, 13, 15, 18}:
            fallback = "/images/casale-dolo.webp"
        elif category_id == 12:
            fallback = "/images/attico-padova.webp"

        description = clean_description(text(info, "description") or text(info, "abstract"))
        if not description:
            description = f"{property_type} disponibile a {city}. Contattaci per ricevere informazioni complete e concordare una visita."

        address = text(info, "indirizzo")
        latitude = text(info, "latitude")
        longitude = text(info, "longitude")
        energy = ENERGY_CLASSES.get(values.get(55, -1), "Non indicata")

        properties.append({
            "id": text(info, "agency_code") or f"GI-{property_id}",
            "slug": f"{slugify(property_type)}-{slugify(city)}-{property_id}",
            "title": title,
            "city": city,
            "zone": zone or "Zona riservata",
            "contract": contract,
            "type": category,
            "price": number(text(info, "price")),
            "sqm": number(text(info, "mq")),
            "rooms": rooms,
            "bathrooms": max(values.get(1, 0), 0),
            "floor": floor_label(values),
            "energy": energy,
            "image": photos[0] if photos else fallback,
            "images": photos,
            "floorplans": floorplans,
            "featured": values.get(42) == 1 or number(text(info, "flag_vetrina")) == 1 or number(text(info, "flag_carosello")) == 1,
            "description": description,
            "address": address,
            "latitude": float(latitude) if latitude else None,
            "longitude": float(longitude) if longitude else None,
            "updatedAt": text(info, "last_editor_time"),
            "source": "gestionale",
        })

    return sorted(properties, key=lambda item: (not item["featured"], item["city"], item["id"]))


def within_download_window() -> bool:
    hour = datetime.now(ZoneInfo("Europe/Rome")).hour
    return hour >= 21 or hour < 7


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, help="XML locale per test")
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--allow-outside-window", action="store_true", help="Solo per test con XML locale")
    parser.add_argument("--skip-images", action="store_true")
    args = parser.parse_args()

    if args.input:
        xml_path = args.input
        properties = parse_feed(xml_path, not args.skip_images)
    else:
        if not within_download_window() and not args.allow_outside_window:
            raise SystemExit("Download consentito solo tra le 21:00 e le 07:00 Europe/Rome")
        feed_url = os.environ.get("GI_FEED_URL", "").strip()
        if not feed_url:
            raise SystemExit("Variabile GI_FEED_URL mancante")
        download_images = os.environ.get("GI_DOWNLOAD_IMAGES", "").strip() == "1"
        with tempfile.TemporaryDirectory(prefix="gi-feed-") as temp_name:
            temp = Path(temp_name)
            archive_path = temp / "feed.tar.gz"
            try:
                log("Scarico il feed del gestionale")
                download(add_feed_options(feed_url), archive_path)
            except Exception as error:
                raise SystemExit(f"Download feed fallito: {type(error).__name__}") from None
            log("Feed scaricato, estraggo l'archivio")
            with tarfile.open(archive_path, "r:gz") as archive:
                safe_extract(archive, temp)
            xml_files = list(temp.rglob("*.xml"))
            if not xml_files:
                raise SystemExit("Nessun XML trovato nel feed")
            if download_images:
                log("Download immagini abilitato")
            else:
                log("Download immagini disattivato: uso immagini provvisorie del sito")
            properties = parse_feed(xml_files[0], download_images)

    if not properties:
        raise SystemExit("Il feed non contiene annunci pubblicabili: dati esistenti non modificati")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(properties, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    try:
        output_name = args.output.relative_to(ROOT)
    except ValueError:
        output_name = args.output
    print(f"Sincronizzati {len(properties)} immobili in {output_name}")


if __name__ == "__main__":
    main()
