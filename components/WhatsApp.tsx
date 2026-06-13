import { whatsappUrl } from "@/lib/site";

export function WhatsApp() {
  return <a href={whatsappUrl("Buongiorno STARTHOME REAL ESTATE, vorrei ricevere informazioni.")} target="_blank" rel="noreferrer" aria-label="Scrivi a STARTHOME REAL ESTATE su WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-sm font-black text-white shadow-xl transition hover:scale-105">WA</a>;
}
