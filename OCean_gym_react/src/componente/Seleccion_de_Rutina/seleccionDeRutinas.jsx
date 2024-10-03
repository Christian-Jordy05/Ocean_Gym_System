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
      if (sexoSeleccionado === "hombre") {
        if (nivelSeleccionado === "principiante") {
          navigate('/Rutinas_Principiante')
        } else if (nivelSeleccionado === "intermedio") {
          navigate('/Rutinas_Intermedio')
        } else {
          navigate('/Rutinas_Experto')
        }
      } else {
        if (nivelSeleccionado === "principiante") {
          navigate('/Rutinas_Principiante_mujer')
        } else if (nivelSeleccionado === "intermedio") {
          navigate('/Rutinas_Principiante_mujer')
        } else {
          navigate('/Rutinas_Principiante_mujer')
        }
      }
    }
  };

  return (
    <div className="contenedor">
      {mostrarImagenes && (
        <>
          <h1 className="nombre_del_titulo">Sexo</h1>
          <div className="conte_de_imagenes">
            <div
              className={`contenedor_imagen_hombre ${
                imagenSeleccionada === Img_hombre ? "oculto" : ""
              }`}
              onClick={() => seleccionarImagen(Img_hombre)}
            >
              <img
                className="imagen_hombre"
                src={Img_hombre}
                alt="Imagen de hombre"
              />
            </div>

            <div
              className={`contenedor_imagen_mujer ${
                imagenSeleccionada === Img_mujer ? "oculto" : ""
              }`}
              onClick={() => seleccionarImagen(Img_mujer)}
            >
              <img
                className="imagen_mujer"
                src={Img_mujer}
                alt="Imagen de mujer"
              />
            </div>
          </div>
        </>
      )}

      {imagenSeleccionada && mostrarImagenes && (
        <div className="contenedor_central">
          <div className="envoltorio_imagen_seleccionada">
            <img
              className="imagen_seleccionada"
              src={imagenSeleccionada}
              alt="Imagen seleccionada"
            />
          </div>
        </div>
      )}

      {mostrarNiveles && (
        <div className="contenedor_niveles">
          <div
            className="nivel_contenedor"
            onClick={() => seleccionarNivel("principiante")}
          >
            <img
              className="imagen_nivel"
              src={img_principiante}
              alt="Principiante"
            />
            <div className="texto_sobre_imagen">
              <p className="titulo_nivel">PRINCIPIANTE</p>
            </div>
          </div>

          <div
            className="nivel_contenedor"
            onClick={() => seleccionarNivel("intermedio")}
          >
            <img
              className="imagen_nivel"
              src={img_intermedio}
              alt="Intermedio"
            />
            <div className="texto_sobre_imagen">
              <p className="titulo_nivel">INTERMEDIO</p>
            </div>
          </div>

          <div
            className="nivel_contenedor"
            onClick={() => seleccionarNivel("experto")}
          >
            <img className="imagen_nivel" src={img_experto} alt="Experto" />
            <div className="texto_sobre_imagen">
              <p className="titulo_nivel">EXPERTO</p>
            </div>
          </div>
        </div>
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