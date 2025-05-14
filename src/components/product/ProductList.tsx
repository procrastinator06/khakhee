"use client";
import type { Product, FilterOptions, SortOption } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { SortDropdown } from './SortDropdown';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { products as allProducts } from '@/data/products'; // Using alias for clarity
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const ITEMS_PER_PAGE = 12;

export function ProductList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState<FilterOptions>(() => {
    const initialFilters: FilterOptions = {};
    const categoryParam = searchParams.get('category');
    if (categoryParam) initialFilters.category = categoryParam.split(',');
    // Add other params if needed (size, color, priceRange)
    return initialFilters;
  });

  const [sortOption, setSortOption] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'newest'
  );

  const availableCategories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category))), []);
  const availableSizes = useMemo(() => Array.from(new Set(allProducts.flatMap(p => p.sizes))), []);
  const availableColors = useMemo(() => Array.from(new Set(allProducts.flatMap(p => p.colors))), []);
  const maxPrice = useMemo(() => Math.max(...allProducts.map(p => p.price), 0), []);

  const updateURLParams = useCallback((newFilters: FilterOptions, newSort: SortOption) => {
    const params = new URLSearchParams();
    if (newFilters.category?.length) params.set('category', newFilters.category.join(','));
    if (newFilters.size?.length) params.set('size', newFilters.size.join(','));
    if (newFilters.color?.length) params.set('color', newFilters.color.join(','));
    if (newFilters.priceRange) {
      params.set('minPrice', newFilters.priceRange[0].toString());
      params.set('maxPrice', newFilters.priceRange[1].toString());
    }
    params.set('sort', newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);


  useEffect(() => {
    let tempProducts = [...allProducts];

    // Apply filters
    if (filters.category && filters.category.length > 0) {
      tempProducts = tempProducts.filter(p => filters.category!.includes(p.category));
    }
    if (filters.size && filters.size.length > 0) {
      tempProducts = tempProducts.filter(p => p.sizes.some(s => filters.size!.includes(s)));
    }
    if (filters.color && filters.color.length > 0) {
      tempProducts = tempProducts.filter(p => p.colors.some(c => filters.color!.includes(c)));
    }
    if (filters.priceRange) {
      tempProducts = tempProducts.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        tempProducts.sort((a,b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest': // Assuming products are initially sorted by newest or have an ID/date field
      default:
        tempProducts.sort((a,b) => parseInt(b.id) - parseInt(a.id)); // Simple ID sort for "newest"
        break;
    }
    
    setFilteredProducts(tempProducts);
    setCurrentPage(1); // Reset to first page on filter/sort change
    updateURLParams(filters, sortOption);

  }, [filters, sortOption, updateURLParams]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-1/4 xl:w-1/5">
        <ProductFilters
          availableCategories={availableCategories}
          availableSizes={availableSizes}
          availableColors={availableColors}
          maxPrice={maxPrice}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />
      </aside>
      <section className="w-full lg:w-3/4 xl:w-4/5">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <SortDropdown onSortChange={handleSortChange} currentSort={sortOption} />
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Separator className="mb-6" />
        {paginatedProducts.length > 0 ? (
          <div className={`gap-6 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' 
              : 'flex flex-col'
          }`}>
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No Products Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? 'default' : 'outline'}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
