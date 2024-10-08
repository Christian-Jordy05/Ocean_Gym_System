import React from 'react'
import { useState } from 'react'
import PressBanca from "../../img/press-de-banca.png"
import aperturasConMancuernas from '../../img/aperturas-con-mancuernas.jpeg'
import press_militar from '../../img/press_militar.jpeg'
import Elevaciones_laterales from '../../img/Elevaciones_laterales.jpg'
import pajaro_de_pie from '../../img/pajaro-de-pie.jpg'
import Remo_con_barra from '../../img/Remo_con_barra.jpeg'
import dominada from '../../img/dominada.jpg'
import Remo_unilateral from '../../img/Remo_unilateral.webp'
import Pull_ove from '../../img/Pull ove.jpg'
import hacer_sentadillas from '../../img/hacer-sentadillas.webp'
import prensa_de_piernas from '../../img/prensa-de-piernas.jpg'
import Extensión_de_piernas from '../../img/Extensión_de_piernas.webp'
import Curl_de_piernas from '../../img/Curl_de_piernas.avif'

function Rutinas_experto() {
  const [rutinaActiva, setRutinaActiva] = useState(null);


  const ejercicios = {
    ////////////////////////////////////////////////////////PECHO Y HOMBROS/////////////////////////////////////////////////////
    Pecho_y_Hombros: [
        {
            nombre: "Press de banca con barra",
            imagen: PressBanca,
            series: 4,
            repeticiones: "8-10",
            descripcion: "Acostado en un banco, sostén una barra con las manos a la altura de los hombros. Baja la barra controladamente hacia el pecho y luego empújala hacia arriba hasta que los brazos estén extendidos.",
            recomendacion: "Descansa 1-2 minutos entre cada serie para permitir la recuperación.",
            musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
            equipamiento: ["Barra", "Banco plano"],
            youtube: "https://www.youtube.com/watch?v=rT7DgCr-3pg"
        },
        {
            nombre: "Apertura con mancuernas",
            imagen: aperturasConMancuernas,
            series: 4,
            repeticiones: "8-10",
            descripcion: "Acostado en un banco plano, sostiene una mancuerna en cada mano con los brazos extendidos sobre el pecho. Abre los brazos hacia los lados en un movimiento controlado, manteniendo una ligera flexión en los codos, y luego vuelve a la posición inicial.",
            recomendacion: "Mantén una ligera flexión en los codos durante todo el movimiento para reducir la tensión en las articulaciones.",
            musculos: ["Pectorales", "Deltoides anteriores"],
            equipamiento: ["Mancuernas", "Banco plano"],
            youtube: "https://www.youtube.com/watch?v=eozdVDA78K0"
        },
        {
            nombre: "Press militar con barra",
            imagen: press_militar ,
            series: 4,
            repeticiones: "8-10",
            descripcion: "Sostén una barra en la parte superior del pecho con las manos a la anchura de los hombros. Empuja la barra hacia arriba hasta que los brazos estén completamente extendidos.",
            recomendacion: "Mantén el abdomen contraído y no arquees la espalda.",
            musculos: ["Deltoides", "Trapecios"],
            equipamiento: ["Barra"],
            youtube: "https://www.youtube.com/watch?v=3YvfGnG9A8g"
        },
        {
            nombre: "Elevaciones laterales",
            imagen: Elevaciones_laterales,
            series: 4,
            repeticiones: "10-12",
            descripcion: "Con una mancuerna en cada mano, eleva los brazos hacia los lados hasta que estén a la altura de los hombros y luego regresa a la posición inicial.",
            recomendacion: "Mantén una ligera flexión en los codos y controla el movimiento.",
            musculos: ["Deltoides laterales"],
            equipamiento: ["Mancuernas"],
            youtube: "https://www.youtube.com/watch?v=3VcKaXpzqRo"
        },
        {
            nombre: "Pájaros",
            imagen: pajaro_de_pie,
            series: 4,
            repeticiones: "10-12",
            descripcion: "Inclínate hacia adelante con una mancuerna en cada mano. Levanta los brazos hacia los lados en un movimiento controlado.",
            recomendacion: "Mantén una ligera flexión en los codos y evita el impulso.",
            musculos: ["Deltoides posteriores"],
            equipamiento: ["Mancuernas"],
            youtube: "https://www.youtube.com/watch?v=69c3s31oB0M"
        },
    ],
    ////////////////////////////////////////////////////////ESPALDA Y BÍCEPS/////////////////////////////////////////////////////
    Espalda_y_Bíceps: [
        {
            nombre: "Remo con barra",
            imagen: Remo_con_barra,
            series: 4,
            repeticiones: "6-8",
            descripcion: "Sostén una barra con las manos a la anchura de los hombros, inclina el torso hacia adelante con la espalda recta y tira de la barra hacia el abdomen.",
            recomendacion: "Mantén la espalda recta durante el movimiento y no uses impulso.",
            musculos: ["Dorsales", "Trapecios", "Bíceps"],
            equipamiento: ["Barra"],
            youtube: "https://www.youtube.com/watch?v=nO_XzvezmFE"
        },
        {
            nombre: "Dominadas",
            imagen: dominada,
            series: 4,
            repeticiones: "Al fallo",
            descripcion: "Colócate en una barra de dominadas con las manos separadas a la anchura de los hombros. Tira de ti mismo hacia arriba hasta que tu barbilla supere la barra y luego baja lentamente hasta la posición inicial.",
            recomendacion: "Mantén la espalda recta y no uses impulso.",
            musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
            equipamiento: ["Barra de dominadas"],
            youtube: "https://www.youtube.com/watch?v=3sYc3n1f6gQ"
        },
        {
            nombre: "Remo unilateral",
            imagen: Remo_unilateral ,
            series: 4,
            repeticiones: "10-12",
            descripcion: "Sostén una mancuerna con una mano y colócate en posición de remo, con la espalda recta y la pierna opuesta al brazo que sostiene la mancuerna ligeramente adelante. Tira de la mancuerna hacia el abdomen y luego regresa lentamente a la posición inicial.",
            recomendacion: "Mantén la espalda recta y no uses impulso.",
            musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
            equipamiento: ["Mancuerna"],
            youtube: "https://www.youtube.com/watch?v=QzQ9f1qZx0I"
        },
        {
            nombre: "Pull-over con mancuerna",
            imagen: Pull_ove,
            series: 4,
            repeticiones: "10-12",
            descripcion: "Acostado en un banco, sostiene una mancuerna con ambas manos sobre el pecho. Baja la mancuerna hacia atrás de la cabeza y vuelve a la posición inicial.",
            recomendacion: "Controla el movimiento y evita usar impulso.",
            musculos: ["Dorsales", "Pectorales", "Tríceps"],
            equipamiento: ["Mancuerna", "Banco"],
            youtube: "https://www.youtube.com/watch?v=nH14bLPmKUo"
        },
    ],
    ////////////////////////////////////////////////////////PIERNAS/////////////////////////////////////////////////////
    Piernas: [
        {
            nombre: "Sentadilla con barra",
            imagen: hacer_sentadillas,
            series: 4,
            repeticiones: "8-10",
            descripcion: "Coloca una barra sobre tus hombros. Con los pies al ancho de los hombros, baja el cuerpo como si fueras a sentarte, manteniendo la espalda recta y el pecho hacia arriba. Regresa a la posición inicial.",
            recomendacion: "Asegúrate de que tus rodillas no sobrepasen tus pies al bajar.",
            musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
            equipamiento: ["Barra"],
            youtube: "https://www.youtube.com/watch?v=QKK1xLiCo6I"
        },
        {
            nombre: "Prensa de piernas",
            imagen: prensa_de_piernas,
            series: 4,
            repeticiones: "8-10",
            descripcion: "Colócate en la máquina de prensa de piernas, coloca los pies en la plataforma y empuja hacia arriba hasta extender las piernas y luego vuelve a la posición inicial.",
            recomendacion: "Mantén la espalda apoyada en el respaldo durante el ejercicio.",
            musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
            equipamiento: ["Máquina de prensa de piernas"],
            youtube: "https://www.youtube.com/watch?v=GQ96n0hYYAU"
        },
        {
            nombre: "Extensión de piernas",
            imagen: Extensión_de_piernas,
            series: 4,
            repeticiones: "10-12",
            descripcion: "Siéntate en la máquina de extensión de piernas y levanta el peso con las piernas hasta que estén completamente extendidas y luego regresa a la posición inicial.",
            recomendacion: "Controla el movimiento y no uses impulso.",
            musculos: ["Cuádriceps"],
            equipamiento: ["Máquina de extensión de piernas"],
            youtube: "https://www.youtube.com/watch?v=MM69R6xdneY"
        },
        {
            nombre: "Curl de piernas",
            imagen: Curl_de_piernas,
            series: 4,
            repeticiones: "10-12",
            descripcion: "Colócate en la máquina de curl de piernas y levanta el peso con las piernas hacia atrás, doblando las rodillas, y luego regresa a la posición inicial.",
            recomendacion: "Controla el movimiento para evitar lesiones.",
            musculos: ["Isquiotibiales"],
            equipamiento: ["Máquina de curl de piernas"],
            youtube: "https://www.youtube.com/watch?v=KKzshsqN5m0"
        },
    ],
};
  return (
    <div className="contenedor-rutina">
    <div className="encabezado-rutina">
      <h1>RUTINA PARA EXPEPERTO</h1>
      <p className="subtitulo">Comienza tu viaje fitness con estos ejercicios básicos</p>
    </div>

    <div className="ejercicios-grid">
      <div className="tarjeta-ejercicio">
        <div className="contenido-tarjeta">
          <div className="icono-ejercicio pecho"></div>
          <h2>Pecho</h2>
          <p>Desarrolla fuerza y definición en tus pectorales.</p>
          <button className="boton-ver-rutina" onClick={() => setRutinaActiva('Pecho_y_Hombros')}>
            Ver rutina
            <span className="icono-flecha">→</span>
          </button>
        </div>
      </div>

      <div className="tarjeta-ejercicio">
        <div className="contenido-tarjeta">
          <div className="icono-ejercicio espalda"></div>
          <h2>Espalda</h2>
          <p>Mejora tu postura y fortalece tu espalda.</p>
          <button className="boton-ver-rutina" onClick={() => setRutinaActiva('Espalda_y_Bíceps')}>
            Ver rutina
            <span className="icono-flecha">→</span>
          </button>
        </div>
      </div>

      <div className="tarjeta-ejercicio">
        <div className="contenido-tarjeta">
          <div className="icono-ejercicio piernas"></div>
          <h2>Piernas</h2>
          <p>Potencia y resistencia para tus piernas.</p>
          <button className="boton-ver-rutina" onClick={() => setRutinaActiva('Piernas')}>
            Ver rutina
            <span className="icono-flecha">→</span>
          </button>
        </div>
      </div>
{/* 
      <div className="tarjeta-ejercicio">
        <div className="contenido-tarjeta">
          <div className="icono-ejercicio brazos"></div>
          <h2>Bicep</h2>
          <p>Tonifica y fortalece tus Bicep.</p>
          <button className="boton-ver-rutina" onClick={() => setRutinaActiva('Biceps')}>
            Ver rutina
            <span className="icono-flecha">→</span>
          </button>
        </div>
      </div> */}
    </div>

    {rutinaActiva && (
      <div className="ejercicios-detalle">
        <h2 className="titulo-rutina-activa">{rutinaActiva.toUpperCase()}</h2>
        <div className="ejercicios-lista">
          {ejercicios[rutinaActiva].map((ejercicio, index) => (
            <div key={index} className="ejercicio-item">
              <img className="Img_Rutina" src={ejercicio.imagen}  alt={ejercicio.nombre} />
              <h3>{ejercicio.nombre}</h3>
              <p>{ejercicio.descripcion}</p>
              <p><strong>Series:</strong> {ejercicio.series}</p>
              <p><strong>Repeticiones:</strong> {ejercicio.repeticiones}</p>
              <p><strong>Recomendación:</strong> {ejercicio.recomendacion}</p>
              <p><strong>Músculos trabajados:</strong> {ejercicio.musculos.join(", ")}</p>
              <p><strong>Equipamiento:</strong> {ejercicio.equipamiento.join(", ")}</p>
              <a href={ejercicio.youtube} target="_blank" rel="noopener noreferrer" className="boton-youtube">
                Ver en YouTube
              </a>
            </div>
          ))}
        </div>
        <button className="boton-cerrar" onClick={() => setRutinaActiva(null)}>Cerrar</button>
      </div>
    )}
  </div>
);
}

export default Rutinas_experto
