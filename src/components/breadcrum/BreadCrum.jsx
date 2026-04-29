import React from 'react'
import "./BreadCrum.css"
import { Link } from 'react-router-dom'

const BreadCrum = (props) => {
    const { product } = props;
    
    const breadcrumbItems = [
        { label: 'HOME', path: '/' },
        { label: 'SHOP', path: '/shop' },
        { label: product?.category?.toUpperCase() || 'CATEGORY', path: `/category/${product?.category?.toLowerCase()}` },
        { label: product?.name || 'PRODUCT', path: null }
    ];

    return (
        <nav className="breadcrumb">
            {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                    {item.path ? (
                        <Link to={item.path} className="breadcrumb-link">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="breadcrumb-current">
                            {item.label}
                        </span>
                    )}
                    
                    {index < breadcrumbItems.length - 1 && (
                        <span className="breadcrumb-separator">/</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}

export default BreadCrum