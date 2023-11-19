import "./CartItemCount.scss";
/* resolver dependencias {onAdd,suma,resta,cantidad}*/
export const CartItemCount = ({ onAdd, suma, resta, cantidad }) => {
  return (
    <div id="agregarCarrito">
      <p>carrito</p>
      <input name="agregar" id="agregar" type="number" value={cantidad}></input>
      <button onClick={suma}>+</button>
      <button onClick={resta}>-</button>
      <input type="button" value="agregar al carrito" onClick={onAdd} />
    </div>
  );
};
