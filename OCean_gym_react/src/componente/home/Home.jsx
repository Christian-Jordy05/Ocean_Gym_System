import { useState, useEffect } from 'react'
import './Home.css'
import instalogo from '../img/instalogo.png'
import facebooklogo from '../img/facebooklogo.png'
import Whatsapp from '../img/Whatsapp.png'
import Cards from '../Rutina/Cards'
import videofit from '../video/videofit.mp4'

const MainSection = () => (
  <section className="main-section">
    <div className="overlay">
     <video autoPlay muted loop className="background-video">
        <source src={videofit} type="video/mp4" />
      </video>
      <h2 className='bienvenidogym'>Bienvenido a Ocean Gym</h2>
    </div>
  </section>
)

const FeaturesSection = () => (
  <section className="features-section">
    <div className="feature">
      <i className="fas fa-dumbbell"></i>
      <h3>Equipamiento de última generación</h3>
      <p>Entrena con lo mejor en tecnología fitness</p>
    </div>
    {/* <div className="feature">
      <i className="fas fa-users"></i>
      <h3>Clases grupales dinámicas</h3>
      <p>Únete a nuestras emocionantes sesiones en grupo</p>
    </div> */}
    <div className="feature">
      <i className="fas fa-heart"></i>
      <h3>Entrenadores expertos</h3>
      <p>Guía personalizada para alcanzar tus metas</p>
    </div>
  </section>
)

const TestimonialsSection = () => (
  <section className="testimonials-section">
    <h2>Lo que dicen nuestros miembros</h2>
    <div className="testimonial">
      <p>"Ocean Gym cambió mi vida. ¡Nunca me había sentido tan en forma!"</p>
      <span>- María G.</span>
    </div>
    <div className="testimonial">
      <p>"Los entrenadores son increíbles. Siempre me motivan a dar lo mejor."</p>
      <span>- Carlos R.</span>
    </div>
  </section>
)

const ContactSection = () => { 
  const direccion = "300mts al Norte de la entrada del Boli,Puntarenas,Costa Rica"
  const url = `https://www.google.com/maps/place/Ocean+Gym/@9.9802644,-84.7577344,18.3z/data=!4m6!3m5!1s0x8fa0316cd1bda3f9:0xb6112bf209eefd7b!8m2!3d9.9802966!4d-84.7574158!16s%2Fg%2F11t0rlkxnn?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D${encodeURIComponent(direccion)}`

  return (
    <section className="contact-section">
      <div className="contact-info">
        <h3>Contáctanos</h3>
        <p>
          <a href={url} target="_blank" rel="noopener noreferrer" className='direccionOceangym'>
            {direccion}
          </a>
        </p>
        <p>Teléfono: (506) 8456-7890</p>
        <a href="mailto:oceangympuntarenas@gmail.com" className='subrayado'>
          <p id='editcorreo'>Correo: oceangympuntarenas@gmail.com</p>
        </a>
      </div>
      <div className="social-links">
        <h3>Síguenos</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/profile.php?id=100083259674848&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              <img id='logofacebook' src={facebooklogo} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/ocean_gym0?igsh=MTFyeDlxZGxkZGRhaA==" target="_blank" rel="noopener noreferrer">
              <img id='logoinsta' src={instalogo} alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://wa.me/50686647624" target="_blank" rel="noopener noreferrer">
              <img id='logowhatsApp' src={Whatsapp} alt="WhatsApp" />
            </a>
          </li>
        </ul>
      </div>    
    </section>
  )
}

function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <MainSection />
      <FeaturesSection />
      <Cards />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}

export default Home