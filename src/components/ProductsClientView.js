"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";

export function ProductsClientView() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [status, setStatus] = useState("loading");
  const [source, setSource] = useState("mock");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/produtos", { cache: "no-store" });
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        setProducts(data.produtos || []);
        setSource(data.origem || "mock");
        setStatus("success");
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);

        if (!isMounted) {
          return;
        }

        setStatus("error");
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const names = products.map((product) => product.tag);
    return ["Todos", ...new Set(names)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Todos") {
      return products;
    }

    return products.filter((product) => product.tag === selectedCategory);
  }, [products, selectedCategory]);

  if (status === "loading") {
    return <p className="feedback-box">Carregando produtos da TupaSports...</p>;
  }

  if (status === "error") {
    return (
      <p className="feedback-box">
        Nao foi possivel carregar os produtos agora. Tente novamente com o servidor em execucao.
      </p>
    );
  }

  return (
    <div className="products-layout">
      <div className="catalog-toolbar">
        <div>
          <span className="eyebrow">Catalogo completo</span>
          <h2>Explore a vitrine da TupaSports</h2>
          <p>
            Origem atual dos dados: <strong>{source === "database" ? "Neon" : "mock"}</strong>
          </p>
        </div>

        <div className="filter-list" aria-label="Filtrar produtos por categoria">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid items={filteredProducts} />
      ) : (
        <p className="feedback-box">Nenhum produto encontrado para esse filtro.</p>
      )}
    </div>
  );
}
