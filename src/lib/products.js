import { featuredProducts } from "@/data/store";
import { getPool, hasDatabaseUrl } from "@/lib/db";

function normalizeProduct(row) {
  return {
    id: String(row.id),
    name: row.nome,
    tag: row.destaque ? "Destaque" : row.categoria,
    price: `R$ ${Number(row.preco).toFixed(2).replace(".", ",")}`,
    description: row.descricao,
    visual: row.imagem || row.nome
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
      LIMIT 6
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
