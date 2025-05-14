"use client";
import { useCart } from '@/contexts/CartContext';
import { CartItemCard } from './CartItemCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, PackageOpen } from 'lucide-react';

export function CartDisplay() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();

  const total = getCartTotal();
  const itemCount = getItemCount();

  if (itemCount === 0) {
    return (
      <div className="text-center py-20 bg-card p-8 rounded-lg shadow-md">
        <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-3">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">
          Time to gear up! Add some items to your cart.
        </p>
        <Link href="/products">
          <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        {cartItems.map(item => (
          <CartItemCard
            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
            item={item}
          />
        ))}
      </div>
      <div className="lg:col-span-1 bg-card p-6 rounded-lg shadow-lg space-y-4 sticky top-24">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal ({itemCount} items)</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <Separator />
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="w-full">
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4">
            <ShoppingBag className="mr-2 h-5 w-5" /> Proceed to Checkout
          </Button>
        </Link>
        <Button variant="outline" onClick={clearCart} className="w-full mt-2">
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
