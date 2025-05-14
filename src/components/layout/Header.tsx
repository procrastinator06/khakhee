"use client";
import Link from 'next/link';
import { ShoppingCart, Heart, Shirt, Menu, Search, User } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/style-advisor', label: 'Style Advisor' },
  // { href: '/about', label: 'About Us' },
  // { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { getItemCount: getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const pathname = usePathname();

  const cartCount = getCartItemCount();
  const wishlistCount = getWishlistItemCount();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground",
          pathname === href ? "text-accent-foreground bg-accent/10" : "text-muted-foreground"
        )}
      >
        {children}
      </Button>
    </Link>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map(link => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/wishlist" passHref>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 min-w-4 p-0 flex items-center justify-center text-xs">
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 min-w-4 p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
           <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          {/* Mobile Navigation Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
              <div className="mb-6">
                <Link href="/" className="flex items-center">
                  <Logo className="h-8 w-auto" />
                </Link>
              </div>
              <div className="relative mb-6">
                <Input type="search" placeholder="Search products..." className="w-full pl-8" />
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <nav className="flex flex-col space-y-3">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} passHref>
                     <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-base",
                          pathname === link.href ? "text-accent-foreground bg-accent/10" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </Button>
                  </Link>
                ))}
              </nav>
               <div className="mt-8 border-t pt-6">
                 <Link href="/profile" passHref>
                    <Button variant="outline" className="w-full justify-start text-base">
                      <User className="mr-2 h-5 w-5" />
                      My Account
                    </Button>
                  </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
