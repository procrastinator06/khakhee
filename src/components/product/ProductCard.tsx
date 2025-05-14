"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // For card, add with default size/color if available, or prompt user on product page
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, 1, defaultSize, defaultColor);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

  const handleToggleWishlist = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-accent/50 group">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} passHref className="block">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={800}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={`${product.category} clothing`}
            />
          </div>
        </Link>
        {product.rating && (
            <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {product.rating.toFixed(1)}
            </Badge>
          )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`} passHref>
          <CardTitle className="text-lg font-semibold mb-1 leading-tight hover:text-accent transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {product.description}
        </CardDescription>
        <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row sm:justify-between gap-2">
        <Button onClick={handleAddToCart} variant="outline" size="sm" className="w-full sm:w-auto group/cartbutton">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover/cartbutton:text-accent transition-colors" /> Add to Cart
        </Button>
        <Button onClick={handleToggleWishlist} variant="ghost" size="icon" className="group/wishbutton">
          <Heart className={`h-5 w-5 transition-colors group-hover/wishbutton:fill-destructive group-hover/wishbutton:text-destructive ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
          <span className="sr-only">Add to Wishlist</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
