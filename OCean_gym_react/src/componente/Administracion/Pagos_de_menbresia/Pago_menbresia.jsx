import React, { useState } from 'react';
import { Search, CreditCard, Banknote, Send } from 'lucide-react';
import './Pago_menbresia.css';
import { GetInscripcion, PostInscripcion, UpdateInscripcion, GetMetodoPago } from '../../../services/Incripsion';
import Swal from 'sweetalert2';

function Pago_menbresia() {
  const [email, setEmail] = useState('');
  const [tipoMembresia, setTipoMembresia] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const membresiaPrecio = {
    dia: 3000,
    semanal: 8000,
    quincenal: 10000,
    mensual: 15000,
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const buscarUsuario = async () => {
    if (!email || !isValidEmail(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor ingrese un correo electrónico válido',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const datos = await GetInscripcion();
      const RevisionDeIncripcion = datos.find(e => e.email === email);

      if (RevisionDeIncripcion) {
        Swal.fire({
          icon: 'info',
          title: 'Actualizar inscripción',
          text: 'El usuario ya está registrado. Actualice su inscripción.',
        });
        setUsuario(RevisionDeIncripcion);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Crear nueva inscripción',
          text: 'El usuario no está registrado. Proceda a crear una inscripción nueva.',
        });
        setUsuario({ email });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al buscar el usuario',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const obtenerIdMetodoPago = async (metodoPago) => {
    const metodosPago = await GetMetodoPago(); 
    const metodo = metodosPago.find((m) => m.descripcion.toLowerCase() === metodoPago.toLowerCase());
    return metodo ? metodo.id_metododepago : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!usuario || !tipoMembresia || !metodoPago) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const metodoPagoId = await obtenerIdMetodoPago(metodoPago);
      if (!metodoPagoId) {
        throw new Error('Método de pago no válido.');
      }

      const costo = membresiaPrecio[tipoMembresia];

      if (usuario.id_inscripcion) {
        await UpdateInscripcion(usuario.id_inscripcion, {
          email: email,
          tipo_inscripcion: tipoMembresia,
          id_metododepago: metodoPagoId,
          costo: costo,
        });
      } else {
        await PostInscripcion(email, tipoMembresia, metodoPagoId, costo);
      }

      Swal.fire({
        icon: 'success',
        title: usuario.id_inscripcion ? 'Inscripción actualizada' : 'Inscripción creada',
        text: `La inscripción de ${email} ha sido procesada correctamente.`,
      });

      setEmail('');
      setTipoMembresia('');
      setMetodoPago('');
      setUsuario(null);
    } catch (error) {
      console.error("Error al procesar la inscripción:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar',
        text: 'Hubo un error durante el proceso.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='PagoMenbrebody'>
      <div className="pagos-container">
        <div className="pagos-card">
          <div className="pagos-header">
            <h1 className="pagos-title">Sistema de Pagos de Membresía</h1>
            <p className="pagos-description">Gestione sus membresías con facilidad</p>
          </div>
          <div className="pagos-content">
            <form onSubmit={handleSubmit} className="pagos-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico del Usuario</label>
                <div className="email-input-group">
                  <input
                    id="email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="email-input"
                  />
                  <button 
                    type="button" 
                    onClick={buscarUsuario} 
                    className="search-button"
                    disabled={isSubmitting}
                    aria-label="Buscar usuario"
                  >
                    <Search className="button-icon" />
                  </button>
                </div>
              </div>

              {usuario && (
                <>
                  <div className="form-group">
                    <label htmlFor="tipoMembresia" className="form-label">Tipo de Membresía</label>
                    <select 
                      id="tipoMembresia"
                      value={tipoMembresia}
                      onChange={(e) => setTipoMembresia(e.target.value)}
                      required
                      className="membresia-select"
                    >
                      <option value="">Seleccione el tipo de membresía</option>
                      <option value="dia">Diaria (₡3,000)</option>
                      <option value="semanal">Semanal (₡8,000)</option>
                      <option value="quincenal">Quincenal (₡10,000)</option>
                      <option value="mensual">Mensual (₡15,000)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <fieldset>
                      <legend className="form-label">Método de Pago</legend>
                      <div className="metodo-pago-group">
                        <label className="metodo-pago-option">
                          <input
                            type="radio"
                            name="metodoPago"
                            value="sinpe"
                            checked={metodoPago === 'sinpe'}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="metodo-pago-radio"
                          />
                          <span className="metodo-pago-label">
                            <CreditCard className="metodo-pago-icon sinpe-icon" />
                            SINPE
                          </span>
                        </label>
                        <label className="metodo-pago-option">
                          <input
                            type="radio"
                            name="metodoPago"
                            value="efectivo"
                            checked={metodoPago === 'efectivo'}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="metodo-pago-radio"
                          />
                          <span className="metodo-pago-label">
                            <Banknote className="metodo-pago-icon efectivo-icon" />
                            Efectivo
                          </span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="submit-button" 
                disabled={isSubmitting || !usuario || !tipoMembresia || !metodoPago}
              >
                {isSubmitting ? 'Procesando...' : 'Enviar Pago'}
                <Send className="button-icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pago_menbresia;
