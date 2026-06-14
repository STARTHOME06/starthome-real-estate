import { Icon } from "@/components/Icons";
import { site, whatsappUrl } from "@/lib/site";

export function WhatsApp() {
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
    <a
      href={`tel:${site.phoneHref}`}
      aria-label={`Chiama STARTHOME REAL ESTATE al ${site.phoneDisplay}`}
      title={`Chiama ${site.phoneDisplay}`}
      className="grid h-14 w-14 place-items-center rounded-full border border-gold/70 bg-ink text-gold shadow-xl transition hover:scale-105 hover:bg-navy focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
    >
      <Icon name="phone" className="h-6 w-6"/>
    </a>
    <a
      href={whatsappUrl("Buongiorno STARTHOME REAL ESTATE, vorrei ricevere informazioni.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Scrivi a STARTHOME REAL ESTATE su WhatsApp"
      title="Scrivi su WhatsApp"
      className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-sm font-black text-white shadow-xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      WA
    </a>
  </div>;
}
