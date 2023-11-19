/* this can be filled automatically with a request to api*/

export const Shipping = () => {
  return (
    <div>
      <form
        id="envio"
        name="envio"
        action=""
        method="get"
        enctype="multipart/form-data"
      >
        <p className="nombre">Costo de envio</p>
        <span className="material-icons">local_shipping</span>
        <div className="contenido">
          <select id="desplegable" name="prov">
            <option value="buenos aires">Buenos Aires</option>
            <option value="caba">Capital Federal</option>
            <option value="catamarca">Catamarca</option>
            <option value="chaco">Chaco</option>
            <option value="chubut">Chubut</option>
            <option value="cordoba">Cordoba</option>
            <option value="corrientes">Corrientes</option>
            <option value="entre rios">Entre Rios</option>
            <option value="formosa">Formosa</option>
            <option value="jujuy">Jujuy</option>
            <option value="pampa">La Pampa</option>
            <option value="rioja">La Rioja</option>
            <option value="mendoza">Mendoza</option>
            <option value="misiones">Misiones</option>
            <option value="neuquen">Neuquen</option>
            <option value="rio negro">Rio Negro</option>
            <option value="salta">Salta</option>
            <option value="san juan">San Juan</option>
            <option value="san luis">San Luis</option>
            <option value="santa cruz">Santa Cruz</option>
            <option value="santa fe">Santa fe</option>
            <option value="santiago">Santiago</option>
            <option value="tierra del fuego">Tierra Del Fuego</option>
            <option value="tucuman">Tucuman</option>
          </select>
        </div>
      </form>
    </div>
  );
};
