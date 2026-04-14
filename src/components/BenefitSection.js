export function BenefitSection({ items }) {
  return (
    <section className="section" id="diferenciais">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Diferenciais</span>
          <h2>O que a TupaSports entrega para o cliente</h2>
          <p>
            Essa parte ajuda a explicar a proposta da loja na apresentação do seu
            trabalho.
          </p>
        </div>

        <div className="benefits">
          {items.map((item) => (
            <article key={item.id} className="benefit-card">
              <span className="tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
