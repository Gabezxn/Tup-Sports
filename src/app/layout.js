import "./globals.css";

export const metadata = {
  title: "TupaSports",
  description: "Loja virtual de artigos esportivos criada para projeto escolar."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
