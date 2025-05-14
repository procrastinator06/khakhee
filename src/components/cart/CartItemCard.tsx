"use client";
import type { CartItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const { toast } = useToast();

  const handleRemove = () => {
    removeFromCart(item.product.id, item.selectedSize, item.selectedColor);
    toast({
      title: "Item Removed",
      description: `${item.product.name} has been removed from your cart.`,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    updateQuantity(item.product.id, item.selectedSize, item.selectedColor, newQuantity);
  };

  return (
    <div className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${item.product.slug}`} className="shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={100}
          height={133} // Maintain 3:4 aspect ratio
          className="rounded-md object-cover"
          data-ai-hint={`${item.product.category} clothing`}
        />
      </Link>
      <div className="flex-grow space-y-1">
        <Link href={`/products/${item.product.slug}`}>
          <h3 className="font-semibold text-lg hover:text-accent transition-colors">{item.product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          Size: {item.selectedSize} / Color: {item.selectedColor}
        </p>
        <p className="text-sm text-muted-foreground">Unit Price: ${item.product.price.toFixed(2)}</p>
        <div className="flex items-center pt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            readOnly
            className="h-8 w-12 text-center mx-1 bg-background border-x-0 rounded-none focus-visible:ring-0"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right space-y-2">
        <p className="text-lg font-semibold">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <Button onClick={handleRemove} variant="ghost" size="icon" aria-label="Remove from cart">
          <X className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
        </Button>
      </div>
    </div>
  );
}
