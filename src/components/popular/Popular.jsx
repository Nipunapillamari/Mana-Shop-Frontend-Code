// Popular.jsx
import React, { useEffect, useState } from 'react';
import "./Popular.css";
import Item from '../item/Item';

const Popular = () => {
  const [data_product, setpopularproduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((response) => response.json())
      .then((data) => {
        setpopularproduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [])

  return (
    <div className='popular-section'>
      <div className='popular-container'>
        <div className='popular-header'>
          {/* <span className='popular-badge'>Curated Collection</span> */}
          <h1 className='popular-title'>Popular in <span className='title-accent'>Women</span></h1>
          <p className='popular-subtitle'>Discover the most loved pieces from our latest collection</p>
        </div>

        {loading ? (
          <div className='loading-wrapper'>
            <div className='loading-spinner'></div>
            <p className='loading-text'>Loading exquisite pieces...</p>
          </div>
        ) : (
          <div className='popular-grid'>
            {data_product.map((item, i) => (
              <div key={i} className='product-card'>
                <Item 
                  id={item.id}
                  name={item.name} 
                  image={item.image} 
                  new_price={item.new_price} 
                  old_price={item.old_price}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popular;