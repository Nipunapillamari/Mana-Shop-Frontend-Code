import React, { useContext, useState,useEffect } from 'react'
import "./ProductDetails.css"
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../context/ShopContext'

const ProductDetails = (props) => {
    const { product } = props;
    const [selectedSize, setSelectedSize] = useState('M');
 const [mainImage, setMainImage] = useState("");
     const { addToCart } = useContext(ShopContext);

       useEffect(() => {
        if(product){
            setMainImage(product.image)
        }
    }, [product])

    if (!product) {
        return <div>Loading...</div>;
    } 

    // Sample images array - you should get this from your backend
    const productImages = product.images || [
        product.image,
        product.image,
        product.image,
        product.image
    ];

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className='product-detail'>
            <div className="product-detail-left">
                <div className="thumbnail-list">
                    {productImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            onClick={() => setMainImage(img)}
                            className={mainImage === img ? 'active' : ''}
                        />
                    ))}
                </div>
                <div className="main-image-container">
                    <img src={mainImage} alt={product.name} className='main-image' />
                </div>
            </div>

            <div className="product-detail-right">
                <h1 className='product-title'>{product.name}</h1>

                <div className="rating-container">
                    <div className="stars">
                        <img src={star_icon} alt="star" />
                        <img src={star_icon} alt="star" />
                        <img src={star_icon} alt="star" />
                        <img src={star_icon} alt="star" />
                        <img src={star_dull_icon} alt="star" />
                    </div>
                    <span className='rating-count'>({product.rating || 122})</span>
                </div>

                <div className="price-container">
                    <span className="old-price">₹{product.old_price}</span>
                    <span className="new-price">₹{product.new_price}</span>
                </div>

                <p className="product-description">
                    {product.description || "Lightweight usually knitted close fitting round neckline and short sleeves"}
                </p>

                <div className='size-section'>
                    <h3>Select size</h3>
                    <div className="size-options">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <button
                                key={size}
                                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <button className='add-to-cart-btn' onClick={() => { addToCart(product.id, selectedSize) }}>
                    ADD TO CART
                </button>

                <div className="product-meta">
                    <p><span>Category :</span> {product.category || "Women, T-Shirt, Crop Top"}</p>
                    <p><span>Tags :</span> {product.tags || "Modern, Latest"}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails