import React from 'react';
import '../Contacto/Contacto.css';

function Contacto() {
  return (
    <div className="contenedor-contacto">
      {/* Sección de contacto y mapa */}
      <div className="encabezado-contacto">
        <div className='espacio1'>
          <h1>CONTÁCTANOS</h1>
          <p className="subtitulo">Nos encantaría saber de ti</p>
          <div className='linea'></div>
        </div>
        <div className='espacio2'>
          <iframe
            src="https://maps.google.com/maps?q=C.%20164,%20Provincia%20de%20Puntarenas,%20Chacarita,%20Costa%20Rica&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className='linea2'></div>
      <div className="detalles-contacto">
        <div className="columna-contacto">
          <h2>Contacto Directo</h2>
          <p>Ocean Gym</p>
          <p>C. 164, Provincia de Puntarenas, Chacarita, Costa Rica</p>
          <p>Tel: +506 nose</p>
          <p>Email: <a href="mailto:oceangympuntarenas@gmail.com">oceangympuntarenas@gmail.com</a></p>
        </div>
        <div className="columna-contacto">
          <h2>Contacto de Medios</h2>
          <p>Si estás interesado en promocionar con nosotros o colaborar, envíanos un correo para más información.</p>
        </div>
        <div className="columna-contacto">
          <h2>Trabaja con Nosotros</h2>
          <p>Si quieres unirte a nuestro equipo, envíanos tu currículum o portafolio a través de nuestro correo.</p>
        </div>
      </div>

      {/* Formulario de contacto */}
      <div className="formulario-contacto">
        <h2>Formulario de Contacto</h2>
        <form>
          <div className="form-control">
            <input type="text" required />
            <label>
              <span style={{ transitionDelay: '0ms' }}>N</span>
              <span style={{ transitionDelay: '50ms' }}>o</span>
              <span style={{ transitionDelay: '100ms' }}>m</span>
              <span style={{ transitionDelay: '150ms' }}>b</span>
              <span style={{ transitionDelay: '200ms' }}>r</span>
              <span style={{ transitionDelay: '250ms' }}>e</span>
            </label>
          </div>

          <div className="form-control">
            <input type="email" required />
            <label>
              <span style={{ transitionDelay: '0ms' }}>E</span>
              <span style={{ transitionDelay: '50ms' }}>m</span>
              <span style={{ transitionDelay: '100ms' }}>a</span>
              <span style={{ transitionDelay: '150ms' }}>i</span>
              <span style={{ transitionDelay: '200ms' }}>l</span>
            </label>
          </div>

          <div className="form-control">
            <textarea required></textarea>
            <label>
              <span style={{ transitionDelay: '0ms' }}>M</span>
              <span style={{ transitionDelay: '50ms' }}>e</span>
              <span style={{ transitionDelay: '100ms' }}>n</span>
              <span style={{ transitionDelay: '150ms' }}>s</span>
              <span style={{ transitionDelay: '200ms' }}>a</span>
              <span style={{ transitionDelay: '250ms' }}>j</span>
              <span style={{ transitionDelay: '300ms' }}>e</span>
            </label>
          </div>

          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
