"use client"

import { useState, useEffect } from "react"
import "./vistaproducto.css"
import Navegar from "../navegacion/navegar"

// Componente de tarjeta de producto
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    // Aquí puedes implementar la lógica para añadir al carrito
    alert(`Producto añadido al carrito: ${product.nombre}`)
  }

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-badge">Nuevo</div>

      <div className="product-image-wrapper">
        <img src={product.img || "/placeholder.svg"} alt={product.nombre} className="product-image" />
      </div>

      <div className="product-header">
        <h3 className="product-name">{product.nombre}</h3>
      </div>

      <div className="product-content">
        <div className="product-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star">
                ★
              </span>
            ))}
          </div>
          <span className="rating-value">(5.0)</span>
        </div>

        <p className="product-description">{product.descripcion}</p>
      </div>

      <div className="product-footer">
        <div className="product-price">₡{product.precio}</div>
        <button className="buy-button" onClick={handleAddToCart}>
          <span className="cart-icon">🛒</span>
          Comprar
        </button>
      </div>
    </div>
  )
}

// Componente principal
const Vistaproducto = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Usar window.location.origin para construir la URL completa
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/productos/"
        : `${window.location.origin}/productos/`

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los productos")
        }
        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )

  if (error)
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    )

  return (
    <div className="product-container">
      <Navegar />
      <h2 className="products-title">Nuestros Productos</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="no-products">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default Vistaproducto

