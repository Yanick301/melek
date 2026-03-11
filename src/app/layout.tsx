import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Melek Clothing | Friperie de Luxe & Élégance",
  description: "Découvrez notre collection exclusive de friperie sélectionnée avec soin. Style, classe et durabilité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
