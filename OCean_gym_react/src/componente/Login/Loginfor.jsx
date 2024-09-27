import './stylelogin.css'
// import Swal from 'sweetalert2';
import { GetDataUsers } from '../../services/server';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ocean_gym_transparent from '../img/ocean_gym_transparent.png';

function Loginfor() {
  const [Email,SetName] = useState("");
  const [Password,SetPass] = useState("");
  const navegar = useNavigate("");
  
  // const ref = useRef("")

  const Login = async (e) => {
    e.preventDefault();
  
    if (Email.trim() === "" || Password.trim() === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    const Get = await GetDataUsers();
    const user = Get.find(e => Email === e.email && Password === e.password);
  
    if (user) {
      alert("inicio de sesion correcto");
      // Swal.fire("Bienvenido", "success");
      navegar("/home");
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };
  

  
  return (
    <div className="container">
      <div className="login-box">
        <img className='logo_Ocean_gym' src={ocean_gym_transparent} alt="imf" />
        <form className='input_y_boton'>
          {/* <p id='titulocorreo'>Correo Electronico</p> */}
          <input type="text" className='Input_de_correo' placeholder="Ingrese Correo Electronico" value={Email} onChange={(e) => SetName(e.target.value)}  />
          {/* <p id='titulocontra'>Contraseña</p> */}
          <input type="password" className='Input_de_contraseña'  placeholder="Contraseña" value={Password} onChange={(e) => SetPass(e.target.value)}/>
          <a href="#" className='letra_de_olvidar_contraseña'>Olvidaste la contraseña?</a>
          <button type="submit" className="btnsession" onClick={Login}>Iniciar Sesion</button> 
          {/* <button type="button" className="btn">Join now</button> */}
        </form>
      </div>
    </div>
  );
}

export default Loginfor;