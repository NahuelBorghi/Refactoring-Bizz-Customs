import animacion from "../../assets/Comp-1-4.gif";
import "./loading.scss";
/* replace animation for something better */
export const Loading = () => {
  return (
    <div id="loading">
      <img src={animacion} />
    </div>
  );
};
