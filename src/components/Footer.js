export function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="shell footer-grid footer-grid-dark">
        <div>
          <span className="eyebrow eyebrow-dark">TupaSports</span>
          <h3>Projeto escolar com identidade guiada por pesquisa</h3>
          <p>
            O site combina visual premium em preto, destaque comercial e estrutura moderna
            em Next.js para representar a marca e vender melhor.
          </p>
        </div>

        <div>
          <h3>Foco do projeto</h3>
          <ul>
            <li>Vendas e divulgacao da marca ao mesmo tempo</li>
            <li>Destaque para roupas esportivas</li>
            <li>Navegacao simples por esporte e promocoes</li>
          </ul>
        </div>

        <div>
          <h3>Infraestrutura</h3>
          <ul>
            <li>Frontend e backend com Next.js</li>
            <li>Banco online no Neon</li>
            <li>Publicacao pronta para Vercel</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
