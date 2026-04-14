export async function GET() {
  return Response.json({
    status: "ok",
    project: "TupaSports",
    timestamp: new Date().toISOString()
  });
}
