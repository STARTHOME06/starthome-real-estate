import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.starthome.it"),
  title: { default: `${site.name} | Agenzia immobiliare a Vigonza`, template: `%s | ${site.name}` },
  description: "Vendita, affitto e valutazione immobili tra Vigonza, Dolo, Pianiga e i comuni tra Padova e Venezia. Consulenza immobiliare concreta e su misura.",
  openGraph: { title: site.name, description: "La tua casa, il nostro metodo.", images: ["/images/starthome-real-estate-brand.webp"], locale: "it_IT", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it" data-scroll-behavior="smooth"><body className="font-sans antialiased"><Header/><main>{children}</main><Footer/><WhatsApp/></body></html>;
}
