"use client";
import { useWishlist } from '@/contexts/WishlistContext';
import { WishlistItemCard } from './WishlistItemCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';

export function WishlistDisplay() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20 bg-card p-8 rounded-lg shadow-md">
        <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-3">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your wishlist yet.
        </p>
        <Link href="/products">
          <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {wishlistItems.map(item => (
        <WishlistItemCard key={item.product.id} item={item} />
      ))}
    </div>
  );
}
