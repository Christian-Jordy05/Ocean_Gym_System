import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign_style.css';
import ocean_gym_transparent from '../img/ocean_gym.png';
import { PostUsers } from '../../services/server';
import { GetDataUsers } from '../../services/server';
<<<<<<< HEAD
import swal from "sweetalert2";
=======
import Swal from 'sweetalert2';


>>>>>>> bce6887c4e9aaa7f7a45715e39dfae318bb6caf0

function Registrofor() {
  const navigate = useNavigate();
  const [inpunUser, setUser] = useState('');
  const [inpuntPass, setPasswor] = useState('');
  const [inputGmail, setGmail] = useState('');

  const regis = async (e) => {
    e.preventDefault();
    if (inpunUser.trim() === "" || inpuntPass.trim() === "" || inputGmail.trim() === "") {
<<<<<<< HEAD
      swal("no dejes espacios")
     
=======
      Swal.fire({
        title: 'Error!',
        text: 'Debes de completar todos los datos',
        icon: 'error',
      });
>>>>>>> bce6887c4e9aaa7f7a45715e39dfae318bb6caf0
      return;
    }
    const datos = await GetDataUsers();
    const usuarioExiste = datos.find(e => e.name === inpunUser || e.email === inputGmail);
    if (usuarioExiste) {
<<<<<<< HEAD
      swal("usuario ya existe");
      return;
    }
    PostUsers(inpunUser, inpuntPass, inputGmail);
    swal("Registro correctamente")
=======
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
>>>>>>> bce6887c4e9aaa7f7a45715e39dfae318bb6caf0
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