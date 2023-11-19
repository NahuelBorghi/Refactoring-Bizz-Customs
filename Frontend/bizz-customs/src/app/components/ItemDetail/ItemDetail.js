import { CartItemCount } from "../CartItemCount/CartItemCount";
import { useContext, useState } from "react";
import { Shipping } from "../Shipping";
import { CuotesCalculator } from "../CuotesCalculator";
import { Link } from "react-router-dom";
import "./ItemDetail.scss";
import { CartContext } from "../cartContext";
import { Loading } from "../Loading/Loading";

/* needs to be reactored */
export const ItemDetail = ({
  article: { colors, id, imagesId, name, price, stock, type },
}) => {
  const cart = useContext(CartContext);
  const [Add, setAdd] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [style, setStyle] = useState(0);
  console.log(name);
  const suma = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  const resta = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    console.log(quantity);
  };
  const toAdd = () => {
    setAdd(quantity);
    if (quantity > 0) setStyle(1);
  };
  const add = () => {
    cart.addItem({ colors, id, imagesId, name, price, stock, type }, Add);
    setQuantity(0);
  };
  return (
    <>
      {name != undefined ? (
        <>
          <div id="imgProduct">
            <img
              src={
                require(`../../assets/images/productos/${imagesId[0]}`).default
              }
            />
          </div>
          <div id="datos">
            <h2 id="nombre">{name}</h2>
            <p id="precios">${price}</p>
          </div>
          <div id="controls">
            <CartItemCount
              onAdd={toAdd}
              suma={suma}
              resta={resta}
              cantidad={quantity}
            ></CartItemCount>
          </div>
          <div id="cartButton">
            <button
              id="toCart"
              onClick={() => {
                if (style > 0) {
                  add();
                }
              }}
              style={{ margin: "10%", opacity: style }}
            >
              <Link exact to="/Cart">
                Terminar compra
              </Link>
            </button>
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};
