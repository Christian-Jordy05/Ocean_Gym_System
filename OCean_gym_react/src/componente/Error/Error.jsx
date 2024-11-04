import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.css'

function ComError() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='bodyError'>
    <div className="glitch-container">
      <div className="glitch-text" data-text="PÁGINA NO EXISTE!">PÁGINA NO EXISTE!</div>
      <p className="redirect-message">Serás dirigido a la página principal en unos segundos...</p>
    </div>
    </div>
  )
}

export default ComError