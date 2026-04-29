// NewCollection.jsx
import React, { useEffect, useState } from 'react'
import "./NewCollection.css"
import Item from '../item/Item'
import API from "../config";

const NewCollection = () => {
  const [new_collections, setNewCollection] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    fetch(`${API}/newcollection`)
      .then((response) => response.json())
      .then((data) => {
        // Format data to ensure consistent structure
        const formattedData = data.map(item => ({
          id: item.id || item._id || Math.random().toString(36).substr(2, 9),
          name: item.name || item.title || "Product Name",
          image: item.image || item.img || item.image_url || "default-image.jpg",
          new_price: item.new_price || item.price || item.current_price || 0,
          old_price: item.old_price || item.original_price || item.previous_price || 0
        }))
        setNewCollection(formattedData)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className='new-collections-section'>
      <div className='new-collections-container'>
        <div className='new-collections-header'>
          {/* <span className='section-badge'>Just Dropped</span> */}
          <h1 className='new-collections-title'>New <span className='title-highlight'>Collections</span></h1>
          <p className='new-collections-subtitle'>Discover the latest arrivals • Fresh styles every week</p>
        </div>
        
        {loading ? (
          <div className='loading-spinner'>
            <div className='spinner'></div>
            <p className='loading-text'>Loading fresh arrivals...</p>
          </div>
        ) : (
          <div className='new-collections-grid'>
            {new_collections.map((item) => (
              <div key={item.id} className='grid-item-wrapper'>
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
  )
}

export default NewCollection