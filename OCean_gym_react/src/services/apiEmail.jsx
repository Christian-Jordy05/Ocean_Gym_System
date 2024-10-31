src/services/emailService.js
import emailjs from 'emailjs-com';

const sendEmail = async (formData) => {
  try {
    const result = await emailjs.send(
      'service_5cr9zh8', // Reemplaza con tu Service ID de EmailJS
      'template_fohos1d', // Reemplaza con tu Template ID de EmailJS
      formData,
      'O39cVd9-32WxHY5S3' // Reemplaza con tu User ID de EmailJS
    );
    return result;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

export { sendEmail };
