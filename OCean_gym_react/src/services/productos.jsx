const url = 'http://localhost:8000/productos/';

const Getproductos = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////

const Postproductos = async (inputnombre, inputprecio, inpuntdescripcion, inputimg) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre: inputnombre,    
        precio: inputprecio,    
        descripcion: inpuntdescripcion,
        img: inputimg,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud POST: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Usuario registrado correctamente:', data);
  } catch (error) {
    console.error('ERROR POST:', error.message);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////

const Updateproductos = async (id, updatedData) => {
  const url = `http://localhost:8000/productos/${id}/`; // Actualiza con tu URL
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////
const Deleteproductos = async (id) => {
  try {
    const response = await fetch(url + id + '/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error en la solicitud DELETE');
    }
    console.log('Usuario eliminado correctamente');
  } catch (error) {
    console.error('ERROR DELETE:', error);
  }
};
export { Getproductos, Postproductos, Updateproductos, Deleteproductos };
