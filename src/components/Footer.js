export function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="shell footer-grid">
        <div>
          <span className="eyebrow">TupaSports</span>
          <h3>Projeto de e-commerce esportivo</h3>
          <p>
            Desenvolvido para fins escolares com HTML, CSS, JavaScript, Node.js e
            Next.js.
          </p>
        </div>

        <div>
          <h3>Stack sugerida</h3>
          <ul>
            <li>Frontend: Next.js + CSS</li>
            <li>Backend: rotas do Next.js</li>
            <li>Banco online: Neon PostgreSQL</li>
          </ul>
        </div>

        <div>
          <h3>Deploy</h3>
          <ul>
            <li>Editor: Windsurf</li>
            <li>Hospedagem: Vercel</li>
            <li>Banco conectado por variável `DATABASE_URL`</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
