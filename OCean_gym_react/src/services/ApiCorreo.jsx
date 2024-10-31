import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

const enviarCorreo = async (formData) => {
  const templateParams = {
    from_name: formData.nombre,
    message: formData.message,
    reply_to: formData.email,  // Email del remitente (quien llena el formulario)
    to_email: 'delgadoyacith12@gmail.com' // Email fijo del destinatario
  };

  try {
    const response = await emailjs.send(
      'service_5cr9zh8',
      'template_4p4w5pd',
      templateParams,
      'O39cVd9-32WxHY5S3'
    );
    
    // Mostrar la alerta de éxito
    Swal.fire({
      title: 'Enviado con éxito',
      text: 'Tu mensaje ha sido enviado.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    
    return response;
  } catch (error) {
    // Mostrar la alerta de error
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al enviar el correo. Inténtalo nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    
    throw error;
  }
};

export { enviarCorreo };
