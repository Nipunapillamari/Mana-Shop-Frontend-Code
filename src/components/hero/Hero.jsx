// Hero.jsx
import React, { useEffect, useRef } from 'react';
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    
    if (left) {
      left.classList.add('animate');
    }
    if (right) {
      right.classList.add('animate');
    }
  }, []);

  return (
    <section className='hero'>
      <div className='hero-left' ref={leftRef}>
        {/* <span className='hero-tag'>NEW ARRIVALS</span> */}
        <h1 className='hero-headline'>
          Discover Your
          <span className='hero-highlight'> Signature Style</span>
        </h1>
        <p className='hero-description'>
          Elevate your wardrobe with our carefully curated collection of premium fashion pieces.
          Designed for those who appreciate quality, comfort, and timeless elegance.
        </p>
        <button className='hero-cta'>
          <span>Shop Now</span>
          <svg className='cta-arrow' width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className='hero-right' ref={rightRef}>
        <div className='hero-image-wrapper'>
          <div className='hero-image-bg'></div>
          <img src={hero_image} alt="Fashion model" className='hero-image' />
          <div className='hero-image-accent'></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;