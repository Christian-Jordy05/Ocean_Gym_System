import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign_style.css';
import ocean_gym_transparent from '../img/ocean_gym_transparent.png';
import { PostUsers } from '../../services/server';
import { GetDataUsers } from '../../services/server';
import Swal from 'sweetalert2';



function Registrofor() {
  const navigate = useNavigate();
  const [inpunUser, setUser] = useState('');
  const [inpuntPass, setPasswor] = useState('');
  const [inputGmail, setGmail] = useState('');

  const regis = async (e) => {
    e.preventDefault();
    if (inpunUser.trim() === "" || inpuntPass.trim() === "" || inputGmail.trim() === "") {
      Swal.fire({
        title: 'Error!',
        text: 'Debes de completar todos los datos',
        icon: 'error',
      });
      return;
    }
    const datos = await GetDataUsers();
    const usuarioExiste = datos.find(e => e.name === inpunUser || e.email === inputGmail);
    if (usuarioExiste) {
      Swal.fire({
        title: 'El usuario ya existe!',
        text: 'Ya hay un usuario con esos datos',
        icon: 'error',
      });
      return;
    }
    PostUsers(inpunUser, inpuntPass, inputGmail);
    Swal.fire({
      title: 'correcto!',
      text: 'Se registro correctamente',
      icon: 'success',
    });
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="login-box">
        <img id='logo1' src={ocean_gym_transparent} alt="Gym" />
        {/* <h2>Login to your account</h2> */}
        <form onSubmit={regis}>
          {/* Input para el nombre */}
          <input type="text" className='Input_Nombre' value={inpunUser} onChange={(e) => setUser(e.target.value)} placeholder="Ingrese su nombre" />
          {/* Input para el correo electrónico */}
          <input type="email" className='Input_Gmail' value={inputGmail} onChange={(e) => setGmail(e.target.value)} placeholder="Ingrese su gmail" />
          {/* Input para la contraseña */}
          <input type="password" className='Input_Contraseña' value={inpuntPass} onChange={(e) => setPasswor(e.target.value)} placeholder="Ingrese su contraseña" />
          <div className="forgot-password">
          </div>
          <button type="submit" className="btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registrofor;