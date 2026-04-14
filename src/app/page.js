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
        <ProductSection
          eyebrow="Categorias em destaque"
          title="Equipamentos para diferentes modalidades"
          description="Uma selecao visual para mostrar como a TupaSports atende estudantes, atletas amadores e clientes da cidade."
          items={categories}
          isCategoryList
        />
        <ProductSection
          eyebrow="Produtos populares"
          title={
            source === "database"
              ? "Vitrine principal vinda do banco"
              : "Vitrine principal da loja"
          }
          description={
            source === "database"
              ? "Esses produtos estao sendo carregados do Neon/PostgreSQL."
              : "Esses produtos sao exemplos para sua apresentacao. Depois podemos trocar os dados mockados por dados do banco."
          }
          items={products}
        />
        <BenefitSection items={benefits} />
      </main>
      <Footer />
    </>
  );
}
