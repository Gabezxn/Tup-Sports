import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({ items, isCategory = false }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} isCategory={isCategory} />
      ))}
    </div>
  );
}
