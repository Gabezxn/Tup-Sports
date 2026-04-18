"use client";

import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({
  items,
  isCategory = false,
  onToggleFavorite,
  onAddToCart,
  onAddToCompare,
  favorites = [],
  cart = [],
  compare = []
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
          onAddToCompare={onAddToCompare}
          isFavorite={favorites.includes(item.id)}
          inCart={cart.includes(item.id)}
          isCompared={compare.includes(item.id)}
        />
      ))}
    </div>
  );
}
