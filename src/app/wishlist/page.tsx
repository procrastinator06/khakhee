import { WishlistDisplay } from '@/components/wishlist/WishlistDisplay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'View and manage your saved items at Urban Armor Outfitters.',
};

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your Wishlist
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Items you've saved for later. Don't let them get away!
        </p>
      </header>
      <WishlistDisplay />
    </div>
  );
}
