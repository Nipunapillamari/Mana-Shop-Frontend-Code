import React, { useContext } from 'react'
import "./RelatedProducts.css"
import { ShopContext } from '../../context/ShopContext'
import Item from '../item/Item'

const RelatedProducts = ({product}) => {

  const { all_product } = useContext(ShopContext)

  const related = all_product.filter(
    (item) => item.category === product.category && item.id !== product.id
  )

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />

      <div className="relatedproduct-items">
        {
          related.slice(0,4).map((item,i)=>{
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default RelatedProducts