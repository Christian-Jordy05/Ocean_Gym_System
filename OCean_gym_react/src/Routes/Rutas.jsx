import { Routes, Route } from 'react-router-dom';
import PagSignUp from '../pages/pag_sign_up';
import PagLogin from '../pages/PagLogin';
import PagHome from '../pages/PagHome';

import Pag_de_seleccion_Rutinas from '../pages/Pag_de_seleccion_Rutinas';

import Pag_de_Rutina_principiante from '../pages/rutinas_hombre/Pag_de_Rutina_principiante_hombre';
import Pag_de_Rutina_intermedio from '../pages/rutinas_hombre/Pag_de_Rutina_intermedio_hombre';
import Pag_de_Rutina_experto from '../pages/rutinas_hombre/Pag_de_Rutina_experto_hombre';

import Pag_de_Rutina_experto_mujer from '../pages/rutinas_mujer/Pag_de_Rutina_experto_mujer';
import Pag_de_Rutina_intermedio_mujer from '../pages/rutinas_mujer/Pag_de_Rutina_intermedio_mujer';
import Pag_de_Rutina_principiante_mujer from '../pages/rutinas_mujer/Pag_de_Rutina_principiante_mujer';

import Contacto from '../componente/Contacto/Contacto';
const Rutas = () => { 
  return (
    <>
      <Routes>
        <Route path="/Login" element={<PagLogin />} /> 
        <Route path="/Sign_up" element={<PagSignUp />} />
        <Route path="/Home" element={<PagHome />} />
        <Route path="/" element={<PagHome />} />

        <Route path="/Seleccion_de_Rutinas" element={<Pag_de_seleccion_Rutinas/>} />

        <Route path="/Rutinas_Principiante" element={<Pag_de_Rutina_principiante/>} />
        <Route path="/Rutinas_Intermedio" element={<Pag_de_Rutina_intermedio/>} />
        <Route path="/Rutinas_Experto" element={<Pag_de_Rutina_experto/>} />

        <Route path="/Rutinas_Principiante_mujer" element={<Pag_de_Rutina_principiante_mujer/>} />
        <Route path="/Rutinas_Intermedio_mujer" element={<Pag_de_Rutina_intermedio_mujer/>} />
        <Route path="/Rutinas_Experto_mujer" element={<Pag_de_Rutina_experto_mujer/>} />

        <Route path="/Contacto" element={<Contacto/>} />

      </Routes>
    </>
  );
}

export default Rutas;
