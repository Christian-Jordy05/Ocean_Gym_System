import './stylelogin.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ocean_gym_transparent from '../img/ocean_gym.png';
import Cookies from 'js-cookie';
import { useAuth } from '../navegacion/AuthContext'; 

function Loginfor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Debes completar todos los datos',
        icon: 'error',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Correcto!',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
        });
      
        Cookies.set('user_token', data.access, { path: '/' });
        login(data.access);
        navigate("/home"); 
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.detail || 'El usuario o la contraseña son incorrectos',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('ERROR:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error en la comunicación con el servidor',
        icon: 'error',
      });
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <img className='logo_Ocean_gym' src={ocean_gym_transparent} alt="Logo Ocean Gym" />
        <form className='input_y_boton' onSubmit={handleLogin}>
          <input
            type="text"
            className='Input_de_correo'
            placeholder="Ingrese Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className='Input_de_contraseña'
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className='letra_de_olvidar_contraseña'>
            Olvidaste la contraseña?
          </a>
          <button type="submit" className="btnsession">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginfor;
