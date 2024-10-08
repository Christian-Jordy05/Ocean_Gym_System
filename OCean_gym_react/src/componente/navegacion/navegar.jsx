import React from 'react';
import { Link } from 'react-router-dom';
import '../navegacion/Nav.css';
import ocean_gym_transparent from '../img/ocean_gym.png';

function Navegar() {
  return (
    <div className='Conteiner_del_nav'>
      {/* LOGO QUE VA EN EL NAV */}
      <div className='color_fondo_de_img'>
        <img className='logo_Nav' src={ocean_gym_transparent} alt="" />
      </div>

        <div className='conte_de_btn_register_iniciar'>
    {/* BOTON PARA DIRIGIR HOME */}
    <Link to="/home">
      <button id='home-btn' type="button" name="home">Home</button>
    </Link>

    {/* BOTON PARA DIRIGIR CONTACTO */}
    <Link to="/Contacto">
      <button id='home-btn' type="button" name="home">Contacto</button>
    </Link>

    {/* BOTON PARA DIRIGIRLO A LOGIN */}
    <Link to="/login">
      <button id='login-btn' type="button" name="login">Iniciar sesión</button>
    </Link>

    {/* BOTON PARA DIRIGIRLO A REGISTER */}
    <Link to="/sign_up">
      <button id='signup-btn' type="button" name="signup">Registrarse</button>
    </Link>
  </div>
</div>
  );
}

export default Navegar;
