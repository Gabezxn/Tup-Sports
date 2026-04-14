import { featuredProducts } from "@/data/store";
import { getPool, hasDatabaseUrl } from "@/lib/db";

function formatPrice(value) {
  return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}

function normalizeProduct(row) {
  const sport = row.categoria || "Esportivo";
  const featured = Boolean(row.destaque);

  return {
    id: String(row.id),
    name: row.nome,
    tag: featured ? "Oferta" : sport,
    price: formatPrice(row.preco),
    priceValue: Number(row.preco),
    description: row.descricao || "Produto esportivo em destaque na TupaSports.",
    visual: row.imagem || row.nome,
    sport,
    brand: "TupaSports",
    audience: "Unissex",
    rating: featured ? 4.9 : 4.6,
    reviewCount: featured ? 96 : 34,
    discount: featured ? "Oferta da semana" : "Disponivel",
    promo: featured,
    sizes: ["P", "M", "G", "GG"]
  };
}

export async function getFeaturedProducts() {
  if (!hasDatabaseUrl()) {
    return {
      source: "mock",
      products: featuredProducts
    };
  }

  try {
    const pool = getPool();
    const result = await pool.query(`
      SELECT id, nome, categoria, preco, imagem, descricao, destaque
      FROM produtos
      ORDER BY destaque DESC, id ASC
      LIMIT 12
    `);

    if (result.rows.length === 0) {
      return {
        source: "mock",
        products: featuredProducts
      };
    }

    return {
      source: "database",
      products: result.rows.map(normalizeProduct)
    };
  } catch (error) {
    console.error("Erro ao buscar produtos do banco:", error);

    return {
      source: "mock",
      products: featuredProducts,
      error: "Falha ao consultar o banco. Os dados de exemplo foram carregados."
    };
  }
}
