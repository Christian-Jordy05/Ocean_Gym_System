import './Home.css';
import instalogo from '../img/instalogo.png'
import facebooklogo from '../img/facebooklogo.png'
import Whatsapp from '../img/Whatsapp.png'

const MainSection = () => (
  <section className="main-section">
    <div className="overlay">
      <h2>Welcome to Ocean Gym</h2>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="contact-section">
    <div className="contact-info">
      <h3>Contactanos!</h3>
      <p>300mts al Norte de la entrada del Boli,Puntarenas, Costa Rica</p>
      <p>Telefono: (506) 8456-7890</p>
      <a href="mailto:oceangympuntarenas@gmail.com" className='subrayado'><p id='editcorreo'>Correo: oceangympuntarenas@gmail</p></a>
    </div>
    <div className="social-links">
      <h3>Síguenos!</h3>
      <ul>
        <li><a href="https://www.facebook.com/profile.php?id=100083259674848&mibextid=LQQJ4d"><img id='logofacebook' src={facebooklogo} alt="facebook"/></a></li>
        <li><a href="https://www.instagram.com/ocean_gym0?igsh=MTFyeDlxZGxkZGRhaA=="><img id='logoinsta' src={instalogo} alt="insta"/></a></li>
        <li><a href="https://wa.me/50686647624"><img id='logowhatsApp' src={Whatsapp} alt="WhatsApp"/></a></li>
      </ul>
    </div>
  </section>
);
function App() {
  return (
    <div className="App">
      <MainSection />
      <ContactSection />
    </div>
  );
}

export default App;

