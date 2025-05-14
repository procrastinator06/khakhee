"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock, ShoppingBag } from 'lucide-react';
import type { Metadata } from 'next';
import React from 'react';

// export const metadata: Metadata = { // Cannot export metadata from client component
//   title: 'Checkout',
//   description: 'Complete your purchase at Urban Armor Outfitters.',
// };


export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const total = getCartTotal();
  const itemCount = getItemCount();

  if (itemCount === 0 && typeof window !== 'undefined') { // Check typeof window to avoid issues during SSR/build
     // router.push('/products'); // This can cause issues during build or SSR due to conditional routing logic
     // Instead, render a message or redirect in useEffect
     React.useEffect(() => {
        router.push('/products');
        toast({
            title: "Cart Empty",
            description: "Your cart is empty. Add some products to checkout.",
            variant: "destructive",
        });
     }, [router, toast]);
     return <div className="text-center py-10">Redirecting to products page...</div>;
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock order placement
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
      duration: 5000,
    });
    clearCart();
    router.push('/order-confirmation'); // A mock confirmation page
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Checkout
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Securely complete your Urban Armor Outfitters purchase.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-card p-6 rounded-lg shadow-lg order-last lg:order-first">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-3">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={60}
                  height={80}
                  className="rounded-md object-cover"
                  data-ai-hint={`${item.product.category} clothing`}
                />
                <div className="flex-grow">
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.selectedSize} / {item.selectedColor} &times; {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$10.00 (Fixed)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span>${(total * 0.08).toFixed(2)} (Estimated)</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(total + 10 + total * 0.08).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 rounded-lg shadow-lg">
          <div>
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="John" required className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" placeholder="Doe" required className="mt-1 bg-background" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" type="text" placeholder="123 Tactical St" required className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" type="text" placeholder="Urbanville" required className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" type="text" placeholder="90210" required className="mt-1 bg-background" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-accent"/> Payment Details
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" type="text" placeholder="•••• •••• •••• ••••" required className="mt-1 bg-background" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="text" placeholder="MM/YY" required className="mt-1 bg-background" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" type="text" placeholder="123" required className="mt-1 bg-background" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Lock className="w-3 h-3 mr-1.5 text-green-500" />
            Your payment information is encrypted and secure.
          </div>

          <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <ShoppingBag className="mr-2 h-5 w-5" /> Place Order
          </Button>
          <div className="text-center">
            <Link href="/cart" className="text-sm text-accent hover:underline">
                Return to Cart
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
