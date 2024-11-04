import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign_style.css';
import ocean_gym_transparent from '../img/ocean_gym.png';
import { PostUsers } from '../../services/server';
import Swal from 'sweetalert2';
import Navegar from '../navegacion/navegar';

function Registrofor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const regis = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      Swal.fire({
        title: 'Error!',
        text: 'Debes de completar todos los datos',
        icon: 'error',
      });
      return;
    }

    try {
      await PostUsers(name, password, email);
      Swal.fire({
        title: 'Correcto!',
        text: 'Se registró correctamente',
        icon: 'success',
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.error || 'Hubo un problema al registrar el usuario',
        icon: 'error',
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='bodyregis'>
      <Navegar />
      <div className="container">
        <div className="register-box">
          <div className="logo-wrapper">
            <img id="logo1" src={ocean_gym_transparent} alt="Logo Ocean Gym" />
          </div>
          <div className="form-header">
            <h2>Únete a Ocean Gym</h2>
            <p className="subtitle">Crea tu cuenta para empezar tu viaje fitness</p>
          </div>
          <form onSubmit={regis}>
            <div className="input-group">
              <input
                id="name"
                name="name"
                type="text"
                className="Input_Nombre"
                value={name}
                onChange={handleChange}
                placeholder="Nombre completo"
                required
              />
            </div>
            <div className="input-group">
              <input
                id="email"
                name="email"
                type="email"
                className="Input_Gmail"
                value={email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="input-group">
              <input
                id="password"
                name="password"
                type="password"
                className="Input_Contraseña"
                value={password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registrofor;
