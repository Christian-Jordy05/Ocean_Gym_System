import React from 'react'
import { useState } from 'react'
import pressBancaMujer from '../../img/pressBancaMujer.jpg'
import FlexionesMujer from '../../img/FlexionesMujer.jpg'
import AperturaMancuernaMujer from '../../img/AperturaMancuernaMujer.png'
import CruceEntrePoleasMujer from '../../img/CruceEntrePoleasMujer.png'
import RemoConMancuernasMujer from '../../img/RemoConMancuernasMujer.png'
import DominadasAsistidasMujer from '../../img/DominadasAsistidasMujer.jpg'
import RemoConBandaMujer from '../../img/RemoConBandaMujer.png'
import SentadillasMujer from '../../img/SentadillasMujer.jpg'
import PrensaDePiernasMujer from '../../img/PrensaDePiernasMujer.png'
import ElevacionTalonesMujer from '../../img/ElevacionTalonesMujer.png'
import Navegar from '../../navegacion/navegar'


function Rutina_Principiante_mujer() {
  const [rutinaActiva, setRutinaActiva] = useState(null);

  const ejerciciosPrincipianteMujeres = {
    ////////////////////////////////////////////////////////PECHO/////////////////////////////////////////////////////
    Pecho_y_Tríceps: [
      {
        nombre: "Press de banca con mancuernas",
        imagen: pressBancaMujer,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Acostada en un banco, sostén una mancuerna en cada mano a la altura del pecho. Baja las mancuernas controladamente y luego empújalas hacia arriba hasta que los brazos estén extendidos.",
        recomendacion: "Descansa 1-2 minutos entre cada serie para permitir la recuperación.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores"],
        equipamiento: ["Mancuernas", "Banco plano"],
        youtube: "https://www.youtube.com/watch?v=0Y8eShQf6aA"
      },
      {
        nombre: "Flexiones modificadas",
        imagen: FlexionesMujer,
        series: 2,
        repeticiones: "5-10",
        descripcion: "Colócate en posición de plancha sobre las rodillas, con las manos alineadas con los hombros. Baja el cuerpo hacia el suelo manteniendo una línea recta desde la cabeza hasta las rodillas, y luego empuja hacia arriba hasta la posición inicial.",
        recomendacion: "Mantén el core activado durante todo el movimiento.",
        musculos: ["Pectorales", "Tríceps", "Deltoides anteriores", "Core"],
        equipamiento: ["Ninguno"],
        youtube: "https://www.youtube.com/watch?v=IOw-z8pA3lY"
      },
      {
        nombre: "Apertura con mancuernas",
        imagen: AperturaMancuernaMujer,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Acostada en un banco plano, sostiene una mancuerna en cada mano con los brazos extendidos sobre el pecho. Abre los brazos hacia los lados en un movimiento controlado y luego vuelve a la posición inicial.",
        recomendacion: "Mantén una ligera flexión en los codos durante todo el movimiento para reducir la tensión en las articulaciones.",
        musculos: ["Pectorales", "Deltoides anteriores"],
        equipamiento: ["Mancuernas", "Banco plano"],
        youtube: "https://www.youtube.com/watch?v=R7j3jW5EbYc"
      },
      {
        nombre: "Cruce entre poleas",
        imagen: CruceEntrePoleasMujer,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Colócate en el centro de dos poleas altas. Toma una manija en cada mano y, con una ligera inclinación hacia adelante, tira de las manijas hacia el centro del pecho, cruzando ligeramente los brazos, y luego regresa lentamente a la posición inicial.",
        recomendacion: "Concéntrate en apretar los músculos pectorales en la parte superior del movimiento.",
        musculos: ["Pectorales", "Deltoides anteriores"],
        equipamiento: ["Máquina de poleas"],
        youtube: "https://www.youtube.com/watch?v=sAcRcp4M8iU"
      },
    ],
    ////////////////////////////////////////////////////////ESPALDA/////////////////////////////////////////////////////
    Espalda_y_Bíceps: [
      {
        nombre: "Remo con mancuernas",
        imagen: RemoConMancuernasMujer,
        series: 3,
        repeticiones: "8-10",
        descripcion: "Sostén una mancuerna en cada mano, inclina el torso hacia adelante con la espalda recta y tira de las mancuernas hacia el abdomen.",
        recomendacion: "Mantén la espalda recta durante el movimiento y no uses impulso.",
        musculos: ["Dorsales", "Trapecios", "Bíceps"],
        equipamiento: ["Mancuernas"],
        youtube: "https://www.youtube.com/watch?v=2K3FqgIu1L0"
      },
      {
        nombre: "Dominadas asistidas",
        imagen: DominadasAsistidasMujer,
        series: 3,
        repeticiones: "Al fallo",
        descripcion: "Colócate en una barra de dominadas con las manos separadas a la anchura de los hombros. Usa una banda elástica para asistirte mientras tiras de ti mismo hacia arriba hasta que tu barbilla supere la barra y luego baja lentamente hasta la posición inicial.",
        recomendacion: "Mantén la espalda recta y no uses impulso.",
        musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
        equipamiento: ["Barra de dominadas", "Banda elástica"],
        youtube: "https://www.youtube.com/watch?v=DrF2j8B8Z0Y"
      },
      {
        nombre: "Remo con banda elástica",
        imagen: RemoConBandaMujer,
        series: 3,
        repeticiones: "12",
        descripcion: "Coloca una banda elástica en una superficie fija y, con ambos brazos, tira de la banda hacia el abdomen, manteniendo la espalda recta.",
        recomendacion: "Controla el movimiento y no uses impulso.",
        musculos: ["Dorsales", "Bíceps", "Deltoides posteriores"],
        equipamiento: ["Banda elástica"],
        youtube: "https://www.youtube.com/watch?v=pBMsL5Fz7hY"
      },
    ],
    ////////////////////////////////////////////////////////PIERNAS/////////////////////////////////////////////////////
    Piernas: [
      {
        nombre: "Sentadillas",
        imagen: SentadillasMujer,
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
        imagen: PrensaDePiernasMujer,
        series: 3,
        repeticiones: "10-12",
        descripcion: "Colócate en la máquina de prensa de piernas, coloca los pies en la plataforma y empuja hacia arriba hasta extender las piernas y luego vuelve a la posición inicial.",
        recomendacion: "Mantén la espalda apoyada en el respaldo durante el ejercicio.",
        musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
        equipamiento: ["Máquina de prensa de piernas"],
        youtube: "https://www.youtube.com/watch?v=GQ96n0hYYAU"
      },
      {
        nombre: "Elevación de talones",
        imagen: ElevacionTalonesMujer,
        series: 3,
        repeticiones: "10-15",
        descripcion: "De pie, eleva los talones del suelo manteniendo la posición durante un segundo y luego regresa a la posición inicial.",
        recomendacion: "Realiza el ejercicio de manera controlada y mantén el equilibrio.",
        musculos: ["Gemelos"],
        equipamiento: ["Ninguno"],
        youtube: "https://www.youtube.com/watch?v=0VY1bK4hmb4"
      },
    ],
  };
  return (
    <>
    <Navegar/>
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
    </>
  );
}
export default Rutina_Principiante_mujer
