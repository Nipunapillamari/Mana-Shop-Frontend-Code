import React, { useEffect, useRef } from 'react';
import "./Footer.css";
import footer_logo from "../Assets/manalogo.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintrest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef([]);

  useEffect(() => {
    // Animation on scroll - fade up effect
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe footer logo section
    const logoSection = document.querySelector('.footer-logo');
    if (logoSection) observer.observe(logoSection);

    // Observe each link with stagger effect
    linksRef.current.forEach(link => {
      if (link) observer.observe(link);
    });

    // Observe each social icon with stagger effect
    socialRef.current.forEach(icon => {
      if (icon) observer.observe(icon);
    });

    // Observe copyright section
    const copyrightSection = document.querySelector('.footer-copyright');
    if (copyrightSection) observer.observe(copyrightSection);

    return () => observer.disconnect();
  }, []);

  const links = ['Company', 'Products', 'Offices', 'About', 'Contact'];

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        {/* Logo Section - Text Removed */}
        <div className="footer-logo fade-up">
          <div className="logo-wrapper">
            <img 
              src={footer_logo} 
              alt="Shopper Logo" 
              className="logo-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="footer-links">
          {links.map((link, index) => (
            <li 
              key={link}
              ref={el => linksRef.current[index] = el}
              className="footer-link-item fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a href={`#${link.toLowerCase()}`} className="footer-link">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="footer-social-icons">
          <div 
            className="footer-icons-container"
            ref={el => socialRef.current[0] = el}
            style={{ animationDelay: '0s' }}
          >
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Instagram"
            >
              <img 
                src={instagram_icon} 
                alt="Instagram" 
                className="social-icon"
              />
            </a>
          </div>
          <div 
            className="footer-icons-container"
            ref={el => socialRef.current[1] = el}
            style={{ animationDelay: '0.1s' }}
          >
            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="WhatsApp"
            >
              <img 
                src={whatsapp_icon} 
                alt="WhatsApp" 
                className="social-icon"
              />
            </a>
          </div>
          <div 
            className="footer-icons-container"
            ref={el => socialRef.current[2] = el}
            style={{ animationDelay: '0.2s' }}
          >
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Pinterest"
            >
              <img 
                src={pintrest_icon} 
                alt="Pinterest" 
                className="social-icon"
              />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright fade-up">
          <div className="copyright-divider">
            <hr />
          </div>
          <div className="copyright-content">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} SHOPPER. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="#privacy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="#terms">Terms of Service</a>
              <span className="separator">|</span>
              <a href="#cookies">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 5L18 11M12 5L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;