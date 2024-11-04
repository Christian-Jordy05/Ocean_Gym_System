import React, { useState } from 'react';
import './RutinaPrincipiante.css';
import pressBanca from '../../img/press-de-banca.png';
import AperturaMancuerna from '../../img/aperturas-con-mancuernas.jpeg'
import Flexiones from '../../img/flexiones.webp'
import CruceEntrePoleas from '../../img/Cruce entre poleas.webp'
import RemoConBarra from '../../img/Remo_con_barra.jpeg'
import Dominada from '../../img/dominada.jpg'
import Remo_unilateral from '../../img/Remo_unilateral.webp'
import Pull_ove from '../../img/Pull ove.jpg'
////////////////Piernas////////////////////////
import hacer_sentadillas from '../../img/hacer-sentadillas.webp'
import prensa_de_piernas from '../../img/prensa-de-piernas.jpg'
import Extensión_de_piernas from '../../img/Extensión_de_piernas.webp'
import Curl_de_piernas from '../../img/Curl_de_piernas.avif'
import Peso_muerto from '../../img/Peso_muerto.webp'
////////////////Bicep////////////////////////
import Predicador from '../../img/Predicador.webp'
import Martillo from '../../img/Martillo.webp'
import curl_con_mancuernas from '../../img/curl_con_mancuernas.jpg'
import veinte_uno from '../../img/veinte_uno.avif'
import Navegar from '../../navegacion/navegar';




