import * as React from "react";
import Tarjeta from './Tarjeta';
import axios from "axios";
import "./App.css";

const App = () => {
  const [datos, setDatos] = React.useState(null);
  const [asistentes, setAsistentes] = React.useState(null);
  const [mensaje, setMensaje] = React.useState(null);
  const [fetched, setFetched] = React.useState(false);

  const handleInputChange = (type, e) => {
    let tempDatos = {
      ...datos,
    };
    tempDatos[type] = e.target.value;
    setDatos(tempDatos);
  };

  React.useEffect(() => {
    if(!asistentes){
      axios.get("http://172.16.114.134:4000/asistentes")
        .then((data)=> {
          setAsistentes(data.data);
        })
        .catch((err)=> {
          console.error(err);
        })
    }
    if (!datos && fetched) {
      setMensaje({
        tipo: "alerta",
        mensaje: `Se creo asistente con exito`,
      });
    }
    console.log(asistentes)
  }, [datos, asistentes]);

  const postAPI = (data, callback) => {
    // const finalData = JSON.stringify(data);
    console.log({ data });
    axios
      .post("http://172.16.114.134:4000/asistentes", data)
      .then((res) => {
        callback(null);
        setFetched(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = () => {
    postAPI(datos, setDatos);
  };


  const printAsistentes = () => {
    if(asistentes){
      let temp = asistentes.map((el) => <Tarjeta cambiarMensaje={setMensaje} onClick={() => console.log({el})}>{el.nombre}</Tarjeta>)
      return temp;
    }
  }
  return (
    <div className="App">
      {mensaje && <Tarjeta className={`messageContainer ${mensaje?.tipo === "alerta" ? "alerta" : ""} ${mensaje?.tipo === "error" ? "error" : ""}`} onClick={() => setMensaje(null)}>
        <p>{mensaje?.mensaje}</p>
      </Tarjeta> }
      <div className="inputContainer">
        <input type="number" onChange={(e) => handleInputChange("id", e)} value={datos?.id} />
        <p>id: {datos?.id}</p>
      </div>
      <div className="inputContainer">
        <input type="text" onChange={(e) => handleInputChange("nombre", e)} value={datos?.nombre} />
        <p>Nombre: {datos?.nombre}</p>
      </div>
      <div className="inputContainer">
        <input type="text" onChange={(e) => handleInputChange("apellido", e)} value={datos?.apellido} />
        <p>Apellido {datos?.apellido}</p>
      </div>
      <div className="inputContainer">
        <input type="email" onChange={(e) => handleInputChange("correo", e)} value={datos?.correo} />
        <p>Correo: {datos?.correo}</p>
      </div>
      <div className="inputContainer">
        <input type="tel" onChange={(e) => handleInputChange("telefono", e)} value={datos?.telefono} />
        <p>Telefono: {datos?.telefono}</p>
      </div>
      <div className="inputContainer">
        <input type="text" onChange={(e) => handleInputChange("horario", e)} value={datos?.horario} />
        <p>Horario: {datos?.horario}</p>
      </div>
      <button style={{ width: "250px" }} onClick={handleSubmit}>
        Submit
      </button>
      <button style={{ width: "250px" }} onClick={() => setMensaje({
        tipo: "alerta",
        mensaje: "Demo de mensaje de alerta"
      })}>
        Abrir mensaje
      </button>
      <hr /> 
      {
        printAsistentes()
      }
    </div>
  );
};

export default App;
