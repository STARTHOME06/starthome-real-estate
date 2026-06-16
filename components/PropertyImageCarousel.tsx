"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice, Property } from "@/lib/data";

export function PropertyImageCarousel({ property }: { property: Property }) {
  const images = useMemo(() => {
    const gallery = property.images?.length ? property.images : [property.image];
    return gallery.filter(Boolean).slice(0, 8);
  }, [property.image, property.images]);
  const [index, setIndex] = useState(0);
  const current = images[index] || property.image;
  const hasControls = images.length > 1;

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
      <Link href={`/immobili/${property.slug}`} className="absolute inset-0 block" aria-label={`Apri ${property.title}`}>
        <Image
          src={current}
          alt={`${property.title}, foto ${index + 1}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </Link>

      <span className="absolute left-4 top-4 bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
        {property.contract}
      </span>
      <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-lg font-bold text-ink">
        {formatPrice(property)}
      </span>

      {hasControls && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg font-bold text-ink shadow transition hover:bg-gold hover:text-white"
            aria-label="Foto precedente"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg font-bold text-ink shadow transition hover:bg-gold hover:text-white"
            aria-label="Foto successiva"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
          <div className="absolute bottom-4 right-4 flex gap-1.5" aria-label="Selettore foto">
            {images.map((image, dotIndex) => (
              <button
                type="button"
                key={`${image}-${dotIndex}`}
                aria-label={`Vai alla foto ${dotIndex + 1}`}
                className={`h-2 rounded-full transition ${dotIndex === index ? "w-5 bg-gold" : "w-2 bg-white/80"}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
