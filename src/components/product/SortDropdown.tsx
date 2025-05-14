"use client";

import type { SortOption } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SortDropdownProps {
  onSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
}

const sortOptionsMap: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating-desc', label: 'Avg. Customer Review' },
];

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-products" className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by:</Label>
      <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger id="sort-products" className="w-full sm:w-[200px] bg-card">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          {sortOptionsMap.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
