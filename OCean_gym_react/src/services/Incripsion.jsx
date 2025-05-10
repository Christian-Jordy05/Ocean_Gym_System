import Cookies from "js-cookie";

// Base URLs
const urlInscripcion = "http://localhost:8000/Inscripcion/";
const urlRegistroPago = "http://localhost:8000/Registro_de_pago/";
const urlMetodoPago = "http://localhost:8000/Metodo_de_pago/";

// Obtener token desde cookies
const token = Cookies.get('user_token');

// Función para obtener inscripciones
const GetInscripcion = async () => {
  try {
    const response = await fetch(urlInscripcion, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener inscripciones: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching inscripciones:", error);
    throw error;
  }
};

// Función para registrar solo el pago
const PostRegistroPago = async (email, monto, id_inscripcion) => {
  const body = JSON.stringify({ email, monto, id_inscripcion });

  const response = await fetch(urlRegistroPago, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
    body,
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Error en POST Registro de Pago: ${response.status} - ${errorDetails}`);
  }

  return await response.json();
};

// Función para registrar inscripción y pago
const PostInscripcion = async (email, tipo_inscripcion, id_metododepago, costo) => {
  const inscripcionData = {
    email,
    tipo_inscripcion,
    id_metododepago,
    costo,
  };

  const response1 = await fetch(urlInscripcion, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(inscripcionData),
  });

  if (!response1.ok) {
    const errorDetails = await response1.text();
    throw new Error(`Error en la solicitud POST Inscripción: ${response1.status} - ${errorDetails}`);
  }

  const data1 = await response1.json();

  if (!data1.id_inscripcion) {
    throw new Error('ID de inscripción no encontrado en la respuesta.');
  }

  const data2 = await PostRegistroPago(email, costo, data1.id_inscripcion);

  return {
    inscripcion: data1,
    registroDePago: data2,
  };
};

// Función para actualizar inscripción y registrar nuevo pago
const UpdateInscripcion = async (id, datosActualizacion) => {
  const { email, costo } = datosActualizacion;

  try {
    const response = await fetch(`${urlInscripcion}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(datosActualizacion),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la inscripción: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.id_inscripcion) {
      const registroPago = await PostRegistroPago(email, costo, data.id_inscripcion);
      return { inscripcionActualizada: data, registroPago };
    } else {
      throw new Error('ID de inscripción no encontrado en la respuesta.');
    }
  } catch (error) {
    console.error('Error al actualizar la inscripción:', error);
    throw error;
  }
};

// Función para obtener métodos de pago
const GetMetodoPago = async () => {
  try {
    const response = await fetch(urlMetodoPago, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener métodos de pago: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching métodos de pago:", error);
    throw error;
  }
};

// Función para obtener registros de pago
const GetRegistro_de_Pago = async () => {
  try {
    const response = await fetch(urlRegistroPago, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener registros de pago: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching registros de pago:", error);
    throw error;
  }
};

// Exportar funciones
export {
  GetInscripcion,
  PostInscripcion,
  UpdateInscripcion,
  GetMetodoPago,
  GetRegistro_de_Pago,
  PostRegistroPago, // ← Exportamos esta por si la necesitas usar externamente
};
