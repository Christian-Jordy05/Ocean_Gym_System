import React, { useState } from 'react'
import { BarChart2, Edit3, Users, ChevronRight, Search, Bell, User, CreditCard } from 'lucide-react'
import Estadistica_de_ganancia from '../../componente/Administracion/estadistica/Estadistica_de_ganancia'
import Editar_producto from '../../componente/Administracion/Editar_Productos/Editar_Producto'
import './Pag_administracion.css'
import Pago_menbresia from '../../componente/Administracion/Pagos_de_menbresia/Pago_menbresia'
import Lista_de_Usuarios from '../../componente/Administracion/Usuarios/Lista_de_Usuarios'
import Navegar from '../../componente/navegacion/navegar'

function Pag_De_administracion() {
  const [currentPage, setCurrentPage] = useState('estadisticas')

  const renderContent = () => {
    switch (currentPage) {
      case 'estadisticas':
        return (
          <>
            <h1 className="page-title">Estadistica</h1>
            <Estadistica_de_ganancia />
          </>
        )
      case 'editarProductos':
        return (
          <>
            <h1 className="page-title">Editar Productos</h1>
            <Editar_producto />
          </>
        )
      case 'usuarios':
        return (
          <>
            <h1 className="page-title">Gestión de Usuarios</h1>
            <Lista_de_Usuarios/>
          </>
        )
      case 'pagosMembresía':
        return (
          <>
            <h1 className="page-title">Pagos de Membresía</h1>
            <Pago_menbresia/>
          </>
        )
      default:
        return <Estadistica_de_ganancia />
    }
  }

  return (
    <div className='Admibody'>
    <Navegar/>
    <div className="admin-page">
      <div className="admin-sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <button
            onClick={() => setCurrentPage('estadisticas')}
            className={`sidebar-button ${currentPage === 'estadisticas' ? 'active' : ''}`}
          >
            <BarChart2 size={20} />
            <span>Estadísticas</span>
            <ChevronRight size={16} className="chevron-icon" />
          </button>
          <button
            onClick={() => setCurrentPage('editarProductos')}
            className={`sidebar-button ${currentPage === 'editarProductos' ? 'active' : ''}`}
          >
            <Edit3 size={20} />
            <span>Editar Productos</span>
            <ChevronRight size={16} className="chevron-icon" />
          </button>
          <button
            onClick={() => setCurrentPage('usuarios')}
            className={`sidebar-button ${currentPage === 'usuarios' ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>Usuarios</span>
            <ChevronRight size={16} className="chevron-icon" />
          </button>
          <button
            onClick={() => setCurrentPage('pagosMembresía')}
            className={`sidebar-button ${currentPage === 'pagosMembresía' ? 'active' : ''}`}
          >
            <CreditCard size={20} />
            <span>Pagos de Membresía</span>
            <ChevronRight size={16} className="chevron-icon" />
          </button>
        </nav>
      </div>
      <div className="admin-main">
        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </div>
    </div>
  )
}

export default Pag_De_administracion