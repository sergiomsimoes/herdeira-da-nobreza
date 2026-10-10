import { siteConfig } from "@/data/site-config";

type WhatsappInput = {
  consultation: string;
  option: string;
  payment: "Pix/débito" | "Cartão de crédito";
  extras?: string[];
  total: string;
};

export function createWhatsappLink(input: WhatsappInput) {
  const extras = input.extras?.length ? ` Adicionais: ${input.extras.join(", ")}.` : "";
  const message = `Olá! Vim pelo site da Herdeira da Nobreza e gostaria de contratar ${input.consultation}, opção ${input.option}, com pagamento por ${input.payment}.${extras} Total informado no site: ${input.total}. Poderia me orientar sobre os próximos passos?`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const generalWhatsappLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site da Herdeira da Nobreza e gostaria de receber orientações sobre as consultas.")}`;
