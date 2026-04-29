import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/item/Item";
import "../pages/css/Categories.css";
import API from "../config";

const CategoryPage = () => {

  const { supercategory, category } = useParams();
  const { all_product } = useContext(ShopContext);

  const [selectedFilters,setSelectedFilters] = useState({})
  const [filterOptions,setFilterOptions] = useState({})

  const handleFilterChange = (filterName,value)=>{

    setSelectedFilters(prev=>{

      const currentValues = prev[filterName] || []

      if(currentValues.includes(value)){
        return {
          ...prev,
          [filterName]:currentValues.filter(v=>v!==value)
        }
      }else{
        return {
          ...prev,
          [filterName]:[...currentValues,value]
        }
      }

    })
  }

  useEffect(()=>{

    fetch(`${API}/${category}`)
    .then(res=>res.json())
    .then(data=>setFilterOptions(data))

  },[category])


  const filteredProducts = all_product.filter((item)=>{

    if(item.supercategory !== supercategory) return false

    if(item.category.toLowerCase().replace(/\s+/g,"-") !== category) return false

    for(const key in selectedFilters){

      const values = selectedFilters[key]

      if(values.length === 0) continue

      if(key === "price"){

        const price = item.new_price

        const match = values.some(range=>{
          if(range.max !== undefined){
            return price >= range.min && price <= range.max
          }
          return price >= range.min
        })

        if(!match) return false
        continue
      }

      const productValue = item.filters?.[key]

      if(Array.isArray(productValue)){
        if(!productValue.some(v=>values.includes(v))) return false
      }else{
        if(!values.includes(productValue)) return false
      }

    }

    return true

  })


  const groupedProducts = filteredProducts.reduce((acc,item)=>{
    if(!acc[item.subcategory]){
      acc[item.subcategory] = []
    }
    acc[item.subcategory].push(item)
    return acc
  },{})


  return (

    <div className="category-page">

      <div className="category-layout">

        {/* LEFT FILTERS */}

        <aside className="filters-sidebar">

          <h2 className="filters-title">Filters</h2>

          {Object.keys(filterOptions).map(filterName=>(
            
            <div className="filter-group" key={filterName}>

              <h3>{filterName}</h3>
              <div className="filter-options-container">
                {filterOptions[filterName].map((value,index)=>{

                  if(filterName === "price"){
                    return(
                      <label key={index} className="filter-option">

                        <input
                        type="checkbox"
                        onChange={()=>handleFilterChange(filterName,value)}
                        />

                        {value.label}

                      </label>
                    )
                  }

                  return(
                    <label key={value} className="filter-option">

                      <input
                      type="checkbox"
                      onChange={()=>handleFilterChange(filterName,value)}
                      />

                      {value}

                    </label>
                  )

                })}
              </div>

            </div>

          ))}

        </aside>


        {/* RIGHT PRODUCTS */}

        <main className="products-area">

          <div className="category-header">
            <h1 className="main-category-title">
              {supercategory} / {category.replace("-"," ")}
            </h1>
            <span className="product-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

        <div className="subcategories-list">

  {Object.keys(groupedProducts).length === 0 ? (

    <div className="no-products-container">
      <div className="no-products-content">
        <svg className="no-products-icon" viewBox="0 0 24 24" width="64" height="64">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>No products found</h3>
        <p>Try adjusting your filters or browse other categories</p>
        <button 
          className="clear-filters-btn"
          onClick={() => setSelectedFilters({})}
        >
          Clear all filters
        </button>
      </div>
    </div>

  ) : (

    Object.keys(groupedProducts).map((subcat) => (
      <div key={subcat} className="subcategory-row">

        <div className="subcategory-left">
          <h2>{subcat}</h2>
          <span className="subcategory-count">{groupedProducts[subcat].length} items</span>
        </div>

        <div className="subcategory-right">
          <div className="horizontal-scroll-container">
            <div className="horizontal-scroll">

              {groupedProducts[subcat].map((item, i) => (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              ))}

            </div>
          </div>
        </div>

      </div>
    ))

  )}

</div>
        </main>

      </div>

    </div>

  )
}

export default CategoryPage