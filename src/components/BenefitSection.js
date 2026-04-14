import { expectedFeatures, purchaseJourney } from "@/data/store";

export function BenefitSection({ items }) {
  return (
    <section className="section" id="diferenciais">
      <div className="shell benefit-layout">
        <div>
          <div className="section-head">
            <span className="eyebrow">Experiencia esperada</span>
            <h2>O site foi reposicionado para o que o publico realmente quer</h2>
            <p>
              A proposta mistura facilidade de uso, apelo comercial e linguagem visual forte,
              mantendo o projeto simples de apresentar e de evoluir.
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

        <aside className="experience-panel">
          <div className="experience-block">
            <span className="eyebrow eyebrow-dark">Funcionalidades mais pedidas</span>
            <ul className="feature-list">
              {expectedFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="experience-block">
            <span className="eyebrow">Como o usuario navega</span>
            <div className="journey-list">
              {purchaseJourney.map((item) => (
                <article key={item.id} className="journey-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
