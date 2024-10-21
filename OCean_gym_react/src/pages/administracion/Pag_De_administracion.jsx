import React, { useState } from 'react'
import { BarChart2, Edit3, Users, ChevronRight, Search, Bell, User } from 'lucide-react'
import Estadistica_de_ganancia from '../../componente/Administracion/estadistica/Estadistica_de_ganancia'
import Editar_producto from '../../componente/Administracion/Editar_Productos/Editar_Producto'
import './administracio.css'

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
          </>
        )
      default:
        return <Estadistica_de_ganancia />
    }
  }

  return (
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
        </nav>
      </div>
      <div className="admin-main">
        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Pag_De_administracion