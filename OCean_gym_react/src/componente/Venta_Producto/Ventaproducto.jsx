import './ventaproducto.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { Getproductos, Updateproductos } from '../../services/productos'; // Importa las funciones del archivo de servicios

function Ventaproducto() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await Getproductos();
      setProducts(data);
    } catch (error) {
      setError('No se pudieron cargar los productos');
    }
  };

  const send_data = async () => {
    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('image', file);
    
      const response = await fetch('http://localhost:8000/api/subir-imagen/', {
        method: 'POST',
        body: formData,
      });
    
      const data = await response.json();
      const imagen_url = data.image_url;
      console.log(imagen_url);
      
      if (response.ok) {
        return true;
      } else {
        console.error('Error al subir la imagen:', data);
      }
    
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
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
        updateProduct(product.id_producto, {"nombre": nombre, "descripcion": descripcion, "precio": precio, "img": img});
      }
    });
  };

  const updateProduct = async (id, updatedData) => {
    try {
      // Llamada a la API para actualizar el producto
      const updateProduct = await Updateproductos(id, updatedData);
      
      // Actualizar solo el producto con el id seleccionado
      setProducts((prevProducts) =>
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
  

  return (
    <div className="products-container">
      {error ? (
        <p>{error}</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <input 
              className="inpts" 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              required 
            />
            <button className="save-button" onClick={send_data}>Guardar</button>
            <button className="edit-button" onClick={() => handleEdit(product)}>Editar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Ventaproducto;
