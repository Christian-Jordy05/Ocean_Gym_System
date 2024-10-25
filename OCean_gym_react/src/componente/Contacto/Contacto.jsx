import '../Contacto/Contacto.css'; 
import { enviarCorreo } from '../../services/ApiCorreo';
import { useState } from 'react';
import Swal from 'sweetalert2';

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
      if (data) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Correo enviado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        setFormData({
          nombre: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al enviar el correo. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="contenedor-contacto">
      <h2>Formulario de Contacto</h2>
      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <div className="form-control">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          <label>
              <span style={{ transitionDelay: '0ms' }}>N</span>
              <span style={{ transitionDelay: '50ms' }}>o</span>
              <span style={{ transitionDelay: '100ms' }}>m</span>
              <span style={{ transitionDelay: '150ms' }}>b</span>
              <span style={{ transitionDelay: '200ms' }}>r</span>
              <span style={{ transitionDelay: '200ms' }}>e</span>
            </label>
        </div>

        <div className="form-control">
          <textarea name="message" value={formData.message} onChange={handleChange} required />
            <label>
              <span style={{ transitionDelay: '0ms' }}>M</span>
              <span style={{ transitionDelay: '50ms' }}>e</span>
              <span style={{ transitionDelay: '100ms' }}>n</span>
              <span style={{ transitionDelay: '150ms' }}>s</span>
              <span style={{ transitionDelay: '200ms' }}>a</span>
              <span style={{ transitionDelay: '200ms' }}>j</span>
              <span style={{ transitionDelay: '200ms' }}>e</span>
            </label>
        </div>

        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default Contacto;
