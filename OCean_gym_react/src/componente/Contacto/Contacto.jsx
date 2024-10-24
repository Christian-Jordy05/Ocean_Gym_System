import '../Contacto/Contacto.css';
import { enviarCorreo } from '../../services/ApiCorreo';
import { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await enviarCorreo(formData);
      console.log(data);
      if (data) {
        setFormData({
          nombre: '',
          email: '',
          message: ''
        });
      } else {
      }
    } catch (error) {
     alert('Error al enviar el correo. Intenta nuevamente.');
    }
  };

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
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="370"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            title="Ubicación de Ocean Gym"
          ></iframe>
        </div>
      </div>
      <div className='linea2'></div>

      {/* Formulario de contacto */}
      <div className="formulario-contacto">
        <h2>Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            <label>Nombre</label>
          </div>

          {/* <div className="form-control">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Email</label>
          </div> */}

          <div className="form-control">
            <textarea name="message" value={formData.message} onChange={handleChange} required />
            <label>Mensaje</label>
          </div>

          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
