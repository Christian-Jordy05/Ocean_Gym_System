import QRCode from 'qrcode';

// Generar QR y enviarlo al backend
const uploadQRToImgur = async (email) => {
  const qrLink = `http://${domain}:3000/saludo`; // URL a la que redirige el QR
  const qrBase64 = await QRCode.toDataURL(qrLink); // Generar el QR

  try {
    const response = await fetch(`http://localhost:8000/generar_qr_imgur/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qr_base64: qrBase64.split(',')[1], // Enviar solo el QR en base64
        email: email, // Asegúrate de enviar el correo aquí
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    if (data.imgur_link) {
      setImgurLink(data.imgur_link); // Guardar el enlace de Imgur
      // Llamar a la función para enviar el QR por correo
      sendQRByEmail(email, data.imgur_link); // Asegúrate de que esta función esté definida y sea correcta
    } else {
      throw new Error('No se recibió la URL del QR desde el backend');
    }
  } catch (error) {
    console.error('Error al subir el QR:', error);
  }
};



const handleSendQR = async () => {
  const userEmail = 'yordy244@gmail.com'; 
  await uploadQRToImgur(userEmail);
};
