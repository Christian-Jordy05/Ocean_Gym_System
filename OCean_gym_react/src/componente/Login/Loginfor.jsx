import './stylelogin.css'
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======

>>>>>>> bce6887c4e9aaa7f7a45715e39dfae318bb6caf0
import { GetDataUsers } from '../../services/server';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ocean_gym_transparent from '../img/ocean_gym_transparent.png';

function Loginfor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  
  const login = async (e) => {
    e.preventDefault();
  
<<<<<<< HEAD
    if (Email.trim() === "" || Password.trim() === "") {
      Swal("Por favor, complete todos los campos.")
=======
    if (email.trim() === "" || password.trim() === "") {
      Swal.fire({
        title: 'Error!',
        text: 'Debes de completar todos los datos',
        icon: 'error',
      });
>>>>>>> bce6887c4e9aaa7f7a45715e39dfae318bb6caf0
      return;
    }
  
    const response = await GetDataUsers();
    const user = response.find((e) => email === e.email && password === e.password);
  
    if (user) {
<<<<<<< HEAD
      Swal.fire("Bienvenido", "success");
      navegar("/home");
    } else {
      Swal("Usuario o contraseña incorrectos.")
=======
      Swal.fire({
        title: 'correcto!',
        text: 'Se inicio correctamente',
        icon: 'success',
      });
      navigate("/home");
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'El usuario o la contraseña son incorrectos',
        icon: 'error',
      });
>>>>>>> bce6887c4e9aaa7f7a45715e39dfae318bb6caf0
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <img className='logo_Ocean_gym' src={ocean_gym_transparent} alt="imf" />
        <form className='input_y_boton'>
          <input type="text" className='Input_de_correo' placeholder="Ingrese Correo Electronico" value={email} onChange={(e) => setEmail(e.target.value)}  />
          <input type="password" className='Input_de_contraseña'  placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <a href="#" className='letra_de_olvidar_contraseña'>Olvidaste la contraseña?</a>
          <button type="submit" className="btnsession" onClick={login}>Iniciar Sesion</button> 
        </form>
      </div>
    </div>
  );
}

export default Loginfor;