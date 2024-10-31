import { useState, useEffect } from 'react'
import './Home.css'
import instalogo from '../img/instalogo.png'
import facebooklogo from '../img/facebooklogo.png'
import Whatsapp from '../img/Whatsapp.png'
import Cards from '../Card/Cards'
import videofit from '../video/videofit.mp4'
import Navegar from '../navegacion/navegar'
import { Link } from 'react-router-dom'




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
    <footer className="footer">
      <div className="footer__decoration"></div>
      <div className="footer__wrapper">
        <div className="footer__content">
          <div className="footer__section">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-wave"></div>
              </div>
              <h3 className="footer__title">Ocean Gym</h3>
            </div>
            <div className="footer__contact">
              <Link to="#" className="footer__link">
                <span className="footer__icon footer__icon--location"></span>
                <span className="footer__text">Puntarenas, Costa Rica</span>
              </Link>
              <Link to="tel:+50684567890" className="footer__link">
                <span className="footer__icon footer__icon--phone"></span>
                <span className="footer__text">(506) 8456-7890</span>
              </Link>
              <Link to="mailto:oceangympuntarenas@gmail.com" className="footer__link">
                <span className="footer__icon footer__icon--email"></span>
                <span className="footer__text">oceangympuntarenas@gmail.com</span>
              </Link>
            </div>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Horario</h3>
            <div className="footer__schedule">
              <div className="footer__schedule-item">
                <span className="footer__schedule-day">Lunes - Viernes</span>
                <span className="footer__schedule-hours">6:00 AM - 9:00 PM</span>
              </div>
              <div className="footer__schedule-item">
                <span className="footer__schedule-day">Sábado</span>
                <span className="footer__schedule-hours">8:00 AM - 6:00 PM</span>
              </div>
              <div className="footer__schedule-item footer__schedule-item--closed">
                <span className="footer__schedule-day">Domingo</span>
                <span className="footer__schedule-hours">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Síguenos</h3>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/profile.php?id=100083259674848"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Síguenos en Facebook"
              >
                <img src={facebooklogo} alt="" className='footer__social-icon' />
                <span className="footer__social-tooltip">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/ocean_gym0"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Síguenos en Instagram"
              >
                <img src={instalogo} alt="" className='footer__social-icon' />
                <span className="footer__social-tooltip">Instagram</span>
              </a>
              <a
                href="https://wa.me/50686647624"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Contáctanos por WhatsApp"
              >
                <img src={Whatsapp} alt="" className='footer__social-icon' />
                <span className="footer__social-tooltip">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Ocean Gym - Todos los derechos reservados
        </p>
      </div>
    </footer>
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
    <div className='Homebody'>
    <Navegar/>
    <div className="App">
      <MainSection />
      <FeaturesSection />
      <Cards />
      <TestimonialsSection />
      <ContactSection />
    </div>
    </div>
  )
}

export default Home