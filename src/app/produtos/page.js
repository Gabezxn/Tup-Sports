import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsClientView } from "@/components/ProductsClientView";

export const metadata = {
  title: "Produtos | TupaSports",
  description: "Catálogo esportivo da Tupã Sports com filtros, promoções e experiência guiada por pesquisa."
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="shell products-hero products-hero-strong">
          <span className="eyebrow eyebrow-dark">Página de produtos</span>
          <h1>Uma vitrine feita para vender com clareza e estilo</h1>
          <p>
            Aqui entram as funcionalidades mais pedidas na pesquisa: filtros visíveis por esporte,
            marca, tamanho e preço, além de favoritos, comparação, cupons e chat de atendimento.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/">
              Voltar para a home
            </Link>
            <a className="btn btn-secondary" href="/api/produtos">
              Ver JSON da API interna
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
