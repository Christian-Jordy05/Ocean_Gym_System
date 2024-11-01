import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import QRCode from 'qrcode';

// Función para enviar correo
const enviarCorreo = async (formData) => {
  const templateParams = {
    from_name: formData.nombre,
    qrCode: formData.qrCode, // Enviar la URL del código QR
    reply_to: formData.email,  // Email del remitente
    to_email: 'delgadoyacith12@gmail.com' // Email del destinatario
  };

  try {
    const response = await emailjs.send(
      'service_5cr9zh8', // ID del servicio
      'template_4p4w5pd', // ID de la plantilla
      templateParams,
      'O39cVd9-32WxHY5S3' // ID del usuario
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

// Función para subir el QR a Imgur
const uploadQRToImgur = async (formData) => {
  // Validar datos
  if (!formData.nombre || !formData.email || !formData.message) {
    throw new Error('Todos los campos son obligatorios');
  }

  const qrBase64 = await QRCode.toDataURL(`Nombre: ${formData.nombre}\nEmail: ${formData.email}\nMensaje: ${formData.message}`);

  try {
    const response = await fetch('http://localhost:8000/generar_qr_imgur/', {  // Agregado la barra diagonal
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        email: formData.email,
        message: formData.message,
        qr_base64: qrBase64.split(',')[1],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();  // Obtener el texto de respuesta
      throw new Error(`Error ${response.status}: ${errorText}`); // Lanza un error con el texto de respuesta
    }

    const data = await response.json();
    if (data.imgur_link) {
      return data.imgur_link;
    } else {
      throw new Error('No se recibió la URL del QR desde el backend');
    }
  } catch (error) {
    console.error('Error al subir el QR:', error);
    throw new Error('Error al subir el QR a Imgur');
  }
};

// Exportar funciones
export { enviarCorreo, uploadQRToImgur };
