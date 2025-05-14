"use client";

import type { FilterOptions } from '@/lib/types';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  availableCategories: string[];
  availableSizes: string[];
  availableColors: string[];
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

export function ProductFilters({
  availableCategories,
  availableSizes,
  availableColors,
  maxPrice,
  onFilterChange,
  initialFilters = {}
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>(initialFilters.category || []);
  const [sizes, setSizes] = useState<string[]>(initialFilters.size || []);
  const [colors, setColors] = useState<string[]>(initialFilters.color || []);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [0, maxPrice]);

  useEffect(() => {
    setPriceRange(initialFilters.priceRange || [0, maxPrice]);
  }, [maxPrice, initialFilters.priceRange]);

  const handleCategoryChange = (category: string) => {
    setCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSizeChange = (size: string) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };
  
  const handleMinPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin >=0 && newMin <= priceRange[1]) {
      setPriceRange([newMin, priceRange[1]]);
    }
  };

  const handleMaxPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= priceRange[0] && newMax <= maxPrice) {
      setPriceRange([priceRange[0], newMax]);
    }
  };


  const applyFilters = () => {
    onFilterChange({
      category: categories.length > 0 ? categories : undefined,
      size: sizes.length > 0 ? sizes : undefined,
      color: colors.length > 0 ? colors : undefined,
      priceRange: (priceRange[0] === 0 && priceRange[1] === maxPrice) ? undefined : priceRange,
    });
  };

  const clearFilters = () => {
    setCategories([]);
    setSizes([]);
    setColors([]);
    setPriceRange([0, maxPrice]);
    onFilterChange({});
  };

  const hasActiveFilters = categories.length > 0 || sizes.length > 0 || colors.length > 0 || priceRange[0] !== 0 || priceRange[1] !== maxPrice;

  return (
    <div className="space-y-6 p-4 border border-border rounded-lg shadow-sm bg-card">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            <X className="w-3 h-3 mr-1" /> Clear All
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base">Category</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {availableCategories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <Slider
              min={0}
              max={maxPrice}
              step={1}
              value={priceRange}
              onValueChange={(value) => handlePriceChange(value as [number, number])}
              className="my-2"
            />
            <div className="flex justify-between items-center text-sm">
              <Input 
                type="number" 
                value={priceRange[0]} 
                onChange={handleMinPriceInputChange}
                className="w-20 h-8 text-xs"
                min={0}
                max={priceRange[1]}
              />
              <span>-</span>
              <Input 
                type="number" 
                value={priceRange[1]} 
                onChange={handleMaxPriceInputChange}
                className="w-20 h-8 text-xs"
                min={priceRange[0]}
                max={maxPrice}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-base">Size</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 grid grid-cols-2 gap-2">
            {availableSizes.map(size => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={sizes.includes(size)}
                  onCheckedChange={() => handleSizeChange(size)}
                />
                <Label htmlFor={`size-${size}`} className="font-normal">{size}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-base">Color</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 grid grid-cols-2 gap-2">
            {availableColors.map(color => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={colors.includes(color)}
                  onCheckedChange={() => handleColorChange(color)}
                />
                 <div className="flex items-center gap-2">
                  <span style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} className="w-4 h-4 rounded-full border border-border"></span>
                  <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
                 </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Apply Filters</Button>
    </div>
  );
}
