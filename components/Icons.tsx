export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    area: <><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></>,
    bed: <><path d="M3 18v-7"/><path d="M21 18v-5a2 2 0 0 0-2-2H8"/><path d="M3 14h18"/><path d="M7 11V8H5a2 2 0 0 0-2 2v1"/></>,
    bath: <><path d="M4 12h16"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M5 18h14"/><path d="M7 21v-3"/><path d="M17 21v-3"/><path d="M4 12v2a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-2"/></>,
    garage: <><path d="m4 10 8-5 8 5"/><path d="M5 10v10h14V10"/><path d="M8 20v-6h8v6"/><path d="M9 17h6"/></>,
    kitchen: <><path d="M6 3v18"/><path d="M10 3v7a4 4 0 0 1-8 0V3"/><path d="M18 3v18"/><path d="M18 3c3 2 4 5 4 9h-4"/></>,
    sofa: <><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M4 12h16a2 2 0 0 1 2 2v5H2v-5a2 2 0 0 1 2-2Z"/><path d="M6 19v2"/><path d="M18 19v2"/></>,
    floorplan: <><path d="M4 4h16v16H4z"/><path d="M4 10h6"/><path d="M10 4v16"/><path d="M10 14h10"/><path d="M15 14v6"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
