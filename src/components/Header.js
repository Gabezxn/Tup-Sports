import Link from "next/link";

export function Header() {
  return (
    <header className="topbar">
      <div className="shell topbar-inner">
        <Link href="/" className="brand" aria-label="TupaSports">
          <span className="brand-mark">TS</span>
          <span className="brand-text">
            TupaSports
            <small>Loja de artigos esportivos</small>
          </span>
        </Link>

        <nav className="nav">
          <Link href="/#categorias">Categorias</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/#diferenciais">Diferenciais</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
      </div>
    </header>
  );
}
