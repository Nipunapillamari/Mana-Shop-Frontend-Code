import React from 'react'
import Hero from '../components/hero/Hero'
import Popular from '../components/popular/Popular'
import Offers from '../components/offers/Offers.jsx'
import NewCollection from '../components/newcollection/NewCollection.jsx'
import NewsLetter from '../components/newsletter/NewsLetter.jsx'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollection/>
      <NewsLetter/>
     
    </div>
  )
}

export default Shop