function RutinaPrincipiante() {
  const [rutinaActiva, setRutinaActiva] = useState(null);

  const ejercicios = {
    ////////////////////////////////////////////////////////PECHO/////////////////////////////////////////////////////
    Pecho_y_Tríceps: [
      {
        nombre: "Press de banca con barra",
        imagen: pressBanca,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Acostado en un banco, sostén una barra con las manos a la altura de los hombros. Baja la barra controladamente hacia el pecho y luego empújala hacia arriba hasta que los brazos estén extendidos.",
        recomendacion: "Descansa 1-2 minutos entre cada serie para permitir la recuperación.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Barra", "Banco plano"],
        youtube: "https://www.youtube.com/watch?v=rT7DgCr-3pg"
      },
      {
        nombre: "Apertura con mancuernas",
        imagen: AperturaMancuerna,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Acostado en un banco plano, sostiene una mancuerna en cada mano con los brazos extendidos sobre el pecho. Abre los brazos hacia los lados en un movimiento controlado, manteniendo una ligera flexión en los codos, y luego vuelve a la posición inicial.",
        recomendacion: "Mantén una ligera flexión en los codos durante todo el movimiento para reducir la tensión en las articulaciones.",
        musculos: ["Pectorales", "Deltoides anteriores"],
        equipamiento: ["Mancuernas", "Banco plano"],
        youtube: "https://www.youtube.com/watch?v=eozdVDA78K0"
      },
      {
        nombre: "Flexiones",
        imagen: Flexiones,
        series: 2,
        repeticiones: "5-10",
        descripcion: "Colócate en posición de plancha, con las manos alineadas con los hombros. Baja el cuerpo hacia el suelo manteniendo una línea recta desde la cabeza hasta los pies y luego empuja hacia arriba hasta la posición inicial.",
        recomendacion: "Si es difícil, puedes comenzar con flexiones en las rodillas. Mantén el core activado durante todo el movimiento.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores", "Core"],
        equipamiento: ["Ninguno"],
        youtube: "https://www.youtube.com/watch?v=IODxDxX7oi4"
      },
      {
        nombre: "Cruce entre poleas",
        imagen: CruceEntrePoleas,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Colócate en el centro de dos poleas altas. Toma una manija en cada mano y, con una ligera inclinación hacia adelante, tira de las manijas hacia el centro del pecho, cruzando ligeramente los brazos, y luego regresa lentamente a la posición inicial.",
        recomendacion: "Mantén una ligera flexión en los codos y concéntrate en apretar los músculos pectorales en la parte superior del movimiento.",
        musculos: ["Pectorales", "Deltoides anteriores"],
        equipamiento: ["Máquina de poleas"],
        youtube: "https://www.youtube.com/watch?v=taI4XduLpTk"
      },
    ],
    ////////////////////////////////////////////////////////ESPALDA/////////////////////////////////////////////////////
    Espalda_y_Bíceps: [
      {
        nombre: "Remo con barra",
        imagen: RemoConBarra,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Sostén una barra con las manos a la anchura de los hombros, inclina el torso hacia adelante con la espalda recta y tira de la barra hacia el abdomen.",
        recomendacion: "Mantén la espalda recta durante el movimiento y no uses impulso.",
        musculos: ["Dorsales", "Trapecios", "Bíceps"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=nO_XzvezmFE"
      },
      {
        nombre: "Dominadas",
        imagen: Dominada,
        series: 3,
        repeticiones: "Al fallo",
        descripcion: "Colócate en una barra de dominadas con las manos separadas a la anchura de los hombros. Tira de ti mismo hacia arriba hasta que tu barbilla supere la barra y luego baja lentamente hasta la posición inicial.",
        recomendacion: "Mantén la espalda recta y no uses impulso.",
        musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
        equipamiento: ["Barra de dominadas"],
        youtube: "https://www.youtube.com/watch?v=3sYc3n1f6gQ"
      },
      {
        nombre: "Remo unilateral",
        imagen: Remo_unilateral,
        series: 3,
        repeticiones: "12",
        descripcion: "Sostén una mancuerna con una mano y colócate en posición de remo, con la espalda recta y la pierna opuesta al brazo que sostiene la mancuerna ligeramente adelante. Tira de la mancuerna hacia el abdomen y luego regresa lentamente a la posición inicial.",
        recomendacion: "Mantén la espalda recta y no uses impulso.",
        musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
        equipamiento: ["Mancuerna"],
        youtube: "https://www.youtube.com/watch?v=QzQ9f1qZx0I"
      },
      {
        nombre: "Pull-over con mancuerna",
        imagen: Pull_ove,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Acostado en un banco, sostiene una mancuerna con ambas manos sobre el pecho. Baja la mancuerna hacia atrás de la cabeza y vuelve a la posición inicial.",
        recomendacion: "Controla el movimiento y evita usar impulso.",
        musculos: ["Dorsales", "Pectorales", "Tríceps"],
        equipamiento: ["Mancuerna", "Banco"],
        youtube: "https://www.youtube.com/watch?v=nH14bLPmKUo"
      },
    ],
    ////////////////////////////////////////////////////////PIERNAS/////////////////////////////////////////////////////
    piernas: [
      {
        nombre: "Hacer sentadillas",
        imagen: hacer_sentadillas,
        series: 3,
        repeticiones: "10-15",
        descripcion: "De pie con los pies al ancho de los hombros, baja el cuerpo como si fueras a sentarte, manteniendo la espalda recta y el pecho hacia arriba. Regresa a la posición inicial.",
        recomendacion: "Asegúrate de que tus rodillas no sobrepasen tus pies al bajar.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Ninguno"],
        youtube: "https://www.youtube.com/watch?v=QKK1xLiCo6I"
      },
      {
        nombre: "Prensa de piernas",
        imagen: prensa_de_piernas,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Colócate en la máquina de prensa de piernas, coloca los pies en la plataforma y empuja hacia arriba hasta extender las piernas y luego vuelve a la posición inicial.",
        recomendacion: "Mantén la espalda apoyada en el respaldo durante el ejercicio.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Máquina de prensa de piernas"],
        youtube: "https://www.youtube.com/watch?v=GQ96n0hYYAU"
      },
      {
        nombre: "Extensión de piernas",
        imagen: Extensión_de_piernas,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Siéntate en la máquina de extensión de piernas y coloca los pies bajo el rodillo. Extiende las piernas hasta que estén completamente rectas y luego vuelve a la posición inicial.",
        recomendacion: "No uses pesos excesivos que comprometan la técnica.",
        musculos: ["Cuádriceps"],
        equipamiento: ["Máquina de extensión de piernas"],
        youtube: "https://www.youtube.com/watch?v=ulXohw2vQ8g"
      },
      {
        nombre: "Curl de piernas",
        imagen: Curl_de_piernas,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Acostado boca abajo en la máquina de curl de piernas, coloca los pies debajo del rodillo y dobla las piernas hacia arriba, apretando los isquiotibiales. Regresa a la posición inicial.",
        recomendacion: "No arquees la espalda durante el movimiento.",
        musculos: ["Isquiotibiales"],
        equipamiento: ["Máquina de curl de piernas"],
        youtube: "https://www.youtube.com/watch?v=wfOKxFVR8xY"
      },
      {
        nombre: "Peso muerto",
        imagen: Peso_muerto,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Coloca una barra en el suelo. Con los pies al ancho de los hombros, flexiona las caderas y las rodillas para agarrar la barra. Levanta la barra manteniendo la espalda recta hasta que estés de pie.",
        recomendacion: "Mantén la espalda recta y usa tus piernas para levantar la barra.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales", "Erectores de la columna"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=op9kVnSso6Q"
      },
    ],
    ////////////////////////////////////////////////////////BÍCEPS/////////////////////////////////////////////////////
    biceps: [
      {
        nombre: "Curl de bíceps con barra",
        imagen: curl_con_mancuernas,
        series: 3,
        repeticiones: "8-10",
        descripcion: "De pie, con una barra en las manos, flexiona los codos para levantar la barra hacia los hombros y luego baja lentamente.",
        recomendacion: "Evita mover los hombros y mantén los codos pegados al torso.",
        musculos: ["Bíceps"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo"
      },
      {
        nombre: "Curl martillo",
        imagen: Martillo,
        series: 3,
        repeticiones: "10-12",
        descripcion: "De pie, con una mancuerna en cada mano, mantén las palmas enfrentadas y flexiona los codos para levantar las mancuernas hacia los hombros.",
        recomendacion: "Controla el movimiento y no uses impulso.",
        musculos: ["Bíceps", "Braquiorradial"],
        equipamiento: ["Mancuernas"],
        youtube: "https://www.youtube.com/watch?v=zC3nLlEvin4"
      },
      {
        nombre: "Curl de bíceps en predicador",
        imagen: Predicador,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Siéntate en una banca de predicador, con los brazos apoyados en la almohadilla. Levanta la barra o las mancuernas hacia los hombros y baja lentamente.",
        recomendacion: "Evita que los codos se levanten al bajar.",
        musculos: ["Bíceps"],
        equipamiento: ["Banca de predicador", "Barra o mancuernas"],
        youtube: "https://www.youtube.com/watch?v=JqAGaI3C1D4"
      },
      {
        nombre: "Veinte uno",
        imagen: veinte_uno,
        series: 3,
        repeticiones: "21",
        descripcion: "Realiza 7 repeticiones desde la parte baja hasta la mitad del movimiento, 7 repeticiones desde la mitad hasta la parte alta y 7 repeticiones completas.",
        recomendacion: "Usa un peso moderado para mantener la técnica adecuada.",
        musculos: ["Bíceps"],
        equipamiento: ["Barra o mancuernas"],
        youtube: "https://www.youtube.com/watch?v=SK4J4K4TAAk"
      },
    ],
  };
  
  return (
    <div className='rutinaPrinBody'>
    <Navegar/>
    <div className="contenedor-rutina">
      <div className="encabezado-rutina">
        <h1>RUTINA PARA PRINCIPIANTES</h1>
        <p className="subtitulo">Comienza tu viaje fitness con estos ejercicios básicos</p>
      </div>

      <div className="ejercicios-grid">
        <div className="tarjeta-ejercicio">
          <div className="contenido-tarjeta">
            <div className="icono-ejercicio pecho"></div>
            <h2>Pecho</h2>
            <p>Desarrolla fuerza y definición en tus pectorales.</p>
            <button className="boton-ver-rutina" onClick={() => setRutinaActiva('Pecho_y_Tríceps')}>
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
            <button className="boton-ver-rutina" onClick={() => setRutinaActiva('piernas')}>
              Ver rutina
              <span className="icono-flecha">→</span>
            </button>
          </div>
        </div>

        <div className="tarjeta-ejercicio">
          <div className="contenido-tarjeta">
            <div className="icono-ejercicio brazos"></div>
            <h2>Bicep</h2>
            <p>Tonifica y fortalece tus Bicep.</p>
            <button className="boton-ver-rutina" onClick={() => setRutinaActiva('biceps')}>
              Ver rutina
              <span className="icono-flecha">→</span>
            </button>
          </div>
        </div>
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
    </div>
  );
}

export default RutinaPrincipiante;
