import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Inhala Shisha & Lounge | Aguadulce, Almería",
  description:
    "El mejor ambiente del 501 en Aguadulce. Gran variedad de sabores de cachimbas, cócteles, crepes y batidos. Reserva tu mesa y disfruta de la mejor experiencia.",
  keywords: [
    "cachimbas aguadulce",
    "shisha lounge almeria",
    "inhala shisha",
    "inhala 501",
    "cocteles aguadulce",
    "pub aguadulce",
  ],
  openGraph: {
    title: "Inhala Shisha & Lounge | Aguadulce",
    description: "El mejor ambiente del 501 en Aguadulce. Shishas y cócteles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=Outfit:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
