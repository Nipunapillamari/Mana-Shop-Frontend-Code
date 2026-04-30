import React, { useContext, useState, useRef, useEffect } from 'react'
import logo from "../Assets/manalogo.png"
import "./Navbar.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'

const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { getTotalCartItem } = useContext(ShopContext)
    const location = useLocation()
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [imageError, setImageError] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearch = () => {
        if (search.trim() !== "") {
            navigate(`/search?q=${search}`)
        }
    }

    const dropdown_toggle = () => {
        setMobileMenuOpen(prev => !prev)
    }

    useEffect(() => {
        const path = location.pathname

        if (path === '/') setMenu("shop")
        else if (path === '/women') setMenu("women")
        else if (path === '/men') setMenu("men")
        else if (path === '/kids') setMenu("kids")

        // close menu on route change
        setMobileMenuOpen(false)

    }, [location])

    return (
        <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className='navbar-container'>
                {/* Logo */}
                <div className='nav_logo'>
                    <Link to="/" className="logo-link">
                        {!imageError ? (
                            <img
                                src={logo}
                                alt="Shopper"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="logo-fallback">🛍️</div>
                        )}
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch()
                        }}
                    />
                    <button onClick={handleSearch} className="search-btn">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <ul className={`navbar_menu ${mobileMenuOpen ? 'nav-menu-visible' : ''}`}>
                    <li className={menu === "shop" ? "active" : ""}>
                        <Link to="/" onClick={() => {
                            setMenu("shop")
                            setMobileMenuOpen(false)
                        }}>Shop</Link>
                    </li>
                    <li className={menu === "women" ? "active" : ""}>
                        <Link to="/women" onClick={() => {
                            setMenu("women")
                            setMobileMenuOpen(false)
                        }}>Women</Link>
                    </li>
                    <li className={menu === "men" ? "active" : ""}>
                        <Link to="/men" onClick={() => {
                            setMenu("men")
                            setMobileMenuOpen(false)
                        }}>Men</Link>
                    </li>
                    <li className={menu === "kids" ? "active" : ""}>
                        <Link to="/kids" onClick={() => {
                            setMenu("kids")
                            setMobileMenuOpen(false)
                        }}>Kids</Link>
                    </li>
                </ul>

                {/* Actions */}
                <div className='navbar_actions'>
                    {localStorage.getItem("auth-token") ? (
                        <button
                            className="action-btn logout-btn"
                            onClick={() => {
                                localStorage.removeItem("auth-token")
                                window.location.replace("/")
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    ) : (
                        <Link to="/login" className="action-link">
                            <button className="action-btn login-btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                            </button>
                        </Link>
                    )}

                    <Link to="/cart" className="cart-container">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {getTotalCartItem() > 0 && (
                            <div className='cart_count'>{getTotalCartItem()}</div>
                        )}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={dropdown_toggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar