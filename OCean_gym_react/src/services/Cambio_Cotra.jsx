const CambiarContraseña = async (email, nueva_contrasena) => {
    try {
        const response = await fetch(`http://localhost:8000/cambiar-contrasena/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,  
                nueva_contrasena: nueva_contrasena,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al cambiar la contraseña');
        }

        return true;
    } catch (error) {
        console.error("Error en cambiarContraseña:", error);
        return false;
    }
};



export default CambiarContraseña

