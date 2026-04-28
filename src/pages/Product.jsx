import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from "../context/ShopContext"
import BreadCrum from '../components/breadcrum/BreadCrum'
import ProductDetails from '../components/productdetails/ProductDetails'
import DescriptionBox from '../components/descriptionbox/DescriptionBox'
import RelatedProducts from '../components/relatedproducts/RelatedProducts'


const Product = () => {
  const { all_product } = useContext(ShopContext)
  const { productId } = useParams()
  const product = all_product.find((e) => e.id === Number(productId))

  if (!product) {
    return <div>Loading...</div>
  } return (
    <div>
      <BreadCrum product={product} />
      <ProductDetails product={product} />
      <DescriptionBox />
     <RelatedProducts product={product}/>
    </div>
  )
}

export default Product
