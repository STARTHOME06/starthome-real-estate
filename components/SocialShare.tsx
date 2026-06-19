"use client";

import { useState } from "react";

export function SocialShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const message = `${title} - STARTHOME REAL ESTATE\n${url}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8 border-y border-ink/10 py-6">
      <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-navy">Condividi questo immobile</p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline min-h-10 px-4 py-2 text-xs"
        >
          Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[#25D366] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1fb85a]"
        >
          WhatsApp
        </a>
        <button type="button" onClick={copyLink} className="btn-outline min-h-10 px-4 py-2 text-xs">
          {copied ? "Link copiato" : "Copia link"}
        </button>
      </div>
      <p className="mt-3 text-xs leading-5 text-ink/45">Per Instagram copia il link e inseriscilo in una storia, nel profilo o invialo tramite messaggio.</p>
    </div>
  );
}
