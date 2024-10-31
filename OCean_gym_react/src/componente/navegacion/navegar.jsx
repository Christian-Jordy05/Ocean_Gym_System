import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../navegacion/Nav.css';
import ocean_gym_transparent from '../img/ocean_gym.png';
import { useAuth } from './AuthContext';

function Navegar() {
  const { isAuthenticated, logout, userRole } = useAuth();
  const [VerificacionAdmin, setVerificacionAdmin] = useState(false);

  // Actualiza VerificacionAdmin si el usuario es admin
  useEffect(() => {
    setVerificacionAdmin(userRole === "admin");
  }, [userRole]);

  return (
    <div className='Conteiner_del_nav'>
      {/* LOGO QUE VA EN EL NAV */}
      <div className='color_fondo_de_img'>
        <img className='logo_Nav' src={ocean_gym_transparent} alt="Logo Ocean Gym" />
      </div>

      <div className='conte_de_btn_register_iniciar'>
        {isAuthenticated ? (
          <>
            {/* BOTON PARA CERRAR SESIÓN */}
            <button id='logout-btn' type="button" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            {/* BOTON PARA DIRIGIRLO A LOGIN */}
            <Link to="/login">
              <button id='login-btn' type="button">Iniciar sesión</button>
            </Link>

            {/* BOTON PARA DIRIGIRLO A REGISTER */}
            <Link to="/sign_up">
              <button id='signup-btn' type="button">Registrarse</button>
            </Link>
          </>
        )}

        {/* BOTON PARA DIRIGIR HOME */}
        <Link to="/home">
          <button id='home-btn' type="button">Home</button>
        </Link>

        {/* BOTON PARA DIRIGIR CONTACTO */}
        <Link to="/Contacto">
          <button id='contact-btn' type="button">Contacto</button>
        </Link>

        {/* Botón visible solo para admins */}
        {VerificacionAdmin && (
          <Link to="/Administracion">
            <button id='admin-btn' type="button">Administracion</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navegar;
