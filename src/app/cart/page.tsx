import { CartDisplay } from '@/components/cart/CartDisplay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review items in your shopping cart at Urban Armor Outfitters.',
};

export default function CartPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your Cart
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Review your selections and proceed to checkout.
        </p>
      </header>
      <CartDisplay />
    </div>
  );
}
