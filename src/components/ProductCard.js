"use client";

function renderStars(value) {
  const rounded = Math.round(Number(value) || 0);
  return "★".repeat(rounded).padEnd(5, "☆");
}

export function ProductCard({
  item,
  isCategory = false,
  onToggleFavorite,
  onAddToCart,
  onAddToCompare,
  isFavorite = false,
  inCart = false,
  isCompared = false
}) {
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
            <span className="rating-badge" title={`${item.rating} de 5`}>
              {renderStars(item.rating)} ({item.reviewCount})
            </span>
          </div>
          {sizes ? <p className="product-sizes">Tamanhos: {sizes}</p> : null}
          <div className="product-actions product-actions-3">
            <button type="button" className="product-action ghost" onClick={() => onToggleFavorite?.(item)}>
              {isFavorite ? "★ Favorito" : "☆ Favoritar"}
            </button>
            <button type="button" className="product-action ghost" onClick={() => onAddToCompare?.(item)}>
              {isCompared ? "Comparando" : "Comparar"}
            </button>
            <button type="button" className="product-action solid" onClick={() => onAddToCart?.(item)}>
              {inCart ? "Adicionado" : "Carrinho"}
            </button>
          </div>
        </>
      )}
    </article>
  );
}
