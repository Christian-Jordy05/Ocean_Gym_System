import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import ocean_gym_transparent from '../componente/img/ocean_gym_transparent.png'

function Navegar() {
  return (
    <div className='Conteiner_del_nav'>

      {/* LOGO QUE VA EN EL NAV  */}
      <div className='color_fondo_de_img'>
      <img className='logo_Nav' src={ocean_gym_transparent} alt="" />
      </div>


      <div className='conte_de_btn_register_iniciar'>
      {/* BOTON PARA DIRIGIR HOME */}
      <Link to="/home">
        <button id='home-btn' type="button" name="home">Home</button>
      </Link>


      {/* BOTON PARA DIRIGIRLO A LOGIN  */}
      <Link to="/login">
        <button id='login-btn' type="button" name="login">Iniciar sesion</button>
      </Link>

      {/* BOTON PARA DIRIGIRLO A REGISTER  */}
      <Link to="/sign_up">
        <button id='signup-btn' type="button" name="signup">Registrarse</button>
      </Link>
      </div>


    </div>
  );
}

export default Navegar;

