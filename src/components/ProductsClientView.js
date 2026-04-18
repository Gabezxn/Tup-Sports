"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

const coupons = {
  TUPA10: 0.1,
  PRIMEIRA15: 0.15,
  FRETEGRATIS: 0
};

const quickAnswers = [
  "Posso te ajudar com tamanhos, entrega ou cupons 😄",
  "Hoje as ofertas principais estão em roupas esportivas e corrida.",
  "Se quiser, use o cupom TUPA10 no fechamento para 10% OFF."
];

export function ProductsClientView() {
  const [products, setProducts] = useState([]);
  const [selectedSport, setSelectedSport] = useState("Todos");
  const [selectedPromo, setSelectedPromo] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedSize, setSelectedSize] = useState("Todos");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(260);
  const [status, setStatus] = useState("loading");
  const [source, setSource] = useState("mock");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [compare, setCompare] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, by: "bot", text: "Olá! Sou o atendimento da Tupã Sports." }
  ]);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/produtos", { cache: "no-store" });
        const data = await response.json();

        if (!isMounted) return;

        setProducts(data.produtos || []);
        setSource(data.origem || "mock");
        setStatus("success");
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        if (!isMounted) return;
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

  const brands = useMemo(() => ["Todas", ...new Set(products.map((item) => item.brand))], [products]);

  const sizes = useMemo(() => {
    const allSizes = products.flatMap((item) => item.sizes || []);
    return ["Todos", ...new Set(allSizes)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = normalizeText(search);

    return products.filter((product) => {
      const matchesSport = selectedSport === "Todos" || (product.sport || product.tag) === selectedSport;
      const matchesPromo =
        selectedPromo === "Todos" ||
        (selectedPromo === "Em oferta" ? product.promo : !product.promo);
      const matchesBrand = selectedBrand === "Todas" || product.brand === selectedBrand;
      const matchesSize = selectedSize === "Todos" || product.sizes?.includes(selectedSize);
      const matchesPrice = Number(product.priceValue) <= Number(maxPrice);
      const haystack = normalizeText(
        `${product.name} ${product.description} ${product.brand} ${product.sport} ${product.tag}`
      );
      const matchesSearch = !query || haystack.includes(query);

      return (
        matchesSport &&
        matchesPromo &&
        matchesBrand &&
        matchesSize &&
        matchesPrice &&
        matchesSearch
      );
    });
  }, [maxPrice, products, search, selectedBrand, selectedPromo, selectedSize, selectedSport]);

  const cartItems = useMemo(
    () => products.filter((product) => cart.includes(product.id)),
    [cart, products]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + Number(item.priceValue || 0), 0),
    [cartItems]
  );

  const discountPercent = coupons[couponApplied] || 0;
  const discountValue = subtotal * discountPercent;
  const total = subtotal - discountValue;

  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  }

  function handleToggleFavorite(item) {
    setFavorites((current) =>
      current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]
    );
  }

  function handleAddToCart(item) {
    setCart((current) => [...current, item.id]);
  }

  function handleCompare(item) {
    setCompare((current) => {
      if (current.includes(item.id)) {
        return current.filter((id) => id !== item.id);
      }
      if (current.length >= 3) {
        return [...current.slice(1), item.id];
      }
      return [...current, item.id];
    });
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!coupons[code] && code !== "FRETEGRATIS") {
      setCouponApplied("");
      return;
    }
    setCouponApplied(code);
  }

  function sendChatMessage() {
    const next = quickAnswers[chatMessages.length % quickAnswers.length];
    setChatMessages((current) => [
      ...current,
      { id: current.length + 1, by: "user", text: "Preciso de ajuda para comprar" },
      { id: current.length + 2, by: "bot", text: next }
    ]);
  }

  if (status === "loading") {
    return <p className="feedback-box">Carregando produtos da Tupã Sports...</p>;
  }

  if (status === "error") {
    return (
      <p className="feedback-box">
        Não foi possível carregar os produtos agora. Tente novamente com o servidor em execução.
      </p>
    );
  }

  const comparedItems = products.filter((item) => compare.includes(item.id));

  return (
    <div className="products-layout">
      <div className="catalog-toolbar catalog-toolbar-dark">
        <div className="catalog-copy">
          <span className="eyebrow eyebrow-dark">Catálogo completo</span>
          <h2>Busca fácil, filtros completos e destaque para promoções</h2>
          <p>
            Dados atuais: <strong>{source === "database" ? "Neon" : "mock"}</strong>. Navegação pensada
            para venda + divulgação da marca.
          </p>
        </div>

        <div className="catalog-metrics">
          <div>
            <strong>{products.length}</strong>
            <span>produtos em vitrine</span>
          </div>
          <div>
            <strong>{products.filter((p) => p.promo).length}</strong>
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

        <div className="filter-grid">
          <div className="filter-stack">
            <span className="field-label">Esporte</span>
            <div className="filter-list">
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
            <span className="field-label">Marca</span>
            <div className="filter-list">
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  className={`filter-chip ${selectedBrand === brand ? "active" : ""}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-stack">
            <span className="field-label">Tamanho</span>
            <div className="filter-list">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`filter-chip ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-stack">
            <span className="field-label">Oferta</span>
            <div className="filter-list">
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

        <label className="field">
          <span>Preço máximo: {formatCurrency(maxPrice)}</span>
          <input
            type="range"
            min="60"
            max="300"
            step="10"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </label>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid
          items={filteredProducts}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          onAddToCompare={handleCompare}
          favorites={favorites}
          cart={cart}
          compare={compare}
        />
      ) : (
        <p className="feedback-box">Nenhum produto encontrado para os filtros escolhidos.</p>
      )}

      <div className="commerce-grid">
        <section className="checkout-card">
          <span className="eyebrow">Carrinho e cupom</span>
          <h3>Fechamento rápido</h3>
          <p>Cadastro é opcional e só é necessário para finalizar pedido e acompanhar entrega.</p>

          <div className="coupon-row">
            <input
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              placeholder="Cupom: TUPA10"
            />
            <button type="button" className="btn btn-secondary" onClick={applyCoupon}>
              Aplicar
            </button>
          </div>

          <div className="summary-list">
            <p>
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </p>
            <p>
              <span>Desconto</span>
              <strong>- {formatCurrency(discountValue)}</strong>
            </p>
            <p className="summary-total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </p>
          </div>

          <details className="register-box">
            <summary>Finalizar como visitante ou com cadastro</summary>
            <div className="register-options">
              <button type="button" className="btn btn-secondary">Comprar como visitante</button>
              <button type="button" className="btn btn-primary">Entrar / cadastrar</button>
            </div>
          </details>
        </section>

        <section className="checkout-card">
          <span className="eyebrow">Comparação</span>
          <h3>Comparar produtos</h3>
          <p>Selecione até 3 itens e compare preço, nota e esporte.</p>
          {comparedItems.length === 0 ? (
            <p className="feedback-box">Nenhum item selecionado para comparação.</p>
          ) : (
            <div className="compare-table">
              {comparedItems.map((item) => (
                <article key={item.id}>
                  <strong>{item.name}</strong>
                  <span>{item.sport}</span>
                  <span>{item.price}</span>
                  <span>Nota {item.rating}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="chat-box">
        <button type="button" className="chat-toggle" onClick={() => setChatOpen((current) => !current)}>
          {chatOpen ? "Fechar chat" : "Abrir chat de atendimento"}
        </button>

        {chatOpen ? (
          <div className="chat-window">
            <div className="chat-messages">
              {chatMessages.map((message) => (
                <p key={message.id} className={`chat-message ${message.by}`}>
                  {message.text}
                </p>
              ))}
            </div>
            <button type="button" className="btn btn-primary" onClick={sendChatMessage}>
              Enviar mensagem rápida
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
