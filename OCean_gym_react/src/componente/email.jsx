import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = () => {
  const [emails, setEmails] = useState(''); // Cambia a un solo string
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  // Función para validar los correos electrónicos
  const validateEmails = (emailString) => {
    const emailArray = emailString.split(',').map(email => email.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailArray.every(email => emailRegex.test(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmails(emails)) {
      alert("Uno o más correos electrónicos no son válidos.");
      return;
    }

    // Parámetros para enviar el correo
    const templateParams = {
      to_email: 'info@tudominio.com',  // Puedes usar una dirección genérica o cualquier correo válido
      bcc: emails.split(',').map(email => email.trim()).join(','), // Correos para Bcc
      message: message,
      image_url: 'https://media.vandalsports.com/i/1706x960/5-2024/202459164425_1.jpg.webp', // Aquí reemplaza con la URL de la imagen
    };

    emailjs.send('service_lqeq9ft', 'template_lk6v826', templateParams, 'nQBqBPTyVgkmpVvW2')
      .then((result) => {
        console.log(result.text);
        alert("Correo enviado exitosamente!");
      }, (error) => {
        console.log(error.text);
        alert("Error al enviar el correo.");
      });
  };

  // Asegúrate de que el 'return' esté dentro del cuerpo de la función EmailForm
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar un Correo</h2>
      <input
        type="text"
        placeholder="Correos separados por comas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        required
      />
      <textarea
        placeholder="Tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EmailForm;
