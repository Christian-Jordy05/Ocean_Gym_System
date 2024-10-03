import './stylelogin.css';
import { GetDataUsers, UpdateUsers} from '../../services/server';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ocean_gym_transparent from '../img/ocean_gym.png';
<<<<<<< HEAD
=======

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
function Loginfor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  const login = async (e) => {
    e.preventDefault();
=======
  
  const login = async (e) => {
    e.preventDefault();

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
    if (email.trim() === "" || password.trim() === "") {
      Swal.fire({
        title: 'Error!',
        text: 'Debes de completar todos los datos',
        icon: 'error',
      });
      return;
    }
<<<<<<< HEAD
    const response = await GetDataUsers();
    const user = response.find((e) => email === e.email && password === e.password);
=======

    const response = await GetDataUsers();
    const user = response.find((e) => email === e.email && password === e.password);

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
    if (user) {
      Swal.fire({
        title: 'Correcto!',
        text: 'Se inició sesión correctamente',
        icon: 'success',
      });
      navigate("/home");
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'El usuario o la contraseña son incorrectos',
        icon: 'error',
      });
    }
  };
<<<<<<< HEAD
=======

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
const Restablecer_contraseña = async () => {
  const { value: emailBuscar } = await Swal.fire({
    title: 'Restablecer contraseña',
    text: 'Ingresa tu correo electrónico',
    input: 'email',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Buscar',
    showLoaderOnConfirm: true,
  });
<<<<<<< HEAD
=======

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailBuscar)) {
    Swal.fire({
      title: 'Error!',
      text: 'Debes ingresar un correo electrónico válido',
      icon: 'error',
    });
    return;
  }
<<<<<<< HEAD
  try {
    const response = await GetDataUsers();
    const user = response.find((e) => emailBuscar === e.email);
=======

  try {
    const response = await GetDataUsers();
    const user = response.find((e) => emailBuscar === e.email);

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
    if (user) {
      const { value: newPassword } = await Swal.fire({
        title: 'Restablecer contraseña',
        text: 'Ingresa tu nueva contraseña',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Restablecer',
        showLoaderOnConfirm: true,
      });
<<<<<<< HEAD
=======

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
      if (newPassword) {
        await UpdateUsers(user.id_cliente, user.email, user.name, newPassword);
        Swal.fire({
          title: 'Contraseña restablecida!',
          text: 'Tu contraseña ha sido restablecida con éxito',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Debes ingresar una nueva contraseña',
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'El usuario no existe',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('ERROR:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Hubo un problema al buscar el usuario',
      icon: 'error',
    });
  }
};
<<<<<<< HEAD
=======

>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
  return (
    <div className="container">
      <div className="login-box">
        <img className='logo_Ocean_gym' src={ocean_gym_transparent} alt="Logo Ocean Gym" />
        <form className='input_y_boton' onSubmit={login}>
          <input type="text" className='Input_de_correo' placeholder="Ingrese Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className='Input_de_contraseña' placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          <a href="#" className='letra_de_olvidar_contraseña' onClick={Restablecer_contraseña}>Olvidaste la contraseña?</a>
<<<<<<< HEAD
          <button type="submit" className="btnsession">Iniciar Sesión</button>
=======
          <button type="submit" className="btnsession">Iniciar Sesión</button> 
>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
        </form>
      </div>
    </div>
  );
}
<<<<<<< HEAD
export default Loginfor;
=======

export default Loginfor;
>>>>>>> 03f1adc2e55ba70bcd0c805e597927b9c6197289
