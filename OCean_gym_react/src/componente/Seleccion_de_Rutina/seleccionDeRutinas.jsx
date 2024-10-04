import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SeleccionDeRutinas.css";
import Img_hombre from "../img/img_de_hombre_gym.png";
import Img_mujer from "../img/img_de_mujer_gym.png";
import img_principiante from "../img/img_principiante.jpg";
import img_intermedio from "../img/intermedio.webp";
import img_experto from "../img/img_experto.webp";

function SeleccionDeRutinas() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [sexoSeleccionado, setSexoSeleccionado] = useState(null);
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [mostrarNiveles, setMostrarNiveles] = useState(false);
  const [mostrarImagenes, setMostrarImagenes] = useState(true);
  const navigate = useNavigate();

  const seleccionarImagen = (img) => {
    setImagenSeleccionada(img);
    setMostrarBoton(true);
  };

  const confirmarSeleccion = () => {
    if (imagenSeleccionada === Img_hombre) {
      setSexoSeleccionado("hombre");
    } else if (imagenSeleccionada === Img_mujer) {
      setSexoSeleccionado("mujer");
    }
    setMostrarBoton(false);
    setMostrarNiveles(true);
    setMostrarImagenes(false);
  };

  const seleccionarNivel = (nivel) => {
    setNivelSeleccionado(nivel);
    setMostrarBoton(true);
  };

  const verificacion = () => {
    if (sexoSeleccionado && nivelSeleccionado) {
      let ruta = '';
      if (sexoSeleccionado === "hombre") {
        ruta = nivelSeleccionado === "principiante" ? '/Rutinas_Principiante' : nivelSeleccionado === "intermedio" ? '/Rutinas_Intermedio' : '/Rutinas_Experto';
      } else {
        ruta = nivelSeleccionado === "principiante" ? '/Rutinas_Principiante_mujer' : nivelSeleccionado === "intermedio" ? '/Rutinas_Intermedio_mujer' : '/Rutinas_Experto_mujer';
      }
      navigate(ruta);
    }
  };

  return (
    <div className="contenedor">
      <h1 className="nombre_del_titulo">Elige tu Camino</h1>

      {mostrarImagenes && (
        <>
          <h2 className="nombre_del_titulo">Selecciona tu Género</h2>
          <div className="conte_de_imagenes">
            <div
              className={`contenedor_imagen_hombre ${imagenSeleccionada === Img_hombre ? "seleccionado" : ""}`}
              onClick={() => seleccionarImagen(Img_hombre)}
            >
              <img className="imagen_hombre" src={Img_hombre} alt="Imagen de hombre" />
              <span className="imagen_label">Hombre</span>
            </div>

            {imagenSeleccionada && (
              <div className="contenedor_central">
                <div className="envoltorio_imagen_seleccionada">
                  <img className="imagen_seleccionada" src={imagenSeleccionada} alt="Imagen seleccionada" />
                </div>
              </div>
            )}

            <div
              className={`contenedor_imagen_mujer ${imagenSeleccionada === Img_mujer ? "seleccionado" : ""}`}
              onClick={() => seleccionarImagen(Img_mujer)}
            >
              <img className="imagen_mujer" src={Img_mujer} alt="Imagen de mujer" />
              <span className="imagen_label">Mujer</span>
            </div>
          </div>
        </>
      )}

      {mostrarNiveles && (
        <>
          <h2 className="nombre_del_titulo">Define tu Desafío</h2>
          <div className="contenedor_niveles">
            {[
              { nivel: "principiante", imagen: img_principiante, titulo: "PRINCIPIANTE" },
              { nivel: "intermedio", imagen: img_intermedio, titulo: "INTERMEDIO" },
              { nivel: "experto", imagen: img_experto, titulo: "EXPERTO" }
            ].map((item) => (
              <div
                key={item.nivel}
                className={`nivel_contenedor ${nivelSeleccionado === item.nivel ? "seleccionado" : ""}`}
                onClick={() => seleccionarNivel(item.nivel)}
              >
                <img className="imagen_nivel" src={item.imagen} alt={item.titulo} />
                <div className="texto_sobre_imagen">
                  <p className="titulo_nivel">{item.titulo}</p>
                  <p className="detalles_nivel">Selecciona para personalizar tu experiencia</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mostrarBoton && (
        <button
          className="boton_de_confirmar"
          onClick={() => {
            confirmarSeleccion();
            verificacion();
          }}
        >
          Confirmar
        </button>
      )}
    </div>
  );
}

export default SeleccionDeRutinas;