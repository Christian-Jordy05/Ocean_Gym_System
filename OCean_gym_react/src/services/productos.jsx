
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
  const url = 'http://localhost:8000/productos/';
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

const Updateproductos = async (userId, email, name, newPassword) => {
  try {
    const response = await fetch(url + userId + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password: newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud PUT');
    }

    const data = await response.json();
    console.log(data);  
  } catch (error) {
    console.error('ERROR PUT:', error);
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
