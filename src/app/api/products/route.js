import products from "./mock.json" assert { type: "json" };

export async function GET() {
  return Response.json(products);
}