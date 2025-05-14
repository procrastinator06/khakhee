import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import Image from 'next/image';
import { ChevronRight, ShieldCheck, Truck, Package } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4); // Show first 4 products as featured

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-card rounded-lg shadow-lg overflow-hidden">
        <Image 
          src="https://placehold.co/1600x600.png" 
          alt="Tactical gear layout"
          width={1600}
          height={600}
          priority
          className="object-cover w-full h-[400px] md:h-[500px] opacity-30"
          data-ai-hint="tactical gear military"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-background/70 to-transparent">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-md">
            Urban Armor <span className="text-accent">Outfitters</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-foreground/90 drop-shadow-sm">
            Elite combat dress and tactical gear for uncompromising performance. Built for the toughest missions.
          </p>
          <Link href="/products" passHref className="mt-8">
            <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-md shadow-lg transition-transform hover:scale-105">
              Shop Collection <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Gear</h2>
          <Link href="/products" passHref>
            <Button variant="outline">
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-card rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Urban Armor?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 border border-border rounded-md hover:shadow-lg transition-shadow">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Battle-Tested Quality</h3>
              <p className="text-muted-foreground text-sm">
                Our gear is sourced for durability and performance under pressure.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 border border-border rounded-md hover:shadow-lg transition-shadow">
              <Truck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Secure Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Get your mission-critical equipment delivered promptly and safely.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 border border-border rounded-md hover:shadow-lg transition-shadow">
              <Package className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground text-sm">
                Handpicked items to meet the demands of modern operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - AI Style Advisor */}
      <section className="text-center py-12 bg-secondary text-secondary-foreground rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Need a Tactical Edge?</h2>
        <p className="max-w-xl mx-auto text-lg mb-6">
          Let our AI Style Advisor help you find the perfect combat dress configuration for your specific needs and preferences.
        </p>
        <Link href="/style-advisor" passHref>
          <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-md shadow-lg transition-transform hover:scale-105">
            Get Style Advice
          </Button>
        </Link>
      </section>
    </div>
  );
}
