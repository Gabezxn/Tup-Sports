import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsClientView } from "@/components/ProductsClientView";

export const metadata = {
  title: "Produtos | TupaSports",
  description: "Catalogo esportivo da TupaSports com filtros, promocoes e experiencia guiada por pesquisa."
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="shell products-hero products-hero-strong">
          <span className="eyebrow eyebrow-dark">Pagina de produtos</span>
          <h1>Uma vitrine feita para vender com clareza</h1>
          <p>
            Aqui entram as funcionalidades mais pedidas na pesquisa: filtros visiveis,
            busca, destaque para promocoes, favoritos, carrinho e leitura rapida dos produtos.
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
