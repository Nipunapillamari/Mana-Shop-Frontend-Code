// Item.jsx
import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'
import { FaRegHeart, FaHeart, FaShoppingBag } from 'react-icons/fa'

const Item = (props) => {
  const [wishlisted, setWishlisted] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted(!wishlisted)
  }

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} className='item-link'>
        <div className='item-image-container'>
          {!imageLoaded && <div className='image-skeleton' />}
          <img 
            onClick={scrollToTop} 
            src={props.image} 
            alt={props.name}
            className={`item-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
              setImageLoaded(true);
            }}
          />
          
          <div className='item-actions'>
            <button 
              className='wishlist-btn' 
              onClick={toggleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wishlisted ? <FaHeart className='wishlisted' /> : <FaRegHeart />}
            </button>
          </div>
          
          {props.bestseller && (
            <div className='bestseller-badge'>
              <span>⭐ Bestseller</span>
            </div>
          )}
          
          {/* Quick add button on hover */}
          <button className='quick-add-btn'>
            <FaShoppingBag />
            <span>Quick View</span>
          </button>
        </div>
        
        <div className='item-info'>
          <div className='item-brand'>Premium Store</div>
          <h4 className='item-name'>{props.name}</h4>
          
          <div className='item-price-row'>
            <span className='item-price-new'>₹{props.new_price}</span>
            {props.old_price && (
              <span className='item-price-old'>₹{props.old_price}</span>
            )}
            {props.discount && (
              <span className='discount-badge'>{props.discount}% OFF</span>
            )}
          </div>
          
          <div className='item-rating'>
            <div className='stars'>
              ★★★★★
            </div>
            <span className='rating-count'>(128)</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Item