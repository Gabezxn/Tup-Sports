"use client";

export function ProductCard({ item, isCategory = false, onToggleFavorite, onAddToCart }) {
  const sizes = item.sizes?.join(" · ");

  return (
    <article className={`product-card ${item.promo ? "product-card-featured" : ""}`}>
      <div className="product-image">
        <span>{item.visual}</span>
        {!isCategory && item.discount ? <small>{item.discount}</small> : null}
      </div>

      <div className="product-meta">
        <div>
          <span className="tag">{item.tag}</span>
          <h3>{item.name}</h3>
        </div>
        {!isCategory && <span className="price">{item.price}</span>}
      </div>

      <p>{item.description}</p>

      {!isCategory && (
        <>
          <div className="product-details">
            <span>{item.sport}</span>
            <span>{item.brand}</span>
            <span>{item.rating} / 5</span>
          </div>
          {sizes ? <p className="product-sizes">Tamanhos: {sizes}</p> : null}
          <div className="product-actions">
            <button type="button" className="product-action ghost" onClick={() => onToggleFavorite?.(item)}>
              Favoritar
            </button>
            <button type="button" className="product-action solid" onClick={() => onAddToCart?.(item)}>
              Adicionar ao carrinho
            </button>
          </div>
        </>
      )}
    </article>
  );
}
