
const url = 'http://localhost:8000/clients/';


import Cookies from 'js-cookie';

const GetDataUsers = async () => {
  try {
      const token = Cookies.get('user_token');
      const response = await fetch(`htpp://${window.location.origin}/clients/`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};




const GetBuscarUser = async (id_cliente) => {
  const token = Cookies.get('user_token'); 
  console.log(token);
  
  
  
  const response = await fetch(`${window.location.origin}/clients/${id_cliente}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${await response.text()}`);
  }

  return await response.json();
};


const actualizarDatosUsuario = async (id_cliente, userData) => {
  const token = Cookies.get('user_token');
  const response = await fetch(`http://localhost:8000/clients/${id_cliente}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData), // Usar el objeto userData recibido
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al actualizar los datos');
  }

  return await response.json(); // Devolver el usuario actualizado
};







/////////////////////////////////////////////////////////////////////////////////////////////

const PostUsers = async (name, password, email) => {
  const url2 = `${window.location.origin}/register_clientes/`;
  console.log(name,password,email);
  
  try {
    const response = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        name, 
        password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al registrar el usuario');
    }

    const data = await response.json();
    console.log('Usuario registrado correctamente:', data);
  } catch (error) {
    console.error('ERROR POST:', error.message);
    throw error; // Para manejar el error en el componente
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////

const UpdateUsers = async (userId, email, name, newPassword) => {
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

const deleteUsers = async (id) => {
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


export { GetDataUsers, PostUsers, UpdateUsers, deleteUsers,GetBuscarUser,actualizarDatosUsuario};
