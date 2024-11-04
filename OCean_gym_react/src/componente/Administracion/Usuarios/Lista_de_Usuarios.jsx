import React, { useEffect, useState } from 'react';
import './Lista_de_Usuarios.css';
import { GetDataUsers } from '../../../services/server';
import { GetInscripcion } from '../../../services/Incripsion';
import { Search, X, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
function Lista_de_Usuarios() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dato = await GetDataUsers();
        const dato2 = await GetInscripcion();

        console.log("Usuarios:", dato);  
        console.log("Inscripciones:", dato2);  

        const inscripcionesPorEmail = {};
        dato2.forEach(inscripcion => {
          inscripcionesPorEmail[inscripcion.email] = {
            id_inscripcion: inscripcion.id_inscripcion,
            isActive: inscripcion.is_active,
            tipoInscripcion: inscripcion.tipo_inscripcion,
            fechaInscripcion: inscripcion.fecha_inscripcion,
            fechaExpiracion: inscripcion.fecha_expiracion,
            diasRestantes: inscripcion.dias_restantes,
          };
        });

        const DatosUsers = dato.map(user => ({
          ...user,
          inscripcion: inscripcionesPorEmail[user.email] || null,
        }));

        setUsers(DatosUsers);
        setFilteredUsers(DatosUsers); 
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    // Filtrar los usuarios segun de lo que ponga
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(value) || 
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const openModal = (user) => {
    setSelectedUser(user.inscripcion || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className='ListaUsuariobody'>
      <div className="user-list-container">
      <div className="search-container">

            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o email..." 
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => {
                setSearchTerm('');
                setFilteredUsers(users);
              }}>
                <X size={18} />
              </button>
            )}
          </div>
          
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id_cliente}>
                  <td>{user.id_cliente}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status ${user.inscripcion?.isActive ? 'active' : 'inactive'}`}>
                      {user.inscripcion?.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <button className="view-details-btn" onClick={() => openModal(user)}>
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedUser && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-modal-icon" onClick={closeModal}>
                <X size={24} />
              </button>
              <h2 className="titulo-modal">Detalle de Membresía</h2>
              <div className="grid-informacion">
                <div className="tarjeta-informacion">
                  <div className="encabezado-tarjeta">
                    <Calendar size={18} />
                    <h3 className="titulo-tarjeta">Tipo de Inscripción</h3>
                  </div>
                  <p className="valor-tarjeta">{selectedUser.tipoInscripcion}</p>
                </div>
                <div className="tarjeta-informacion">
                  <div className="encabezado-tarjeta">
                    <Clock size={18} />
                    <h3 className="titulo-tarjeta">Fecha de Inscripción</h3>
                  </div>
                  <p className="valor-tarjeta">{selectedUser.fechaInscripcion}</p>
                </div>
                <div className="tarjeta-informacion">
                  <div className="encabezado-tarjeta">
                    <Clock size={18} />
                    <h3 className="titulo-tarjeta">Fecha de Expiración</h3>
                  </div>
                  <p className="valor-tarjeta">{selectedUser.fechaExpiracion}</p>
                </div>
              </div>
              <div className="contenedor-dias-restantes">
                <h3 className="titulo-dias-restantes">Días Restantes</h3>
                <p className="numero-dias-restantes">{selectedUser.diasRestantes}</p>
              </div>
              <div className="estado-membresia">
                {selectedUser.isActive ? (
                  <>
                    <CheckCircle size={24} className="icon-active" />
                    <span>Membresía Activa</span>
                  </>
                ) : (
                  <>
                    <XCircle size={24} className="icon-inactive" />
                    <span>Membresía Inactiva</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lista_de_Usuarios;
