// Offers.jsx
import React, { useEffect, useRef } from 'react'
import "./Offers.css"
import exclusive_image from "../Assets/exclusive_image.png"

const Offers = () => {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    
    if (left) {
      left.classList.add('animate')
    }
    if (right) {
      right.classList.add('animate')
    }
  }, [])

  return (
    <div className='offers'>
      <div className='offers-left' ref={leftRef}>
        <span className='offer-badge'>Limited Time Deal</span>
        <h1>Exclusive Offers</h1>
        <h2>For You</h2>
        <p>ONLY ON BEST SELLER PRODUCTS</p>
        <button>Grab Now →</button>
      </div>
      <div className='offers-right' ref={rightRef}>
        <div className='image-container'>
          <div className='image-bg'></div>
          <img src={exclusive_image} alt="Exclusive Offer" />
        </div>
      </div>
    </div>
  )
}

export default Offers