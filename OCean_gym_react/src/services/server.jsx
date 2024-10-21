
const url = 'http://localhost:8000/clients/';

const GetDataUsers = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////

const PostUsers = async (inpunUser, inpuntPass, inputGmail) => {
  const url = 'http://localhost:8000/register_clientes/';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: inputGmail,    
        name: inpunUser,    
        password: inpuntPass,
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


export { GetDataUsers, PostUsers, UpdateUsers, deleteUsers };
