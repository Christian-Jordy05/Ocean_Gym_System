import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../navegacion/Nav.css';
import ocean_gym_transparent from '../img/ocean_gym.png';
import { useAuth } from './AuthContext';

function Navegar() {
  const { isAuthenticated, logout, userRole } = useAuth();
  const [VerificacionAdmin, setVerificacionAdmin] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    setVerificacionAdmin(userRole === "admin");
  }, [userRole]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className='Conteiner_del_nav'>
      <div className='nav-content'>
        <div className='color_fondo_de_img'>
          <img className='logo_Nav' src={ocean_gym_transparent} alt="Logo Ocean Gym" />
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>

        <div className={`conte_de_btn_register_iniciar ${menuAbierto ? 'menu-abierto' : ''}`}>
          <div className="menu-botones"> 
            {isAuthenticated ? (
              <>
                <button id='logout-btn' type="button" onClick={logout}>
                  Cerrar sesión
                </button>
                <Link to="/Perfiles">
                  <button id='product-btn' type="button">Perfil</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button id='login-btn' type="button">Iniciar sesión</button>
                </Link>
                <Link to="/sign_up">
                  <button id='signup-btn' type="button">Registrarse</button>
                </Link>
              </>
            )}
            <Link to="/home">
              <button id='home-btn' type="button">Home</button>
            </Link>
            <Link to="/Contacto">
              <button id='contact-btn' type="button">Contacto</button>
            </Link>
            <Link to="/productos">
              <button id='product-btn' type="button">Productos</button>
            </Link>
            {VerificacionAdmin && (
              <Link to="/Administracion">
                <button id='admin-btn' type="button">Administración</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navegar;
