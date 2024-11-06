import { useState, useEffect } from 'react';
import { useAuth } from '../../navegacion/AuthContext';
import './administracion.css';
import Swal from 'sweetalert2';
import { Updateproductos } from '../../../services/productos';
let domain =window.location.origin

const Editar_producto = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', precio: '', img: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const { refreshAccessToken } = useAuth();
  // Obtener el valor de la cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  // Efecto para obtener los productos al montar el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = getCookie('user_token');
        const respuesta = await fetch(`http://localhost:8000/productos/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials:"include"
        });
        if (!respuesta.ok) {
          const errorText = await respuesta.text(); // Obtener el texto del error
          throw new Error(`Error ${respuesta.status}: ${errorText}`);
        }
        const data = await respuesta.json();
        setProductos(data); // Establecer los productos obtenidos en el estado
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    obtenerProductos(); // Llamada a la función para obtener productos
  }, [refreshAccessToken]);
  // Manejar la adición de un nuevo producto
  const manejarAgregar = async (imagen_url) => {
    if (!nuevoProducto.nombre || !nuevoProducto.descripcion || !nuevoProducto.precio || !imagen_url || isNaN(nuevoProducto.precio)) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }
    const nuevoId = productos.length ? productos[productos.length - 1].id + 1 : 1; // Obtener un nuevo ID
    const producto = {
      id: nuevoId,
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseFloat(nuevoProducto.precio), // Convertir el precio a número flotante
      img: imagen_url
    };
    try {
      const token = getCookie('user_token'); // Obtener el token desde la cookie 'user_token'

      const response = await fetch(`http://localhost:8000/productos/`, {  // Reemplaza con la URL de tu API para crear un producto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
        },
        body: JSON.stringify(producto),
        credentials:"include"
      });
      if (!response.ok) {
        throw new Error('Error en la creación del producto');
      }
      const data = await response.json();
      setProductos([...productos, data]);  // Agregar el nuevo producto a la lista local
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', img: '' });
      setError(''); // Limpiar el error si todo es correcto
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setError('Error al agregar producto. Inténtalo de nuevo.');
    }
  };
  // Función para abrir el modal de edición
  const manejarEditar = (product) => {
    Swal.fire({
      title: 'Editar Producto',
      html: `
        <label>Nombre:</label>
        <input type="text" id="nombre" class="swal2-input" value="${product.nombre}">
        <label>Descripción:</label>
        <input type="text" id="descripcion" class="swal2-input" value="${product.descripcion}">
        <label>Precio:</label>
        <input type="text" id="precio" class="swal2-input" value="${product.precio}">
        <label>Imagen URL:</label>
        <input type="text" id="img" class="swal2-input" value="${product.img}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
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
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nombre, descripcion, precio, img } = result.value;
        updateProduct(product.id_producto, { nombre, descripcion, precio: parseFloat(precio), img });
      }
    });
  };
  // Función para actualizar el producto
  const updateProduct = async (id, updatedData) => {
    try {
      // Llamada a la API para actualizar el producto
      await Updateproductos(id, updatedData);
      // Actualizar solo el producto con el id seleccionado
       setProductos((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id_producto === id ? { ...prod, ...updatedData } : prod
        )
      );
      Swal.fire('Actualizado', 'El producto ha sido actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Swal.fire('Error', 'Hubo un problema al actualizar el producto', 'error');
    }
  };
  // Función para enviar la imagen seleccionada
  const send_data = async () => {
    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }
    try {
      const token = getCookie('user_token'); // Obtén el token de la cookie

      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`http://localhost:8000/api/subir-imagen/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        manejarAgregar(data.image_url);
      } else {
        console.error('Error al subir la imagen:', data);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }}
  return (
    <div className="contenedor">
      <h2>Administración de Productos</h2>
      <div className="formulario">
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])} // Guardar archivo seleccionado
          />
          <button onClick={send_data}>Agregar</button>
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
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${Number(producto.precio).toFixed(2)}</td>
              <td><img src={producto.img} alt={producto.nombre} className="img-producto" /></td>
              <td>
                <button onClick={() => manejarEditar(producto)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Editar_producto;





