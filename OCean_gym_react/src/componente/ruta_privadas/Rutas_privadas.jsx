import { Navigate, Outlet } from 'react-router-dom';

const Rutas_privadas = () => {
  const role = localStorage.getItem('role');
  const tokenExists = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token=')); 

  console.log('Rol en Rutas_privadas:', role); 
  console.log('Token existe:', tokenExists); 

 
  if (tokenExists && role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/Error" />;
  }
};

export default Rutas_privadas;
