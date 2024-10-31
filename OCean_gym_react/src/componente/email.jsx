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


    const templateParams = {
      to_email: 'info@tudominio.com',  
      bcc: emails.split(',').map(email => email.trim()).join(','), 
      message: message,
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
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EmailForm;
