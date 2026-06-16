import { Property } from "@/lib/data";
import { Icon } from "./Icons";

type Feature = {
  icon: string;
  label: string;
  value: string;
};

function countLabel(value: number | undefined, singular: string, plural: string) {
  if (!value || value <= 0) return "";
  return `${value}${value >= 4 ? "+" : ""} ${value === 1 ? singular : plural}`;
}

export function propertyFeatures(property: Property): Feature[] {
  const kitchenLiving = property.livingKitchen
    ? "Soggiorno/cucina"
    : [property.livingRoom ? "Soggiorno" : "", property.kitchen ? "Cucina" : ""].filter(Boolean).join(" + ");

  return [
    { icon: "area", label: "Superficie", value: `${property.sqm} m²` },
    { icon: "bed", label: "Camere", value: countLabel(property.bedrooms, "camera", "camere") || `${property.rooms} locali` },
    { icon: "bath", label: "Bagni", value: countLabel(property.bathrooms, "bagno", "bagni") || "Bagni n.d." },
    { icon: "garage", label: "Garage", value: countLabel(property.garages, "garage", "garage") || "Garage n.d." },
    ...(kitchenLiving ? [{ icon: property.livingKitchen ? "sofa" : "kitchen", label: "Zona giorno", value: kitchenLiving }] : []),
    ...(property.floorplans?.length ? [{ icon: "floorplan", label: "Planimetria", value: `${property.floorplans.length} planimetria` }] : []),
  ];
}

export function PropertyFeatureBadges({ property, compact = false }: { property: Property; compact?: boolean }) {
  const features = propertyFeatures(property);
  return (
    <div className={compact ? "grid grid-cols-2 gap-3 text-xs font-semibold text-ink/60" : "grid gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-6"}>
      {features.map((feature) => compact ? (
        <span key={`${feature.label}-${feature.value}`} className="flex items-center gap-2">
          <Icon name={feature.icon} className="h-4 w-4 shrink-0 text-gold"/>
          {feature.value}
        </span>
      ) : (
        <div key={`${feature.label}-${feature.value}`} className="bg-white px-4 py-5">
          <Icon name={feature.icon} className="mb-3 h-5 w-5 text-gold"/>
          <strong className="block text-lg leading-tight">{feature.value}</strong>
          <span className="text-xs text-ink/45">{feature.label}</span>
        </div>
      ))}
    </div>
  );
}
