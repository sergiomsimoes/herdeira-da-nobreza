import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://herdeira-da-nobreza.wavyspoon1.chatgpt.site"),
  title: "Herdeira da Nobreza | Cartomancia e Baralho Cigano",
  description: "Consultas com o Baralho Cigano por foto, áudio ou videochamada. Clareza, intuição e direcionamento com respeito e sabedoria.",
  openGraph: {
    title: "Herdeira da Nobreza",
    description: "A sua verdade, revelada com respeito e sabedoria.",
    images: ["/images/branding/brand-wide.png"],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
