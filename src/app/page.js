import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { BenefitSection } from "@/components/BenefitSection";
import { Footer } from "@/components/Footer";
import { categories, benefits } from "@/data/store";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const { products, source } = await getFeaturedProducts();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="section section-tight">
          <div className="shell promo-banner">
            <div>
              <span className="eyebrow">Direcao da pesquisa</span>
              <h2>Marca forte, oferta visivel e navegacao por esporte</h2>
            </div>
            <div className="promo-points">
              <span>Preto como base visual</span>
              <span>Roupas esportivas em destaque</span>
              <span>Cadastro opcional para compra</span>
            </div>
          </div>
        </section>

        <ProductSection
          eyebrow="Esportes principais"
          title="Categorias organizadas do jeito que o publico prefere"
          description="A pesquisa mostrou que organizar por esporte ajuda mais do que esconder produtos em navegacao complexa."
          items={categories}
          isCategoryList
        />
        <ProductSection
          eyebrow="Promocoes e destaques"
          title={
            source === "database"
              ? "Vitrine conectada ao banco com foco comercial"
              : "Vitrine modelo baseada no Forms"
          }
          description={
            source === "database"
              ? "Os produtos abaixo estao vindo do Neon e seguem a linha de experiencia definida pela pesquisa."
              : "A vitrine foi reorganizada para destacar roupas esportivas, promocoes e avaliacao de produto."
          }
          items={products}
        />
        <BenefitSection items={benefits} />
      </main>
      <Footer />
    </>
  );
}
