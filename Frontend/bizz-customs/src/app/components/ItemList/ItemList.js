import { Item } from "../Item/Item";
import { useContext, useEffect, useState } from "react";
import "./ItemList.scss";
import { getFireStore } from "../../firebase"; /* deprecated in this project. update to dbMgr */
import { Filter } from "../filter";
import { useParams } from "react-router";
import { Loading } from "../Loading/Loading";
import { CartContext } from "../cartContext";

export const ItemList = () => {
  const { type, color } = useParams();
  const [Articulos, setArticulos] = useState(
    []
  ); /* this state can be replaced by localstorage array of articles */
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  //set loading en true
  useEffect(() => {
    const db = getFireStore();
    const itemCollection = db.collection("articles");
    itemCollection
      .get()
      .then((querySnapshot) => {
        setLoading(true);
        if (querySnapshot.size === 0) {
          setArticulos([]);
          setCategory([
            { id: 0, imagesId: ["noImage.png"], name: "No results", price: 0 },
          ]);
        } else if (!type) {
          setCategory([
            { id: 0, imagesId: ["noImage.png"], name: "No results", price: 0 },
          ]);
        } else if (type != "all") {
          setCategory(
            querySnapshot.docs.filter((article) => article.type === type)
          );
        } else {
          setCategory(querySnapshot.docs.map((doc) => doc.data()));
        }
        setArticulos(querySnapshot.docs.map((doc) => doc.data()));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error("firestore error:" + error))
      .finally(setCategory(Articulos));
  }, []);

  useEffect(() => {
    if (type === "all" && !color && Articulos) {
      setCategory(Articulos);
    } else if (type === "all" && color && Articulos) {
      setCategory(
        Articulos.filter((article) => article.colors.includes(color))
      );
    } else if (type && color && Articulos) {
      setCategory(
        Articulos.filter(
          (article) => article.type === type && article.colors.includes(color)
        )
      );
    } else if (type && !color && Articulos) {
      setCategory(Articulos.filter((article) => article.type === type));
    } else {
      setCategory([
        { id: 0, imagesId: ["noImage.png"], name: "No results", price: 0 },
      ]);
    }
    console.log(loading);
  }, [type, color]);
  //set loading en false

  return (
    <section>
      {loading != true ? (
        <>
          <Filter />
          <div id="articles">
            {Articulos &&
              category.map((Articulo) => <Item article={Articulo} />)}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};
