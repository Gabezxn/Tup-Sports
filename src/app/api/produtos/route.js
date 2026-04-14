import { getFeaturedProducts } from "@/lib/products";

export async function GET() {
  const { products, source, error } = await getFeaturedProducts();

  return Response.json({
    loja: "TupaSports",
    origem: source,
    erro: error || null,
    total: products.length,
    produtos: products
  });
}
