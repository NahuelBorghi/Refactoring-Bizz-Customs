import Link from "next/link";

function navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/category/all/">Productos</Link>
        </li>
        <li>
          <Link href="/compat">Compatibilidad</Link>
        </li>
        <li>
          <Link href="/contact">Contacto</Link>
        </li>
      </ul>
      <form id="search" action="" method="">
        <input
          type="search"
          placeholder="Buscar..."
          name="buscar"
          id="buscar"
        />
      </form>
    </nav>
  );
}
export default navbar;
