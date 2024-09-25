import './stylelogin.css'
// import Swal from 'sweetalert2';
import { GetDataUsers } from '../../services/server';
import { useState } from 'react';

function Loginfor() {
  const [Email,SetName] = useState("");
  const [Password,SetPass] = useState("");
  // const navegar = useNavigate("");
  
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
      alert("usuario existe");
      // Swal.fire("Bienvenido", "success");
      // navegar("/home");
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };
  

  
  return (
    <div className="container">
      <div className="login-box">
        <h1 id='titulogym'>Ocean Gym</h1> <br /> <br />
        <form>
          <p id='titulocorreo'>Correo Electronico</p>
          <input type="text" placeholder="Ingrese Correo Electronico" value={Email} onChange={(e) => SetName(e.target.value)}  />
          <p id='titulocontra'>Contraseña</p>
          <input type="password" placeholder="Contraseña" value={Password} onChange={(e) => SetPass(e.target.value)}/> 
          <button type="submit" className="btnsession" onClick={Login}>INICIAR SESSION</button> 
          <button type="button" className="btn">Join now</button>
        </form>
      </div>
    </div>
  );
}

export default Loginfor;