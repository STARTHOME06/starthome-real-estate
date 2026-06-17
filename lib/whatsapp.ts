import { site } from "@/lib/site";

type WhatsAppAutoReplyInput = {
  typeLabel: string;
  name: string;
  phone: string;
};

export function isWhatsAppConfigured() {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID &&
    process.env.WHATSAPP_TEMPLATE_NAME,
  );
}

function normalizeItalianPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("39")) return digits;
  return `39${digits}`;
}

export async function sendWhatsAppAutoReply({ typeLabel, name, phone }: WhatsAppAutoReplyInput) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "it";
  const to = normalizeItalianPhone(phone);

  if (!accessToken || !phoneNumberId || !templateName || !to) {
    return { configured: false, sent: false };
  }

  const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: templateLanguage },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name },
              { type: "text", text: typeLabel },
              { type: "text", text: site.phoneDisplay },
            ],
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    console.error("Errore WhatsApp Cloud API", response.status, await response.text());
  }

  return { configured: true, sent: response.ok };
}
