export function ProductCard({ item, isCategory = false }) {
  return (
    <article className="product-card">
      <div className="product-image">{item.visual}</div>

      <div className="product-meta">
        <div>
          <span className="tag">{item.tag}</span>
          <h3>{item.name}</h3>
        </div>
        {!isCategory && <span className="price">{item.price}</span>}
      </div>

      <p>{item.description}</p>
    </article>
  );
}
