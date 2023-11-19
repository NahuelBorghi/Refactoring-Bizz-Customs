export const CuotesCalculator = () => {
  return (
    <div>
      <form
        id="cuotas"
        name="cuotas"
        action=""
        method="get"
        enctype="multipart/form-data"
      >
        <p className="nombre">cuotas</p>
        <span className="material-icons">credit_card</span>
        <div className="contenido">
          <input
            className="boton"
            name="calcular"
            type="submit"
            value="Calcular Cuotas"
          />
        </div>
      </form>
    </div>
  );
};
