import importlib.util
import tempfile
import unittest
import xml.etree.ElementTree as ET
from unittest.mock import patch
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "sync_gestionale.py"
SPEC = importlib.util.spec_from_file_location("sync_gestionale", SCRIPT)
assert SPEC and SPEC.loader
sync = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(sync)


class GestionaleSyncTests(unittest.TestCase):
    def test_referenced_images_include_photos_and_floorplans(self):
        properties = [{
            "image": "/images/gestionale/gi-1-cover.jpg",
            "images": ["/images/gestionale/gi-1-cover.jpg", "/images/gestionale/gi-1-room.jpg"],
            "floorplans": ["/images/gestionale/gi-1-plan.png"],
        }]

        self.assertEqual(
            sync.referenced_gestionale_images(properties),
            {"gi-1-cover.jpg", "gi-1-room.jpg", "gi-1-plan.png"},
        )

    def test_orphaned_images_are_removed_but_current_images_remain(self):
        with tempfile.TemporaryDirectory() as temp_name:
            image_dir = Path(temp_name)
            current = image_dir / "gi-current.jpg"
            orphan = image_dir / "gi-deleted.jpg"
            unrelated = image_dir / "manual-image.jpg"
            current.touch()
            orphan.touch()
            unrelated.touch()

            original_dir = sync.IMAGE_DIR
            sync.IMAGE_DIR = image_dir
            try:
                removed = sync.remove_orphaned_images([{
                    "image": "/images/gestionale/gi-current.jpg",
                    "images": [],
                    "floorplans": [],
                }])
            finally:
                sync.IMAGE_DIR = original_dir

            self.assertEqual(removed, 1)
            self.assertTrue(current.exists())
            self.assertFalse(orphan.exists())
            self.assertTrue(unrelated.exists())


    def test_extension_change_with_same_content_reuses_original_asset(self):
        with tempfile.TemporaryDirectory() as tmp:
            image_dir = Path(tmp)
            original = image_dir / "gi-42-7.jpg"
            original.write_bytes(b"unchanged-photo")
            ann = ET.fromstring(
                "<annuncio><file_allegati><allegato>"
                "<id>7</id><file_path>https://example.com/photo.png</file_path>"
                "</allegato></file_allegati></annuncio>"
            )
            def fake_download(_url, destination, timeout=25):
                destination.write_bytes(b"unchanged-photo")
            with patch.object(sync, "IMAGE_DIR", image_dir), patch.object(sync, "download", fake_download):
                photos, plans = sync.sync_images(ann, "42", True, 12)
            self.assertEqual(photos, ["/images/gestionale/gi-42-7.jpg"])
            self.assertEqual(plans, [])
            self.assertTrue(original.exists())
            self.assertFalse((image_dir / "gi-42-7.png").exists())

    def test_changed_content_with_new_extension_creates_new_asset(self):
        with tempfile.TemporaryDirectory() as tmp:
            image_dir = Path(tmp)
            original = image_dir / "gi-42-7.jpg"
            original.write_bytes(b"old-photo")
            ann = ET.fromstring(
                "<annuncio><file_allegati><allegato>"
                "<id>7</id><file_path>https://example.com/photo.png</file_path>"
                "</allegato></file_allegati></annuncio>"
            )
            def fake_download(_url, destination, timeout=25):
                destination.write_bytes(b"new-photo")
            with patch.object(sync, "IMAGE_DIR", image_dir), patch.object(sync, "download", fake_download):
                photos, plans = sync.sync_images(ann, "42", True, 12)
            self.assertEqual(photos, ["/images/gestionale/gi-42-7.png"])
            self.assertEqual(plans, [])
            self.assertEqual(original.read_bytes(), b"old-photo")
            self.assertEqual((image_dir / "gi-42-7.png").read_bytes(), b"new-photo")


    def test_failed_download_with_changed_extension_preserves_existing_photo(self):
        with tempfile.TemporaryDirectory() as tmp:
            image_dir = Path(tmp)
            original = image_dir / "gi-42-7.jpg"
            original.write_bytes(b"previous-photo")
            ann = ET.fromstring(
                "<annuncio><file_allegati><allegato>"
                "<id>7</id><file_path>https://example.com/photo.png</file_path>"
                "</allegato></file_allegati></annuncio>"
            )
            def fake_download(_url, _destination, timeout=25):
                raise OSError("temporary failure")
            with patch.object(sync, "IMAGE_DIR", image_dir), patch.object(sync, "download", fake_download):
                photos, plans = sync.sync_images(ann, "42", True, 12)
            self.assertEqual(photos, ["/images/gestionale/gi-42-7.jpg"])
            self.assertEqual(plans, [])
            self.assertEqual(original.read_bytes(), b"previous-photo")


if __name__ == "__main__":
    unittest.main()
