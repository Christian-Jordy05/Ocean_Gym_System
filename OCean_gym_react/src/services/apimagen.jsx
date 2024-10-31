// services/ApiCorreo.js
import emailjs from 'emailjs-com';

const enviarCorreo = async (formData) => {
  try {
    const response = await emailjs.send(
      'service_5cr9zh8',
      'template_4p4w5pd',
      {
        from_name: formData.nombre,
        reply_to: formData.email,
        message: formData.message,
        image_url: formData.imageUrl, 
      },
      'O39cVd9-32WxHY5S3'
    );

    console.log('Email enviado:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
};

export { enviarCorreo };