import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getFireStore } from "../firebase";

export const Filter = () => {
  const [articles, setArticles] = useState([]);
  useEffect(()=>{const db = getFireStore();
  const itemCollection = db.collection("articles");
  itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
          setArticles({ id: 0, imagesId: [""], name: "No results", price: 0 });
      } else {
          setArticles(querySnapshot.docs.map((doc) => doc.data()));
      }
      })
      .catch((error) => console.error("firestore error:" + error));},[])
  //set loading en true
  let aux = articles.map((article)=>article.type)
  const types = aux.reduce((acc,item)=>{
    if(!acc.includes(item)){
        acc.push(item)
    }
    return acc;
  },[])
  console.log(types)
  aux = articles.map((article)=>article.colors)
  let aux2 = []
  for(let i=0;i<aux.length;i++){
        if(i===0){
            aux2=aux[i]
        }else{
            aux2 = aux2.concat(aux[i])
            }
  }
  const colors = aux2.reduce((acc,item)=>{
    if(!acc.includes(item)){
        acc.push(item)
    }
    return acc;
  },[])
  // crear constantes para crear los filtros automaticamente
  return (
    <div id="filter">
        <span>
        <h3>Categorias</h3>
        <p><NavLink to = {`/category/all/`}>Todos los productos</NavLink></p>
        {types.length ? types.map((type)=><p><NavLink to = {`/category/${type}/`}>{type}</NavLink></p>): <p>no hay categorias</p>}
        </span>

        <span>
        <h3>Colores</h3>
        {colors.length ? colors.map((color)=><p><Link to = {`${color}`}>{color}</Link></p>): <p>no hay categorias</p>}
        </span>
    </div>
  );
};
//{articles.length ? articles.map((article)=><InputRadio valor={article.type}/>):<p>no hay categorias</p>}