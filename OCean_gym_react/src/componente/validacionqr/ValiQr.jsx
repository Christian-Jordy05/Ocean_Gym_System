import { useState } from 'react';
import { uploadQRToImgur } from '../../services/ApiCorreo';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';


const validateEmails = (emailString) => {
  const emailArray = emailString.split(',').map(email => email.trim());
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailArray.every(email => emailRegex.test(email));
};

function ValiQr() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '', 
    message: '',
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar correos electrónicos
      if (!validateEmails(formData.email)) {
        Swal.fire({
          title: 'Error',
          text: "Uno o más correos electrónicos no son válidos.",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        setLoading(false);
        return;
      }

      // Subir el código QR y obtener la URL desde el backend
      const uploadedQrCodeUrl = await uploadQRToImgur(formData);

      if (!uploadedQrCodeUrl) throw new Error('No se obtuvo la URL del QR');

      // Parámetros para enviar el correo
      const templateParams = {
        from_name: formData.nombre,
        qrCode: uploadedQrCodeUrl,
        reply_to: formData.email,  // Email del remitente
        bcc: formData.email.split(',').map(email => email.trim()).join(','), // Correos en BCC
        message: formData.message
      };

      // Enviar correo utilizando emailjs
      const response = await emailjs.send(
        'service_5cr9zh8', // ID del servicio
        'template_fohos1d', // ID de la plantilla
        templateParams,
        'O39cVd9-32WxHY5S3' // ID del usuario
      );

      Swal.fire({
        title: 'Éxito',
        text: 'Correo enviado con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar el correo. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="BodyContacto">
      <div className="formulario-contacto">
        <h2>Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              aria-label="Nombre"
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email"
              placeholder="Ingresa correo"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-control">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-label="Mensaje"
            ></textarea>
            <label htmlFor="message">Mensaje</label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ValiQr;
