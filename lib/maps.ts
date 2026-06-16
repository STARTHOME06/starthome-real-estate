import { Property } from "./data";

export function propertyMapQuery(property: Property) {
  if (property.latitude && property.longitude) {
    return `${property.latitude},${property.longitude}`;
  }

  return [property.address, property.city, "Veneto", "Italia"].filter(Boolean).join(", ");
}

export function googleMapsEmbedUrl(property: Property) {
  return `https://www.google.com/maps?q=${encodeURIComponent(propertyMapQuery(property))}&output=embed`;
}

export function googleMapsLink(property: Property) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyMapQuery(property))}`;
}
