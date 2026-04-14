export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Projeto escolar com Next.js</span>
          <h1>Energia, esporte e tecnologia em uma loja online.</h1>
          <p>
            A TupaSports foi pensada para vender roupas, bolas, tênis e acessórios
            esportivos com navegação simples, visual moderno e estrutura pronta para
            crescer com cadastro de produtos e pedidos.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#produtos">
              Ver vitrine
            </a>
            <a className="btn btn-secondary" href="#contato">
              Planejar deploy
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>+30</strong>
              <span>produtos demonstrativos</span>
            </div>
            <div>
              <strong>3</strong>
              <span>categorias principais</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>estrutura pronta para Vercel</span>
            </div>
          </div>
        </div>

        <aside className="hero-highlight">
          <span className="eyebrow">Próxima etapa</span>
          <h2>Integração com banco online</h2>
          <p>
            Para este projeto, o ideal é usar Neon com PostgreSQL. Mesmo que você
            conheça MySQL, a lógica de banco relacional continua muito parecida.
          </p>
          <ul>
            <li>Cadastrar produtos no banco</li>
            <li>Mostrar catálogo dinâmico no site</li>
            <li>Preparar deploy grátis na Vercel</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
