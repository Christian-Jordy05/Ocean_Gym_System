import React, { useEffect, useState } from 'react';
import Navegar from '../navegacion/navegar';
import './PerfilesUser.css';
import { GetBuscarUser, actualizarDatosUsuario } from '../../services/server'; 
import Cookies from 'js-cookie';

function PerfilesUser() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const token = Cookies.get('user_token');

  const parseJwt = (token) => {
    if (!token) return {};
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
    return JSON.parse(jsonPayload);
  };

  const decoded = parseJwt(token);
  const id_cliente = decoded.idCliente;

  const buscarUser = async () => {
    try {
      const userData = await GetBuscarUser(id_cliente);
      setUser(userData);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    if (id_cliente) {
      buscarUser(); 
    } else {
      console.error("ID del cliente no encontrado en el token.");
    }
  }, [id_cliente]);

  const manejarActualizacion = async () => {
    try {
      await actualizarDatosUsuario(id_cliente, { // Pasar id_cliente y el objeto con datos a actualizar
        name: user.name,
        apellido: user.apellido,
        telefono: user.telefono
      });
      setEditMode(false); 
      buscarUser();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const cancelarEdicion = () => {
    setEditMode(false);
    buscarUser();
  };

  return (
    <>
      <Navegar />
      <div className="contenedor-detalles-usuario">
        <div className="tarjeta-usuario">
          <div className="encabezado-usuario">
            <div className="avatar-usuario">
              <span>{user.name ? user.name.charAt(0).toUpperCase() : ''}</span>
            </div>
            <h2 className="titulo-usuario">Perfil de Usuario</h2>
          </div>
          <div className="info-usuario">
            <div className={`campo-usuario ${editMode ? 'no-actualizable' : ''}`}>
              <span className="etiqueta">Correo</span>
              <span className="valor email">{user.email}</span>
            </div>
            <div className={`campo-usuario ${editMode ? 'actualizable' : ''}`}>
              <span className="etiqueta">Nombre</span>
              {editMode ? (
                <input 
                  className="valor" 
                  type="text" 
                  value={user.name || ''} 
                  onChange={(e) => setUser({ ...user, name: e.target.value })} 
                />
              ) : (
                <span className="valor">{user.name}</span>
              )}
            </div>
            <div className={`campo-usuario ${editMode ? 'actualizable' : ''}`}>
              <span className="etiqueta">Apellido</span>
              {editMode ? (
                <input 
                  className="valor" 
                  type="text" 
                  value={user.apellido || ''} 
                  onChange={(e) => setUser({ ...user, apellido: e.target.value })} 
                />
              ) : (
                <span className="valor">{user.apellido}</span>
              )}
            </div>
            <div className={`campo-usuario ${editMode ? 'actualizable' : ''}`}>
              <span className="etiqueta">Teléfono</span>
              {editMode ? (
                <input 
                  className="valor" 
                  type="text" 
                  value={user.telefono || ''} 
                  onChange={(e) => setUser({ ...user, telefono: e.target.value })} 
                />
              ) : (
                <span className="valor">{user.telefono}</span>
              )}
            </div>
            <div className={`campo-usuario ${editMode ? 'no-actualizable' : ''}`}>
              <span className="etiqueta">Creación de la cuenta</span>
              <span className="valor">{user.fecha_creacion}</span>
            </div>
            <div className="footer-usuario">
              {editMode ? (
                <>
                  <button className="boton-guardar" onClick={manejarActualizacion}>
                    Guardar
                  </button>
                  <button className="boton-cancelar" onClick={cancelarEdicion}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button className="boton-actualizar" onClick={() => setEditMode(true)}>
                  Actualizar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilesUser;
