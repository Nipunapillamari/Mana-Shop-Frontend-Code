// NewsLetter.jsx
import React, { useState, useEffect, useRef } from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (section) {
      section.classList.add('animate')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <div className='newsletter-section' ref={sectionRef}>
      <div className='newsletter-container'>
        <div className='newsletter-icon'>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6L12 13L2 6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 4H20C21.1 4 22 4.9 22 6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h2 className='newsletter-label'>Newsletter</h2>
        
        <h1 className='newsletter-title'>
          Subscribe to get <span className='highlight'>20% off</span>
        </h1>
        
        <p className='newsletter-subtitle'>
          Be the first to know about new collections, exclusive offers, and fashion updates.
        </p>
        
        <form className='newsletter-form' onSubmit={handleSubmit}>
          <div className='input-group'>
            <input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              Subscribe
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
        
        {isSubmitted && (
          <div className='success-message'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Thanks for subscribing! Check your inbox.</span>
          </div>
        )}
        
        <p className='newsletter-note'>
          By subscribing you agree to our <a href="/">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default NewsLetter