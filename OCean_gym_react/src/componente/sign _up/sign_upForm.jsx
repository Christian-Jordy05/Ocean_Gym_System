import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign_style.css';
import imggym from '../img/imggym.png';
import { PostUsers } from '../../services/server';
import { GetDataUsers } from '../../services/server';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'


function Registrofor() {
  const navigate = useNavigate();
  const [inpunUser, setUser] = useState('');
  const [inpuntPass, setPasswor] = useState('');
  const [inputGmail, setGmail] = useState('');

  const regis = async (e) => {
    e.preventDefault();
    if (inpunUser.trim() === "" || inpuntPass.trim() === "" || inputGmail.trim() === "") {
      alert("no dejes espacios")
     
      return;
    }
    const datos = await GetDataUsers();
    const usuarioExiste = datos.find(e => e.name === inpunUser || e.email === inputGmail);
    if (usuarioExiste) {
      alert("ya existe")
      return;
    }
    PostUsers(inpunUser, inpuntPass, inputGmail);
    alert("Registro correctamente");
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="login-box">
        <img id='logo1' src={imggym} alt="Gym" />
        <h2>Login to your account</h2>
        <form onSubmit={regis}>
          {/* Input para el nombre */}
          <input type="text" value={inpunUser} onChange={(e) => setUser(e.target.value)} placeholder="Enter your name" />
          {/* Input para el correo electrónico */}
          <input type="email" value={inputGmail} onChange={(e) => setGmail(e.target.value)} placeholder="Enter your email" />
          {/* Input para la contraseña */}
          <input type="password" value={inpuntPass} onChange={(e) => setPasswor(e.target.value)} placeholder="Enter your password" />
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Registrofor;