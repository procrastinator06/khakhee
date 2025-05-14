import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: 'Urban Armor Outfitters',
    template: '%s | Urban Armor Outfitters',
  },
  description: 'Your premier source for high-quality combat dress and tactical gear. Explore our catalog of durable apparel and equipment designed for urban environments and demanding operations.',
  keywords: ['combat dress', 'tactical gear', 'military clothing', 'urban armor', 'outfitters', 'tactical apparel'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
