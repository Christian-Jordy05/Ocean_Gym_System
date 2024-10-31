const url = 'http://localhost:8000/Inscripcion/';

const GetInscripcion = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener inscripciones: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const PostInscripcion = async (email, tipo_inscripcion, id_metododepago, costo) => {
  const body1 = JSON.stringify({
    email,
    tipo_inscripcion,
    id_metododepago,
    costo,
  });

  // Registrar Inscripción
  const response1 = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body1,
  });

  if (!response1.ok) {
    const errorDetails = await response1.text();
    throw new Error('Error en la solicitud POST Inscripción: ' + response1.status + ' - ' + errorDetails);
  }

  const data1 = await response1.json();

  // Verifica que la inscripción fue creada
  if (!data1.id_inscripcion) {
    throw new Error('ID de inscripción no encontrado en la respuesta.');
  }

  const body2 = JSON.stringify({
    email,
    monto: costo,
    id_inscripcion: data1.id_inscripcion,
  });

  // Registrar Pago
  const response2 = await fetch('http://localhost:8000/Registro_de_pago/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body2,
  });

  if (!response2.ok) {
    const errorDetails = await response2.text();
    throw new Error('Error en la solicitud POST Registro de Pago: ' + response2.status + ' - ' + errorDetails);
  }

  const data2 = await response2.json();

  return { inscripcion: data1, registroDePago: data2 };
};

const UpdateInscripcion = async (id, datosActualizacion) => {
  console.log('Datos de actualización:', datosActualizacion);
  
  // Verifica que los datos de actualización tengan los campos esperados
  if (!datosActualizacion.email || !datosActualizacion.costo) {
    console.error('email o costo no están definidos en datosActualizacion:', datosActualizacion);
    throw new Error('Faltan datos necesarios para el registro del pago.');
  }
  
  const { email, costo } = datosActualizacion;

  try {
    // Actualizar la inscripción
    const response = await fetch(`${url}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizacion),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la inscripción: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.id_inscripcion) {
      console.log('ID de inscripción:', data.id_inscripcion);
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

const PostRegistroPago = async (email, monto, id_inscripcion) => {
  console.log('Registrando pago con:', { email, monto, id_inscripcion });
  
  const body = JSON.stringify({
    email,
    monto,
    id_inscripcion,
  });

  const response = await fetch('http://localhost:8000/Registro_de_pago/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error('Error en la solicitud POST Registro de Pago: ' + response.status + ' - ' + errorDetails);
  }

  return await response.json();
};

const GetMetodoPago = async () => {
  try {
    const response = await fetch('http://localhost:8000/Metodo_de_pago/');
    if (!response.ok) {
      throw new Error(`Error al obtener métodos de pago: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};

const GetRegistro_de_Pago = async () => {
  try {
    const response = await fetch('http://localhost:8000/Registro_de_pago/');
    if (!response.ok) {
      throw new Error(`Error al obtener registros de pago: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching payment records:", error);
    throw error;
  }
};

export { GetInscripcion, PostInscripcion, UpdateInscripcion, GetMetodoPago, GetRegistro_de_Pago };
