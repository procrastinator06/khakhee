import { ProductList } from '@/components/product/ProductList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our full collection of combat dress, tactical gear, and accessories at Urban Armor Outfitters.',
};

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Our Collection
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore high-performance gear designed for the modern operator.
        </p>
      </header>
      <ProductList />
    </div>
  );
}
