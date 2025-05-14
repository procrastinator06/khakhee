import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order from Urban Armor Outfitters has been successfully placed.',
};

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 text-center">
      <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-8" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
        Thank You for Your Order!
      </h1>
      <p className="text-lg text-muted-foreground mb-4">
        Your order has been successfully placed and is now being processed.
      </p>
      <p className="text-muted-foreground mb-8">
        You will receive an email confirmation shortly with your order details and tracking information.
      </p>
      <div className="space-x-4">
        <Link href="/products">
          <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/profile/orders"> {/* Assuming a future orders page */}
          <Button size="lg" variant="outline">
            View Order History
          </Button>
        </Link>
      </div>
    </div>
  );
}
