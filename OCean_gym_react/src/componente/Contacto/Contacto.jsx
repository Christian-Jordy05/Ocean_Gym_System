import React, { useState } from 'react';
import '../Contacto/Contacto.css';
import Navegar from '../navegacion/navegar';
let domain =window.location.origin
function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', mensaje: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.mensaje) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const token = getCookie('user_token'); 
      const response = await fetch(`http://localhost:8000/api/send-contact-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess("¡Mensaje enviado con éxito!");
        setFormData({ nombre: '', mensaje: '' });
        setError('');
      } else {
        const result = await response.json();
        setError(result.error || "Error al enviar el mensaje.");
      }
    } catch (error) {
      setError("Error al enviar el mensaje. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className='BodyContacto'>
      <Navegar />
      <div className="contenedor-contacto">
        <div className="encabezado-contacto">
          <div className='espacio1'>
            <h1>CONTÁCTANOS</h1>
            <p className="subtitulo">Nos encantaría saber de ti</p>
            <div className='linea'></div>
          </div>
          <div className='espacio2'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.644444444444!2d-84.7574158!3d9.9802966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0316cd1bda3f9%3A0xb6112bf209eefd7b!2sOcean%20Gym!5e0!3m2!1ses!2scr!4v1672554401151!5m2!1ses!2scr"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 'var(--border-radius)' }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación de Ocean Gym"
            ></iframe>
          </div>
        </div>
        <div className='linea2'></div>
        <div className="detalles-contacto">
          <div className="columna-contacto">
            <h2>Contacto Directo</h2>
            <p>Ocean Gym</p>
            <p>C. 164, Provincia de Puntarenas, Chacarita, Costa Rica</p>
            <p>Tel: +506 1234-5678</p>
            <p>Email: <a href="mailto:oceangympuntarenas@gmail.com">oceangympuntarenas@gmail.com</a></p>
          </div>
          <div className="columna-contacto">
            <h2>Contacto de Medios</h2>
            <p>Si te gustaría saber o estás interesado sobre nuestro gimnasio, envíanos un correo para más información.</p>
          </div>
          <div className="columna-contacto">
            <h2>Trabaja con Nosotros</h2>
            <p>Si quieres unirte a nuestro gimnasio, envíanos un mensaje por WhatsApp o llega personalmente.</p>
          </div>
        </div>
        <div className="formulario-contacto">
          <h2>Formulario de Contacto</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
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
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
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
    </div>
  );
}

export default Contacto;
