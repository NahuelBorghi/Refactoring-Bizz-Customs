import Link from "next/link";
function Header() {
  return (
    <header>
      <div>{/*aca va el boton de cambio de tema*/}</div>
      <Link href="/Cart">Carrito</Link>
    </header>
  );
}
export default Header;
