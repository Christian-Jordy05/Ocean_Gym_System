import React, { useState, useEffect } from 'react';
import { useAuth } from '../../navegacion/AuthContext';
import './administracion.css';
import Swal from 'sweetalert2';
import { Updateproductos } from '../../../services/productos';


import { Updateproductos } from '../../../services/productos';
import { Edit, Trash2, Plus } from 'lucide-react';

const EditarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', precio: '', img: '' });
  const [file, setFile] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const { refreshAccessToken } = useAuth();
  // Obtener el valor de la cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  // Efecto para obtener los productos al montar el componente

  // Obtener productos al montar el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = getCookie('user_token');
        console.log(token);
        
        const respuesta = await fetch('http://localhost:8000/productos/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: "include"
        });
        if (!respuesta.ok) {
          const errorText = await respuesta.text();
          throw new Error(`Error ${respuesta.status}: ${errorText}`);
        }
        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    obtenerProductos(); // Llamada a la función para obtener productos
    obtenerProductos();
  }, [refreshAccessToken]);
  // Manejar la adición de un nuevo producto
  const manejarAgregar = async (imagen_url) => {
    if (!nuevoProducto.nombre || !nuevoProducto.descripcion || !nuevoProducto.precio || !imagen_url || isNaN(nuevoProducto.precio)) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }
    const nuevoId = productos.length ? productos[productos.length - 1].id + 1 : 1; // Obtener un nuevo ID

    const producto = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseFloat(nuevoProducto.precio),
      img: imagen_url
    };

    try {
      const token = getCookie('user_token'); // Obtener el token desde la cookie 'user_token'
      console.log(token);   
      const response = await fetch('http://localhost:8000/productos/', {  // Reemplaza con la URL de tu API para crear un producto
      const token = getCookie('user_token');
      const response = await fetch('http://localhost:8000/productos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(producto),
        credentials:"include"
      });

      if (!response.ok) {
        throw new Error('Error en la creación del producto');
      }

      const data = await response.json();
      setProductos([...productos, data]);
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', img: '' });
      setError('');
      Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setError('Error al agregar producto. Inténtalo de nuevo.');
    }
  };
  // Función para abrir el modal de edición
  const manejarEditar = (producto) => {
    Swal.fire({
      title: 'Editar Producto',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
        <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${producto.descripcion}">
        <input id="precio" class="swal2-input" placeholder="Precio" value="${producto.precio}">
        <input id="img" class="swal2-input" placeholder="URL de la imagen" value="${producto.img}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const img = document.getElementById('img').value;
        if (!nombre || !descripcion || !precio || !img) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
        return { nombre, descripcion, precio, img };
        return {
          nombre: document.getElementById('nombre').value,
          descripcion: document.getElementById('descripcion').value,
          precio: document.getElementById('precio').value,
          img: document.getElementById('img').value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateProduct(producto.id, result.value);
      }
    });
  };
  // Función para actualizar el producto
  const updateProduct = async (id, updatedData) => {
    try {
      await Updateproductos(id, updatedData);
      // Actualizar solo el producto con el id seleccionado
       setProductos((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id_producto === id ? { ...prod, ...updatedData } : prod
        )
      );
      setProductos(productos.map(prod => prod.id === id ? {...prod, ...updatedData} : prod));
      Swal.fire('Actualizado', 'El producto ha sido actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Swal.fire('Error', 'Hubo un problema al actualizar el producto', 'error');
    }
  };
  // Función para enviar la imagen seleccionada

  // Función para subir imagen y agregar el producto
  const send_data = async () => {
    if (!file) {
      Swal.fire('Error', 'Por favor selecciona una imagen.', 'error');
      return;
    }
    try {
      const token = getCookie('user_token'); // Obtén el token de la cookie
      const token = getCookie('user_token');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('image', file);
    
      const response = await fetch('http://localhost:8000/api/subir-imagen/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });
    
      const data = await response.json();
      if (response.ok) {
        manejarAgregar(data.image_url);
        manejarAgregar(data.image_url);
      } else {
        console.error('Error al subir la imagen:', data);
        Swal.fire('Error', 'Hubo un problema al subir la imagen', 'error');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }}
      Swal.fire('Error', 'Hubo un problema al procesar la solicitud', 'error');
    }
  };

  return (
    <div className="contenedor">
      <h2>Administración de Productos</h2>
      <div className="formulario">
    <div className="editar-producto-container">
      <div className="nuevo-producto-form">
        <h3>Agregar Nuevo Producto</h3>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />
        {/* Input de archivo para seleccionar imagen */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={send_data}>Agregar</button>
        <button onClick={send_data} className="btn-agregar">
          <Plus size={16} />
          Agregar Producto
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
      {error && <p className="error-message">{error}</p>}
      <div className="productos-list">
        <h3>Lista de Productos</h3>
        <div className="productos-grid">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.img} alt={producto.nombre} className="producto-imagen" />
              <div className="producto-info">
                <h4>{producto.nombre}</h4>
                <p>{producto.descripcion}</p>
                <p className="producto-precio">${Number(producto.precio).toFixed(2)}</p>
              </div>
              <div className="producto-actions">
                <button onClick={() => manejarEditar(producto)} className="btn-editar">
                  <Edit size={16} />
                  Editar
                </button>
                <button className="btn-eliminar">
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Editar_producto;

export default EditarProducto;