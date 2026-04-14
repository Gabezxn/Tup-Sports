import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";

export function ProductSection({
  eyebrow,
  title,
  description,
  items,
  isCategoryList = false
}) {
  const id = isCategoryList ? "categorias" : "produtos";

  return (
    <section className="section" id={id}>
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <ProductGrid items={items} isCategory={isCategoryList} />

        {!isCategoryList && (
          <div className="section-cta">
            <Link href="/produtos" className="btn btn-secondary">
              Abrir vitrine completa
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
