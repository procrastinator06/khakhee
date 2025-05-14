import { getProductBySlug, products as allProducts } from '@/data/products';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
        title: product.name,
        description: product.description,
        images: product.image ? [product.image] : [],
    }
  };
}

// Optional: generateStaticParams if you want to pre-render paths for all products
// export async function generateStaticParams() {
//   return allProducts.map((product) => ({
//     slug: product.slug,
//   }));
// }
// This might be too many paths if there are many products. For now, dynamic rendering is fine.

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, the product you are looking for does not exist or may have been removed.</p>
        <Link href="/products">
            <Button variant="outline" size="lg">Back to All Products</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
