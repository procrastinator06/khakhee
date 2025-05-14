"use client";

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Heart, ShoppingCart, Star, CheckCircle, ShieldAlert } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | undefined>(product.image);
  const [reviewCount, setReviewCount] = useState<number | null>(null);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setMainImage(product.image);
    // Generate review count client-side to avoid hydration issues
    if (product.rating) {
      setReviewCount(Math.floor(Math.random() * 50 + 5));
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select a size and color.",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}, ${selectedColor}) x${quantity} has been added to your cart.`,
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

  const allImages = [product.image, ...(product.images || [])].filter(Boolean) as string[];


  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden shadow-lg">
            <Image
              src={mainImage || product.image}
              alt={product.name}
              width={800}
              height={1066}
              className="object-cover w-full h-full transition-opacity duration-300"
              priority
              data-ai-hint={`${product.category} detail`}
            />
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-card rounded-md overflow-hidden border-2 transition-all ${mainImage === img ? 'border-accent shadow-md' : 'border-transparent hover:border-muted'}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    data-ai-hint={`${product.category} thumbnail`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            {product.rating && reviewCount !== null && (
              <>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">({product.rating.toFixed(1)} - {reviewCount} reviews)</span> 
                <Separator orientation="vertical" className="h-4" />
              </>
            )}
            <Badge variant="outline">{product.category}</Badge>
          </div>

          <p className="text-3xl font-semibold text-accent">${product.price.toFixed(2)}</p>

          {product.stock && product.stock > 0 ? (
             <div className="flex items-center text-sm text-green-500">
              <CheckCircle className="w-4 h-4 mr-1" />
              In Stock ({product.stock} available)
            </div>
          ) : (
            <div className="flex items-center text-sm text-red-500">
              <ShieldAlert className="w-4 h-4 mr-1" />
              Out of Stock
            </div>
          )}
         
          <p className="text-muted-foreground leading-relaxed">{product.longDescription || product.description}</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="size-select" className="text-sm font-medium">Size:</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size-select" className="mt-1 w-full sm:w-1/2 bg-card">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color-select" className="text-sm font-medium">Color:</Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-select" className="mt-1 w-full sm:w-1/2 bg-card">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map(color => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <span style={{ backgroundColor: color.toLowerCase().replace(' ','') }} className="w-4 h-4 rounded-full border border-border"></span>
                        {color}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
                <div className="flex items-center mt-1">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-9 w-9"> - </Button>
                    <input type="number" id="quantity" value={quantity} readOnly className="w-12 h-9 text-center border-y bg-card focus:outline-none" />
                    <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}  className="h-9 w-9"> + </Button>
                </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!product.stock || product.stock <=0}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button onClick={handleToggleWishlist} size="lg" variant="outline" className="group">
              <Heart className={`mr-2 h-5 w-5 transition-colors group-hover:fill-destructive group-hover:text-destructive ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : ''}`} />
              {isWishlisted(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Category: {product.category}</li>
                    <li>Materials: High-tensile Ripstop Nylon (example)</li>
                    <li>Origin: Designed in USA, Made in Vietnam (example)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm space-y-2">
                <p>Standard shipping: 5-7 business days. Express shipping: 2-3 business days.</p>
                <p>We offer a 30-day return policy on unworn items with original tags. Visit our <Link href="/shipping" className="underline hover:text-accent">Shipping & Returns</Link> page for more details.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
