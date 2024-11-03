import React, { useState } from 'react';
import QRCode from 'qrcode';

const ValiQr = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState(''); // Nuevo estado para el correo
  const [imgurLink, setImgurLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadQRToImgur = async () => { // Cambiar la firma de la función
    if (!userId || !email) { // Validar ambos campos
      setError('Por favor ingrese un ID válido y un correo electrónico');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const qrLink = `http://localhost:5173/saludo?id=${userId}`;
      console.log('QR Link generado:', qrLink);

      const qrBase64 = await QRCode.toDataURL(qrLink);
      console.log('QR generado exitosamente');

      const response = await fetch('http://localhost:8000/generar_qr_imgur/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qr_base64: qrBase64.split(',')[1],
          email: email, // Usar el email del nuevo input
        }),
      });

      console.log('Estado de la respuesta:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);

      if (data.imgur_link) {
        setImgurLink(data.imgur_link);
      } else {
        throw new Error('No se recibió la URL del QR desde el backend');
      }
    } catch (error) {
      console.error('Error completo:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendQR = () => {
    uploadQRToImgur(); // Llamar la función sin argumento
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generar y Enviar QR</h1>
      
      <div className="mb-4">
        <input
          type="number"
          placeholder="Ingrese el ID del cliente"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4"> {/* Nuevo contenedor para el input del correo */}
        <input
          type="email" // Cambiar el tipo a "email"
          placeholder="Ingrese su correo electrónico"
          value={email} // Vincular al nuevo estado
          onChange={(e) => setEmail(e.target.value)} // Actualizar el estado con el correo
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSendQR}
        disabled={!userId || !email || loading} // Deshabilitar si falta algún campo
        className={`w-full p-2 rounded ${
          loading || !userId || !email
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {loading ? 'Generando...' : 'Enviar QR'}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {imgurLink && (
        <div className="mt-4">
          <p className="font-bold">Enlace del QR:</p>
          <a
            href={imgurLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 break-all"
          >
            {imgurLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ValiQr;
