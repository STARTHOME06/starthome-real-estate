"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Property } from "@/lib/data";

export function PropertyDetailGallery({ property }: { property: Property }) {
  const images = useMemo(() => {
    const source = property.images?.length ? property.images : [property.image];
    return [...new Set(source.filter(Boolean))];
  }, [property.image, property.images]);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const current = images[index] || property.image;
  const hasMultiple = images.length > 1;

  function goTo(next: number) {
    setIndex((next + images.length) % images.length);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, images.length]);

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 45) return;
    goTo(distance > 0 ? index - 1 : index + 1);
  }

  return (
    <>
      <div
        className="relative h-[45vh] min-h-[420px] overflow-hidden bg-ink lg:h-[65vh]"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={current}
          alt={`${property.title}, foto ${index + 1}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent"/>
        <span className="absolute bottom-5 right-5 rounded-sm bg-ink/80 px-4 py-2 text-xs font-bold text-white backdrop-blur">
          {index + 1} / {images.length}
        </span>
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Foto precedente"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-3xl text-ink shadow-xl transition hover:bg-gold hover:text-white sm:left-7"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Foto successiva"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-3xl text-ink shadow-xl transition hover:bg-gold hover:text-white sm:right-7"
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="border-b border-ink/10 bg-white">
          <div className="container-site flex gap-3 overflow-x-auto py-4">
            {images.map((image, thumbnailIndex) => (
              <button
                type="button"
                key={`${image}-${thumbnailIndex}`}
                onClick={() => setIndex(thumbnailIndex)}
                aria-label={`Mostra foto ${thumbnailIndex + 1}`}
                className={`relative h-20 w-28 shrink-0 overflow-hidden border-2 transition ${
                  thumbnailIndex === index ? "border-gold" : "border-transparent opacity-65 hover:opacity-100"
                }`}
              >
                <Image src={image} alt="" fill className="object-cover" sizes="112px"/>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
