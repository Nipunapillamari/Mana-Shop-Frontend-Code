import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/item/Item";

const SubCategoryPage = ({ supercategory, category, subcategory }) => {
  const { all_product } = useContext(ShopContext);

  // Filter by supercategory + category + subcategory
  const products = all_product.filter(
    (item) =>
      item.supercategory === supercategory &&
      item.category === category &&
      item.subcategory === subcategory
  );

  return (
    <div className="subcategory-page">
      <h2>
        {supercategory.toUpperCase()} - {category.toUpperCase()} - {subcategory.toUpperCase()}
      </h2>

      <div className="products-grid">
        {products.map((item, i) => (
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
  );
};

export default SubCategoryPage;
