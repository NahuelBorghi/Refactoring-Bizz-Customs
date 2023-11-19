import { createContext, useState } from "react";
import { getFireStore } from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

/* this will change his name. it will be the module that communicate the web with the api */

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const [cartQuantity, setQuantity] = useState(0);
  const [Total, setTotal] = useState(0);
  const [userInfo, SetUserInfo] = useState(undefined);
  const [orderId, setOrderId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const addItem = (item, quantity) => {
    let article = isInCart(item.id);
    let price = 0,
      oldPrice = 0,
      newQuantity = quantity + article.quantity;
    if (article === false) {
      setCart([...Cart, { item, quantity }]);
      setQuantity(cartQuantity + quantity);
      price = item.price * quantity;
      setTotal(Total + price);
    } else if (newQuantity <= item.stock) {
      setQuantity(cartQuantity + quantity);
      oldPrice = item.price * article.quantity;
      quantity += article.quantity;
      alert(quantity);
      let newCart = Cart.filter((carrito) => carrito.item.id !== item.id);
      console.log(Cart[0].item);
      console.log(item);
      console.log(Cart[0].item === item);
      newCart.push({ item, quantity });
      setCart(newCart);
      price = item.price * quantity;
      setTotal(parseInt(Total - oldPrice + price.toFixed(2)));
      console.log(Cart);
    } else {
      alert("no hay mas stock");
    }
  };
  //arreglar problema de duplicados
  const removeItem = (itemId) => {
    let toDelete = Cart.find((carrito) => carrito.item.id === itemId);
    let price = toDelete.item.price * toDelete.quantity;
    setTotal(Total - price);
    setCart(Cart.filter((carrito) => carrito !== toDelete));
    console.log(Cart);
    setQuantity(cartQuantity - toDelete.quantity);
  };
  const clear = () => {
    setCart([]);
    setTotal(0);
    setQuantity(0);
    console.log(Cart);
  };
  const getItem = (itemId) => {
    return Cart.find((obj) => obj.item.id === itemId);
  };
  const isInCart = (itemId) => {
    if (getItem(itemId) !== undefined) {
      return getItem(itemId);
    } else {
      return false;
    }
  };
  const orderGenerator = async () => {
    const db = getFireStore();
    const orders = db.collection("orders");
    if (orders !== undefined && Cart !== undefined) {
      const newOrder = {
        buyer: userInfo,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        items: Cart,
        total: Total,
      };
      const itemlist = db.collection("articles").where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        Cart.map((i) => i.item.id)
      );
      //set loading en true
      const query = await itemlist.get();
      const batch = db.batch();
      const outOfStock = [];
      query.docs.forEach((docSnapshot, i) => {
        if (docSnapshot.data().stock >= Cart[i].quantity) {
          batch.update(docSnapshot.ref, {
            stock: docSnapshot.data().stock - Cart[i].quantity,
          });
        } else {
          outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id });
        }
      });
      await batch.commit();
      if (outOfStock.length === 0) {
        orders
          .add({
            buyer: userInfo,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            items: Cart,
            total: Total,
          })
          .then(({ id }) => {
            console.log(id);
            setOrderId(id);
          })
          .catch((err) => {
            console.log("firebase error: " + err);
          })
          .finally(() => {
            //set loading en false
          });
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        Total,
        Cart,
        userInfo,
        orderId,
        setLoading,
        SetUserInfo,
        orderGenerator,
        addItem,
        removeItem,
        clear,
        isInCart,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
