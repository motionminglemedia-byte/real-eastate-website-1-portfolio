import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PHEME ESTATE — Luxury Real Estate Architecture",
  description: "Bespoke architectural villas and luxury Mediterranean estates in Cyprus.",
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
