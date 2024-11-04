import './stylelogin.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ocean_gym_transparent from '../img/ocean_gym.png';
import Cookies from 'js-cookie';
import { useAuth } from '../navegacion/AuthContext';
import Navegar from '../navegacion/navegar';
import emailjs from 'emailjs-com';
import CambiarContraseña from '../../services/Cambio_Cotra';

function Loginfor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const verificationCodeRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    if (Cookies.get('user_token')) {
      navigate("/home");
    }
  }, [navigate]);

  // Manejar el envío del formulario de inicio de sesión
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Debes completar todos los datos',
        icon: 'error',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.error || 'Estas ingresando tu contraseña mal o el correo que estas ingresando no existe');
      }

      if (!data.access) {
        throw new Error('Respuesta del servidor inválida');
      }

      await Swal.fire({
        title: 'Éxito!',
        text: 'Inicio de sesión exitoso',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      login(data.access);
      navigate("/home");

    } catch (error) {
      console.error('Error detallado:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Error en la comunicación con el servidor',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generar un código de verificación aleatorio
  const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  // Enviar el código de verificación por correo electrónico
  const sendVerificationEmail = async (email, code) => {
    const templateParams = {
      to_email: email,
      message: `Tu código de verificación para restablecer la contraseña es: ${code}`,
    };

    try {
      await emailjs.send(
        'service_lqeq9ft',
        'template_lk6v826',
        templateParams,
        'nQBqBPTyVgkmpVvW2'
      );
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error al enviar el correo electrónico');
    }
  };

  //manejacion de cambiar la contraseña
  const olvidarContraseña = async () => {
    // paso 1: obtener el email del usuario
    const result = await Swal.fire({
        title: '¿Olvidaste la contraseña?',
        text: 'Ingresa tu correo electrónico para restablecer la contraseña',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
    });

    // paso 2: verifica si ingreso un correo valido
    if (result.isConfirmed && result.value) {
        try {
            const email = result.value;
            console.log("Correo electrónico ingresado:", email);

            // generar el codigo de verificacion
            const code = generateVerificationCode();
            verificationCodeRef.current = code;
            console.log("Código de verificación generado:", code);

            // enviar correo de verificacion
            await sendVerificationEmail(email, code);
            console.log("Correo de verificación enviado a:", email);

            // Paso 3: pedir el código de verificacion al usuario
            const result2 = await Swal.fire({
                title: 'Código de verificación',
                text: 'Se ha enviado un código de 5 dígitos a su correo electrónico para confirmar el cambio de contraseña',
                input: 'text',
                inputValidator: (value) => {
                    if (!value) return 'Debes ingresar el código';
                    if (value.length !== 5 || isNaN(value)) return 'El código debe ser de 5 dígitos numéricos';
                },
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                cancelButtonText: 'Cancelar',
            });

            // Paso 4: Compara el codigo ingresado con el generado
            if (result2.isConfirmed && result2.value) {
                if (result2.value === verificationCodeRef.current) {
                    console.log("Código de verificación correcto.");

                    // Paso 5: Solicitar la nueva contraseña al usuario
                    const result3 = await Swal.fire({
                        title: 'Nueva contraseña',
                        text: 'Ingrese su nueva contraseña',
                        input: 'password',
                        inputValidator: (value) => {
                            if (!value) return 'Debes ingresar una contraseña';
                            if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Enviar',
                        cancelButtonText: 'Cancelar',
                    });

                    // Paso 6: Llamar a la función para cambiar la contraseña
                    if (result3.isConfirmed && result3.value) {
                        const nueva_contrasena = result3.value;
                        console.log("Nueva contraseña ingresada:", nueva_contrasena);

                        // Llamar a la función cambiarContraseña con email y nueva_contrasena
                        const cambioExitoso = await CambiarContraseña(email, nueva_contrasena);
                        if (cambioExitoso) {
                            Swal.fire({
                                title: 'Éxito!',
                                text: 'La contraseña ha sido cambiada exitosamente.',
                                icon: 'success',
                            });
                        }
                    }
                } else {
                    console.log("Código de verificación incorrecto.");
                    Swal.fire({
                        title: 'Error!',
                        text: 'Código de verificación incorrecto',
                        icon: 'error',
                    });
                }
            }
        } catch (error) {
            console.error("Error en olvidarContraseña:", error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Error al enviar el código de verificación',
                icon: 'error',
            });
        }
    }
};

  return (
    <div className='loginbody'>
      <Navegar />
      <div className="container">
        <div className="login-box">
          <div className="logo-wrapper">
            <img
              className='logo_Ocean_gym'
              src={ocean_gym_transparent}
              alt="Logo Ocean Gym"
            />
          </div>
          <div className="form-header">
            <h2>Bienvenido</h2>
            <p className="subtitle">Ingresa tus datos para continuar</p>
          </div>
          <form className='input_y_boton' onSubmit={handleLoginFormSubmit}>
            <div className="input-group">
              <input
                id="email"
                type="email"
                className='Input_de_correo'
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}

              />
            </div>
            <div className="input-group">
              <input
                id="password"
                type="password"
                className='Input_de_contraseña'
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <span onClick={olvidarContraseña} className='letra_de_olvidar_contraseña'>
              ¿Olvidaste la contraseña?
            </span>
            <button
              type="submit"
              className="btnsession"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginfor;
