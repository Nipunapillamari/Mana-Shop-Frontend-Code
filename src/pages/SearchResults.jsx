// SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/css/SearchResults.css"

const SearchResults = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const query = new URLSearchParams(location.search).get("q")
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Search error:", err)
        setLoading(false)
      })
  }, [query])

  return (
    <div className="search-page">
      <div className="search-container">
        <h2 className="search-title">
          Search Results for 
          <span className="search-query"> "{query}"</span>
        </h2>
        
        {loading ? (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Searching for products...</p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>We couldn't find any matches for "{query}"</p>
                <button 
                  className="back-to-shop"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="results-count">
                  Found {products.length} {products.length === 1 ? 'product' : 'products'}
                </div>
                <div className="search-grid">
                  {products.map((item, index) => (
                    <div
                      className="search-card"
                      key={item.id}
                      onClick={() => navigate(`/product/${item.id}`)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="card-image-wrapper">
                        <img src={item.image} alt={item.name} />
                        <div className="card-overlay">
                          <span>Quick View</span>
                        </div>
                      </div>
                      <div className="card-content">
                        <h4>{item.name}</h4>
                        <div className="price">
                          <span className="new">₹{item.new_price?.toLocaleString('en-IN')}</span>
                          <span className="old">₹{item.old_price?.toLocaleString('en-IN')}</span>
                          {item.old_price && (
                            <span className="discount">
                              {Math.round(((item.old_price - item.new_price) / item.old_price) * 100)}% off
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResults