import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import './Qr_de_user.css';

const Qr_de_user = () => {
  const token = Cookies.get('user_token'); 
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get('id');

        if (!userId) {
          throw new Error('No se proporcionó un ID de usuario');
        }

        const response = await fetch(`http://localhost:8000/Inscripcion/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Añadir el token en los headers
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se encontró la inscripción`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) { 
      fetchUserData();
    } else {
      setError('No se encontró un token de autenticación');
      setLoading(false);
    }
  }, [token]); // Dependencia del token

  if (loading) {
    return <div>Cargando datos del usuario...</div>;
  }
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  return (
    <div className='contenedor-detalles-usuario'>
      {userData && (
        <div className='tarjeta-usuario'>
          <h2 className='titulo-usuario'>Información del Usuario</h2>
          <div className='info-usuario'>
            <div className='campo-usuario'>
              <span className='etiqueta'>Email</span>
              <span className='valor email'>{userData.email}</span>
            </div>
            <div className='campo-usuario'>
              <span className='etiqueta'>Fecha de Inscripción</span>
              <span className='valor'>{userData.fecha_inscripcion}</span>
            </div>
            <div className='campo-usuario'>
              <span className='etiqueta'>Fecha de Expiración</span>
              <span className='valor'>{userData.fecha_expiracion}</span>
            </div>
            <div className='campo-usuario'>
              <span className='etiqueta'>Días Restantes</span>
              <span className='valor'>{userData.dias_restantes}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Qr_de_user;
