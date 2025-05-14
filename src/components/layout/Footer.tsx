import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card text-card-foreground border-t border-border/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Equipping you for urban challenges with top-tier combat dress and gear.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Shop</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=Jackets" className="hover:text-accent-foreground transition-colors">Jackets</Link></li>
              <li><Link href="/products?category=Pants" className="hover:text-accent-foreground transition-colors">Pants</Link></li>
              <li><Link href="/products?category=Boots" className="hover:text-accent-foreground transition-colors">Boots</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-accent-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-accent-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-accent-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-accent-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Connect</h5>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-accent-foreground transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent-foreground transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent-foreground transition-colors"><Instagram size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent-foreground transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border/60 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Urban Armor Outfitters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
