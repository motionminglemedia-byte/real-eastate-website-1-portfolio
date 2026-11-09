import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#090c10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pheme-estate.com"),
  title: {
    default: "PHEME ESTATE — Mediterranean Architectural Living",
    template: "%s | PHEME Estate",
  },
  description:
    "Bespoke coastal villas, monolithic hillside architecture, and turnkey luxury residences in Limassol & Paphos, Cyprus.",
  keywords: [
    "Luxury Real Estate Cyprus",
    "Limassol Villas",
    "Paphos Coastal Estates",
    "Turnkey Architecture",
    "Mediterranean Modern Homes",
    "Pheme Estate",
  ],
  authors: [{ name: "PHEME Estate Atelier" }],
  creator: "PHEME Estate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pheme-estate.com",
    siteName: "PHEME Estate",
    title: "PHEME ESTATE — Mediterranean Architectural Living",
    description:
      "Every Pheme house starts with a blueprint... and ends with a masterpiece. Discover turnkey coastal estates in Cyprus.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "PHEME Estate Luxury Villa overlooking Mediterranean Sea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHEME ESTATE — Mediterranean Architectural Living",
    description:
      "Bespoke coastal villas, monolithic hillside architecture, and turnkey luxury residences in Cyprus.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=85",
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#090c10] text-[#f4f4f6] selection:bg-amber-400/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
