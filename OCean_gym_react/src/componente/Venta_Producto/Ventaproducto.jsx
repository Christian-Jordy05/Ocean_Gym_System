// import './ventaproducto.css'
// import protehwhey from '../img/protehwhey.png'

// function Ventaproducto() {
//   const products = [
//     {
//       id: 1,
//       name: 'Proteina Whey',
//       description: 'Proteína de suero de alta calidad para el desarrollo y la recuperación muscular.',
//       price: '15,000',
//       image: 'https://vitalikecr.com/wp-content/uploads/2023/01/100whey-5lb-van.jpeg', // Reemplaza con la URL de la imagen correcta
//     },
//     {
//       id: 2,
//       name: 'Guantes',
//       description: 'Guantes cómodos y duraderos para un mejor agarre durante los entrenamientos.',
//       price: '10,000',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnpx1YfYeZtnb2Mkix3a2lhS7hTyTKsC3YQ&s', // Reemplaza con la URL de la imagen correcta
//     },
//     {
//       id: 3,
//       name: 'Botella',
//       description: 'Botella mezcladora a prueba de fugas para mezclar batidos de proteínas y suplementos.',
//       price: '5,000',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ55myYnNhnqGpl9Ws6pJtAdv6U2NhYpUELPg&s', // Reemplaza con la URL de la imagen correcta
//     },
//   ];

//   return (
//       <div className="products-container">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <span>{product.price}</span>
//             <button>Comprar</button>
//           </div>
//         ))}
//       </div>
//   );
// }

// export default Ventaproducto;
import './ventaproducto.css'
import protehwhey from '../img/protehwhey.png';
import {clientId} from '../../keys/keys.js';

import { useState } from'react';
function Ventaproducto() {
  const [file, setFile] = useState(null); // Estado para la imagen
  const send_data = async () => {
    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }
    try {
      // Subir la imagen a Imgur
      const auth = "Client-ID " + clientId;
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log(data.data.link);
      const imageUrl = data.data.link; // de URL la imagen subida
      console.log(data);
      // Luego de subir la imagen, envía los datos del formulario junto con la URL de la imagen
      console.log("Datos e imagen enviados correctamente");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
  return (
   <div>
    <div className="divsInputs">
          <input
            placeholder="file"
            className="inpts"
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
    <input onClick={send_data} type="submit" value="Guardar" />
   </div>
  );
}

export default Ventaproducto;