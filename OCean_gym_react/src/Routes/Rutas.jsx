import  { Routes,Route} from "react-router-dom"
// import Registro from "../pages/Registro"
import Login from "../pages/Login"
// import Home from "../pages/Home"
// import Contact from "../pages/Contact"
// import Admi from "../pages/Admi"
// import Catalogo from "../pages/Catalogo"

const Rutas = () => { // Todas mi rutas para navegar entre las diferentes paginas 

  return (
    <div>
      <Routes>
             {/* <Route path="/registro" element={<Registro />} /> */}
             <Route path="/login" element={<Login />} />
             {/* <Route path="/" element={<Home />} />
             <Route path="/home" element={<Home />} />
             <Route path="/contacto" element={<Contact/>} />
             <Route path="/administracion" element={<Admi/> } />
             <Route path="/catalogo" element={<Catalogo/> } /> */}
      </Routes>
  </div>
  )
}

export default Rutas