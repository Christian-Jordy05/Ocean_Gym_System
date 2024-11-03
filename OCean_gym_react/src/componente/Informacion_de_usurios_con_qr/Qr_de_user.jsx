
import React, { useEffect, useState } from 'react';
import './Qr_de_user.css'

const Qr_de_user = () => {
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener el ID del usuario de la URL
        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get('id');

        // Verificar si se obtuvo el ID
        if (!userId) {
          throw new Error('No se proporcionó un ID de usuario');
        }
        const response = await fetch(`http://localhost:8000/Inscripcion/${userId}/`);
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
    }
  
    fetchUserData();
  }, []); 


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
                <span className='etiqueta'>Dias Restante</span>
                <span className='valor'>{userData.dias_restantes}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

export default Qr_de_user;
