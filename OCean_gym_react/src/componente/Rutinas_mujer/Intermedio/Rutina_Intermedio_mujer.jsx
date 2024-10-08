import React from 'react'
import { useState } from 'react'
import pressBancaMujer from '../../img/pressBancaMujer.jpg'
import fondosParalelasMujer from '../../img/fondosParalelasMujer.png'
import pressInclinadoMancuernaMujer from '../../img/pressInclinadoMancuernaMujer.png'
// import fondosPechoMujer from '../../img/fondosPechoMujer.jpg'
import dominadasPesoMujer from '../../img/dominadasPesoMujer.png'
import remoBarraMujer from '../../img/remoBarraMujer.png'
// import jalonPoleaAltaMujer from '../../img/jalonPoleaAltaMujer.png'
import sentadillaBarraMujer from "../../img/sentadillaBarraMujer.png"
// import PrensaDePiernasMujer from '../../img/PrensaDePiernasMujer.png'
import pesoMuertoRumanoMujer from '../../img/pesoMuertoRumanoMujer.png'
import Desplantes from '../../img/Desplantes.jpg'
import ElevacionTalonesMujer from '../../img/ElevacionTalonesMujer.png'


function Rutina_Intermedio_mujer() {
  const [rutinaActiva, setRutinaActiva] = useState(null);

  const ejercicios = {
    ////////////////////////////////////////////////////////PECHO/////////////////////////////////////////////////////
    Pecho_y_Tríceps: [
      {
        nombre: "Press de banca con barra",
        imagen: pressBancaMujer,
        series: 4,
        repeticiones: "6-8",
        descripcion: "Acostada en un banco plano, sostén una barra con un agarre ligeramente mayor que el ancho de los hombros. Baja la barra hasta el pecho y luego empújala hacia arriba hasta que los brazos estén extendidos.",
        recomendacion: "Mantén los pies firmes en el suelo y no arquees la espalda.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Barra", "Banco plano"],
        youtube: "https://www.youtube.com/watch?v=gRVjAtPip0Y"
      },
      {
        nombre: "Fondos en paralelas asistidos",
        imagen: fondosParalelasMujer,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Colócate en las paralelas y baja el cuerpo controladamente hasta que los codos formen un ángulo de 90 grados, luego empújate hacia arriba hasta la posición inicial.",
        recomendacion: "Usa una banda elástica o máquina asistida si es necesario para completar el rango de repeticiones.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Paralelas"],
        youtube: "https://www.youtube.com/watch?v=3Wk3F8Jbe78"
      },
      {
        nombre: "Press de pecho inclinado con mancuernas",
        imagen: pressInclinadoMancuernaMujer,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Acostada en un banco inclinado, sostiene una mancuerna en cada mano a la altura del pecho. Empuja hacia arriba hasta que los brazos estén extendidos y luego baja lentamente.",
        recomendacion: "Asegúrate de que los codos estén en un ángulo de 45 grados al bajar.",
        musculos: ["Pectorales superiores", "Deltoides anteriores"],
        equipamiento: ["Mancuernas", "Banco inclinado"],
        youtube: "https://www.youtube.com/watch?v=2QfM8W_2L7Q"
      },
      // {
      //   nombre: "Flexiones con pies elevados",
      //   imagen: FlexionesElevadasMujer,
      //   series: 3,
      //   repeticiones: "6-10",
      //   descripcion: "Coloca los pies en una superficie elevada y las manos en el suelo. Baja el cuerpo hacia el suelo y empuja hacia arriba hasta volver a la posición inicial.",
      //   recomendacion: "Mantén el core activado durante todo el ejercicio.",
      //   musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
      //   equipamiento: ["Ninguno"],
      //   youtube: "https://www.youtube.com/watch?v=Y7NSg44Wq6I"
      // },
    ],
    ////////////////////////////////////////////////////////ESPALDA/////////////////////////////////////////////////////
    Espalda_y_Bíceps: [
      {
        nombre: "Peso muerto con piernas rectas",
        imagen: pesoMuertoRumanoMujer,
        series: 4,
        repeticiones: "8-10",
        descripcion: "De pie con los pies al ancho de los hombros, sostén una barra con las manos ligeramente más anchas que los hombros. Baja la barra hacia el suelo manteniendo la espalda recta y las piernas casi extendidas, luego vuelve a la posición inicial.",
        recomendacion: "Mantén siempre la espalda recta y no arquees la parte baja.",
        musculos: ["Isquiotibiales", "Dorsales", "Glúteos"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=H1pNRtH0sEE"
      },
      {
        nombre: "Remo con barra",
        imagen: remoBarraMujer,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Inclina el torso hacia adelante con la espalda recta y sostén una barra con un agarre ancho. Tira de la barra hacia tu abdomen manteniendo los codos pegados al cuerpo.",
        recomendacion: "Asegúrate de no redondear la espalda durante el movimiento.",
        musculos: ["Dorsales", "Trapecios", "Bíceps"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=YhI6T1ztF1I"
      },
      {
        nombre: "Dominadas",
        imagen: dominadasPesoMujer,
        series: 3,
        repeticiones: "Al fallo",
        descripcion: "Colócate en una barra de dominadas y usa tus brazos para elevar tu cuerpo hasta que tu barbilla supere la barra.",
        recomendacion: "Mantén un agarre firme y controla el movimiento al bajar.",
        musculos: ["Dorsales", "Bíceps"],
        equipamiento: ["Barra de dominadas"],
        youtube: "https://www.youtube.com/watch?v=acEl2D2UtbQ"
      },
    ],
    ////////////////////////////////////////////////////////PIERNAS/////////////////////////////////////////////////////
    Piernas: [
      {
        nombre: "Sentadillas con barra",
        imagen: sentadillaBarraMujer,
        series: 4,
        repeticiones: "8-10",
        descripcion: "Coloca la barra sobre la parte superior de tu espalda. De pie, con los pies al ancho de los hombros, baja el cuerpo como si fueras a sentarte. Regresa a la posición inicial.",
        recomendacion: "Mantén la espalda recta y el pecho hacia arriba durante todo el movimiento.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Barra"],
        youtube: "https://www.youtube.com/watch?v=0pY1G_MI0Gk"
      },
      {
        nombre: "Desplantes",
        imagen: Desplantes,
        series: 3,
        repeticiones: "10-12 por pierna",
        descripcion: "De pie, da un paso hacia adelante con una pierna y baja la cadera hasta que ambas rodillas estén en un ángulo de 90 grados. Regresa a la posición inicial y repite con la otra pierna.",
        recomendacion: "Mantén la espalda recta y el abdomen contraído durante el ejercicio.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Ninguno"],
        youtube: "https://www.youtube.com/watch?v=0E3V8vL3mJo"
      },
      {
        nombre: "Elevación de talones en máquina",
        imagen: ElevacionTalonesMujer,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Coloca tus pies en la plataforma de la máquina de elevación de talones y empuja hacia arriba usando tus pantorrillas. Vuelve a la posición inicial.",
        recomendacion: "Controla el movimiento y no dejes que tus talones toquen el suelo al bajar.",
        musculos: ["Gemelos"],
        equipamiento: ["Máquina de elevación de talones"],
        youtube: "https://www.youtube.com/watch?v=gByazwW2DiM"
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

export default Rutina_Intermedio_mujer
