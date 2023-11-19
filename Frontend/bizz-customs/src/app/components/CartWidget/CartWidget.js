import { useContext } from "react";
import carrito from "../../assets/images/carro.png";
import "./CartWidget.scss";

export const CartWidget = () => {
  const cart = []; /*useContext(CartContext)*/
  return (
    <a id="cart" href="./">
      <img src={carrito} alt="carrito" />
      <p>{cart.length}</p>
    </a>
  );
};
