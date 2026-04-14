"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

export function ProductsClientView() {
  const [products, setProducts] = useState([]);
  const [selectedSport, setSelectedSport] = useState("Todos");
  const [selectedPromo, setSelectedPromo] = useState("Todos");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("loading");
  const [source, setSource] = useState("mock");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

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

  const sports = useMemo(() => {
    const names = products.map((product) => product.sport || product.tag);
    return ["Todos", ...new Set(names)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSport =
        selectedSport === "Todos" || (product.sport || product.tag) === selectedSport;
      const matchesPromo =
        selectedPromo === "Todos" ||
        (selectedPromo === "Em oferta" ? product.promo : !product.promo);
      const query = normalizeText(search);
      const haystack = normalizeText(
        `${product.name} ${product.description} ${product.brand} ${product.sport} ${product.tag}`
      );
      const matchesSearch = !query || haystack.includes(query);

      return matchesSport && matchesPromo && matchesSearch;
    });
  }, [products, search, selectedPromo, selectedSport]);

  const offerCount = products.filter((product) => product.promo).length;

  function handleToggleFavorite(item) {
    setFavorites((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id]
    );
  }

  function handleAddToCart(item) {
    setCart((current) => [...current, item.id]);
  }

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
      <div className="catalog-toolbar catalog-toolbar-dark">
        <div className="catalog-copy">
          <span className="eyebrow eyebrow-dark">Catalogo completo</span>
          <h2>Busca facil, filtros visiveis e destaque para promocoes</h2>
          <p>
            Dados atuais: <strong>{source === "database" ? "Neon" : "mock"}</strong>. O layout
            segue o que o publico mais pediu no Forms.
          </p>
        </div>

        <div className="catalog-metrics">
          <div>
            <strong>{products.length}</strong>
            <span>produtos em vitrine</span>
          </div>
          <div>
            <strong>{offerCount}</strong>
            <span>em oferta</span>
          </div>
          <div>
            <strong>{favorites.length}</strong>
            <span>favoritos</span>
          </div>
          <div>
            <strong>{cart.length}</strong>
            <span>itens no carrinho</span>
          </div>
        </div>
      </div>

      <div className="filter-panel">
        <label className="field">
          <span>Buscar produto</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex: camisa, corrida, preto"
          />
        </label>

        <div className="filter-stack">
          <span className="field-label">Esporte</span>
          <div className="filter-list" aria-label="Filtrar produtos por esporte">
            {sports.map((sport) => (
              <button
                key={sport}
                type="button"
                className={`filter-chip ${selectedSport === sport ? "active" : ""}`}
                onClick={() => setSelectedSport(sport)}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-stack">
          <span className="field-label">Oferta</span>
          <div className="filter-list" aria-label="Filtrar produtos em oferta">
            {["Todos", "Em oferta", "Sem oferta"].map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-chip ${selectedPromo === option ? "active" : ""}`}
                onClick={() => setSelectedPromo(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid
          items={filteredProducts}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <p className="feedback-box">Nenhum produto encontrado para os filtros escolhidos.</p>
      )}
    </div>
  );
}
