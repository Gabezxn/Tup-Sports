"use client";

import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({
  items,
  isCategory = false,
  onToggleFavorite,
  onAddToCart
}) {
  return (
    <div className="grid">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          isCategory={isCategory}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
