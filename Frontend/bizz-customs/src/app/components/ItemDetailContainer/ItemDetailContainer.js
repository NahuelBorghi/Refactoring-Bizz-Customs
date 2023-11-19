import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { ItemNull } from "../itemNull.js";
import "./ItemDetailContainer.scss";
import { getFireStore } from "../../firebase"; /* deprecated in this project. update to dbMgr */

export const ItemDetailContainer = () => {
  const itemId = useParams().id;
  console.log(useParams());
  const [Article, setArticle] = useState([]);
  useEffect(() => {
    const db = getFireStore();
    const items = db.collection("articles");
    items.get().then((querySnapshot) => {
      let articulos = querySnapshot.docs.map((doc) => doc.data());
      setArticle(articulos.find((item) => item.id === itemId));
    });
  }, []);
  return (
    <section id="Detail">
      {Article != undefined ? (
        <ItemDetail article={Article}></ItemDetail>
      ) : (
        <ItemDetail
          article={{
            colors: [0, 1],
            id: 0,
            imagesId: ["noImage.png"],
            name: "No results",
            price: 0,
            stock: 0,
            type: 0,
          }}
        />
      )}
    </section>
  );
};
