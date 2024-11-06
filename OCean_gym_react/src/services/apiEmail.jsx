src/services/emailService.js
import emailjs from 'emailjs-com';

const sendEmail = async (formData) => {
  try {
    const result = await emailjs.send(
      'service_5cr9zh8', 
      'template_fohos1d', 
      formData,
      'O39cVd9-32WxHY5S3' 
    );
    return result;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

export { sendEmail };
