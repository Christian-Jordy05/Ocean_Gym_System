import React from 'react'
import { useState } from 'react'
import press_de_banca from '../../img/press-de-banca.png'
import fondosParalelasMujer from '../../img/fondosParalelasMujer.png'
import pressInclinadoMancuernaMujer from '../../img/pressInclinadoMancuernaMujer.png'
import fondosPechoMujer from '../../img/fondosPechoMujer.jpg'
import dominada from '../../img/dominada.jpg'
import remoBarraMujer from '../../img/remoBarraMujer.png'
import remoMaquinaMujer from '../../img/remoMaquinaMujer.png'
import sentadillaBarraMujer from '../../img/sentadillaBarraMujer.png'
import PrensaDePiernasMujer from '../../img/PrensaDePiernasMujer.png'
import pesoMuertoRumanoMujer from '../../img/pesoMuertoRumanoMujer.png'


function Rutina_Experto_mujer() {
  const [rutinaActiva, setRutinaActiva] = useState(null);

  const ejercicios = {
    ////////////////////////////////////////////////////////PECHO/////////////////////////////////////////////////////
    Pecho_y_Tríceps: [
      {
        nombre: "Press de banca con barra",
        imagen: press_de_banca,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Acostada en un banco plano, sostén una barra con un agarre ligeramente mayor que el ancho de los hombros. Baja la barra hasta el pecho y luego empújala hacia arriba hasta que los brazos estén extendidos.",
        recomendacion: "Mantén los pies firmes en el suelo y no arquees la espalda.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Barra", "Banco plano"],
        youtube: "https://www.youtube.com/watch?v=gRVjAtPip0Y"
      },
      {
        nombre: "Fondos en paralelas",
        imagen: fondosParalelasMujer,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Colócate en las paralelas y baja el cuerpo controladamente hasta que los codos formen un ángulo de 90 grados, luego empújate hacia arriba hasta la posición inicial.",
        recomendacion: "Usa una banda elástica si es necesario para completar el rango de repeticiones.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Paralelas"],
        youtube: "https://www.youtube.com/watch?v=WDw0di93i9Y"
      },
      {
        nombre: "Press inclinado con barra",
        imagen: pressInclinadoMancuernaMujer,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Acostada en un banco inclinado, sostén una barra con un agarre ligeramente mayor que el ancho de los hombros. Empuja la barra hacia arriba y luego baja controladamente.",
        recomendacion: "Mantén el core activado para evitar balanceos.",
        musculos: ["Pectorales superiores", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Barra", "Banco inclinado"],
        youtube: "https://www.youtube.com/watch?v=HnL2T3UmHoo"
      },
      {
        nombre: "Fondos de pecho",
        imagen: fondosPechoMujer,
        series: 3,
        repeticiones: "6-8",
        descripcion: "Apoya las manos en dos superficies elevadas y realiza un fondo bajando el pecho controladamente hasta que los brazos estén paralelos al suelo.",
        recomendacion: "Controla el descenso y empuja fuerte al subir.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Superficies elevadas"],
        youtube: "https://www.youtube.com/watch?v=lrkJVTfJB94"
      }
    ],
    ////////////////////////////////////////////////////////ESPALDA/////////////////////////////////////////////////////
    Espalda_y_Bíceps: [
      {
        nombre: "Dominadas",
        imagen: dominada,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Colócate en una barra de dominadas con las manos separadas a la anchura de los hombros. Sube tu cuerpo hasta que la barbilla supere la barra y baja lentamente.",
        recomendacion: "Mantén la espalda recta y no uses impulso.",
        musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
        equipamiento: ["Barra de dominadas"],
        youtube: "https://www.youtube.com/watch?v=UOwRHT8Y1Jk"
      },
      {
        nombre: "Remo con barra",
        imagen: remoBarraMujer,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Inclina el torso hacia adelante sosteniendo una barra. Tira de la barra hacia tu abdomen manteniendo la espalda recta.",
        recomendacion: "No uses impulso y controla el movimiento.",
        musculos: ["Dorsales", "Trapecios", "Bíceps"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=6iRtq1R4fWk"
      },
      {
        nombre: "Remo en máquina",
        imagen: remoMaquinaMujer,
        series: 4,
        repeticiones: "8-10",
        descripcion: "Siéntate en la máquina de remo y tira del agarre hacia tu abdomen, manteniendo la espalda recta.",
        recomendacion: "Controla el movimiento y mantén el core activado.",
        musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
        equipamiento: ["Máquina de remo"],
        youtube: "https://www.youtube.com/watch?v=9LXAs9BhYfY"
      },
    ],
    ////////////////////////////////////////////////////////PIERNAS/////////////////////////////////////////////////////
    Piernas: [
      {
        nombre: "Sentadillas con barra",
        imagen: sentadillaBarraMujer,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Coloca una barra en la parte superior de la espalda, baja el cuerpo como si fueras a sentarte, manteniendo la espalda recta y el pecho hacia arriba.",
        recomendacion: "Asegúrate de que tus rodillas no sobrepasen tus pies al bajar.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=7tY8E4B32bI"
      },
      {
        nombre: "Prensa de piernas pesada",
        imagen: PrensaDePiernasMujer,
        series: 4,
        repeticiones: "8-10",
        descripcion: "Colócate en la máquina de prensa de piernas, coloca los pies en la plataforma y empuja hacia arriba hasta extender las piernas.",
        recomendacion: "Mantén la espalda apoyada en el respaldo durante el ejercicio.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Máquina de prensa de piernas"],
        youtube: "https://www.youtube.com/watch?v=GQ96n0hYYAU"
      },
      {
        nombre: "Peso muerto",
        imagen: pesoMuertoRumanoMujer,
        series: 4,
        repeticiones: "6-8",
        descripcion: "De pie, sostén una barra con las piernas ligeramente flexionadas. Inclina el torso hacia adelante, bajando la barra por las piernas y luego vuelve a la posición inicial.",
        recomendacion: "Mantén la espalda recta durante todo el movimiento.",
        musculos: ["Isquiotibiales", "Glúteos", "Espalda baja"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=2fTz2q2xP6o"
      },
    ],
};




  return (
    <div className="contenedor-rutina">
      <div className="encabezado-rutina">
        <h1>RUTINA PARA INTERMEDIO</h1>
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

export default Rutina_Experto_mujer
