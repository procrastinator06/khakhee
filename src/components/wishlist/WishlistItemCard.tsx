"use client";
import type { WishlistItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";

interface WishlistItemCardProps {
  item: WishlistItem;
}

export function WishlistItemCard({ item }: WishlistItemCardProps) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleRemove = () => {
    removeFromWishlist(item.product.id);
    toast({
      title: "Removed from Wishlist",
      description: `${item.product.name} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = () => {
    // Assuming default size/color for simplicity when adding from wishlist
    // A more complex app might store selected size/color in wishlist or prompt user
    const defaultSize = item.product.sizes[0];
    const defaultColor = item.product.colors[0];
    addToCart(item.product, 1, defaultSize, defaultColor);
    removeFromWishlist(item.product.id); // Optionally remove from wishlist after adding to cart
    toast({
      title: "Added to Cart",
      description: `${item.product.name} has been moved to your cart.`,
    });
  };

  return (
    <div className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${item.product.slug}`} className="shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={80}
          height={107} // Maintain 3:4 aspect ratio
          className="rounded-md object-cover"
          data-ai-hint={`${item.product.category} clothing`}
        />
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.product.slug}`}>
          <h3 className="font-semibold text-lg hover:text-accent transition-colors">{item.product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{item.product.category}</p>
        <p className="text-md font-medium mt-1">${item.product.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Button onClick={handleAddToCart} size="sm" variant="outline" className="group">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover:text-accent transition-colors" /> Add to Cart
        </Button>
        <Button onClick={handleRemove} variant="ghost" size="icon" aria-label="Remove from wishlist">
          <X className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
        </Button>
      </div>
    </div>
  );
}
