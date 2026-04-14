import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsClientView } from "@/components/ProductsClientView";

export const metadata = {
  title: "Produtos | TupaSports",
  description: "Catalogo de artigos esportivos da TupaSports."
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="shell products-hero">
          <span className="eyebrow">Pagina de produtos</span>
          <h1>Catalogo conectado com a API do projeto</h1>
          <p>
            Esta pagina consome a rota <code>/api/produtos</code>. Assim, seu trabalho
            mostra frontend e backend funcionando juntos dentro do Next.js.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/">
              Voltar para a home
            </Link>
            <a className="btn btn-secondary" href="/api/produtos">
              Ver JSON da API
            </a>
          </div>
        </div>

        <div className="shell">
          <ProductsClientView />
        </div>
      </main>
      <Footer />
    </>
  );
}
