import { Routes, Route } from 'react-router-dom';
import PagSignUp from '../pages/pag_sign_up';
import PagLogin from '../pages/PagLogin';
import PagHome from '../pages/PagHome';

const Rutas = () => { 
  return (
    <>
      <Routes>
        <Route path="/Login" element={<PagLogin />} /> 
        <Route path="/Sign_up" element={<PagSignUp />} />
        <Route path="/Home" element={<PagHome />} />
        <Route path="/" element={<PagHome />} />


      </Routes>
    </>
  );
}

export default Rutas;
