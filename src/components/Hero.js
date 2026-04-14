import Link from "next/link";
import { surveyHighlights } from "@/data/store";

export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-panel">
        <div className="hero-copy hero-copy-dark">
          <span className="eyebrow eyebrow-dark">Resultado da pesquisa do publico</span>
          <h1>TupaSports com visual forte, compra facil e foco em roupas esportivas.</h1>
          <p>
            O site agora segue o que mais apareceu no Forms: estilo moderno e sofisticado,
            preto como cor principal, destaque para roupas esportivas e jornada simples
            para vender e fortalecer a marca ao mesmo tempo.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#produtos">
              Ver ofertas
            </a>
            <Link className="btn btn-secondary" href="/produtos">
              Explorar catalogo
            </Link>
          </div>

          <div className="hero-stats hero-stats-compact">
            <div>
              <strong>41</strong>
              <span>pessoas priorizaram facilidade de uso</span>
            </div>
            <div>
              <strong>32</strong>
              <span>preferiram roupas esportivas em destaque</span>
            </div>
            <div>
              <strong>42</strong>
              <span>querem produtos organizados por esporte</span>
            </div>
          </div>
        </div>

        <aside className="hero-highlight hero-highlight-light">
          <span className="eyebrow">Leitura da pesquisa</span>
          <h2>Direcao visual adotada</h2>
          <div className="insight-list">
            {surveyHighlights.map((item) => (
              <article key={item.id} className="insight-card">
                <p className="insight-label">{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.detail}</span>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
