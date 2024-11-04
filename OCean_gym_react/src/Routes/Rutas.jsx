import { Routes, Route } from 'react-router-dom';
import PagSignUp from '../pages/pag_sign_up';
import PagLogin from '../pages/PagLogin';
import PagHome from '../pages/PagHome';

import PagContacto from '../pages/PagContacto';

import Pag_de_seleccion_Rutinas from '../pages/Pag_de_seleccion_Rutinas';

import Pag_de_Rutina_principiante from '../pages/rutinas_hombre/Pag_de_Rutina_principiante_hombre';
import Pag_de_Rutina_intermedio from '../pages/rutinas_hombre/Pag_de_Rutina_intermedio_hombre';
import Pag_de_Rutina_experto from '../pages/rutinas_hombre/Pag_de_Rutina_experto_hombre';

import Pag_de_Rutina_experto_mujer from '../pages/rutinas_mujer/Pag_de_Rutina_experto_mujer';
import Pag_de_Rutina_intermedio_mujer from '../pages/rutinas_mujer/Pag_de_Rutina_intermedio_mujer';
import Pag_de_Rutina_principiante_mujer from '../pages/rutinas_mujer/Pag_de_Rutina_principiante_mujer';
import Rutas_privadas from '../componente/ruta_privadas/Rutas_privadas';

import Pag_De_administracion from '../pages/administracion/Pag_De_administracion';
import PagError from '../pages/Error';

import Qr_de_user from '../componente/Informacion_de_usurios_con_qr/Qr_de_user';
import Pag_producto from '../pages/Pagproducto';

import PagPerfilesUser from '../pages/PagPerfilesUser';



const Rutas = () => { 
  return (
    <>
      <Routes>
        <Route path="/Login" element={<PagLogin />} /> 
        <Route path="/Sign_up" element={<PagSignUp />} />
        <Route path="/Home" element={<PagHome />} />
        <Route path="/" element={<PagHome />} />

        {/* <Route path="/email" element={<ValiQr />} />  */}
        <Route path="/Seleccion_de_Rutinas" element={<Pag_de_seleccion_Rutinas/>} />

        
 
        

         <Route path="/productos" element={<Pag_producto/>} /> 

        <Route path="/Perfiles" element={<PagPerfilesUser/>} />

     

        <Route path="/Seleccion_de_Rutinas" element={<Pag_de_seleccion_Rutinas />} />
        <Route path="/Principiante_hombre" element={<Pag_de_Rutina_principiante />} />
        <Route path="/Intermedio_hombre" element={<Pag_de_Rutina_intermedio />} />
        <Route path="/Experto_hombre" element={<Pag_de_Rutina_experto />} />
        <Route path="/Rutinas_Principiante_mujer" element={<Pag_de_Rutina_principiante_mujer />} />
        <Route path="/Intermedio_mujer" element={<Pag_de_Rutina_intermedio_mujer />} />
        <Route path="/Experto_mujer" element={<Pag_de_Rutina_experto_mujer />} />
        <Route path="/contacto" element={<PagContacto />} /> 
       
        <Route element={<Rutas_privadas />}>
        <Route path="/Administracion" element={<Pag_De_administracion />} />
          <Route path="/Qrs_de_Usuarios" element={<Qr_de_user />} />  
        </Route>

        <Route path="/Error" element={<PagError />} />
        <Route path="*" element={<PagError />} />
      </Routes>
    </>
  );
}

export default Rutas;