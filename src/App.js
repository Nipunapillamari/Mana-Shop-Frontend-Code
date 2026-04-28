import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "../src/pages/Shop"
import Cart from "../src/pages/Cart"
import ShopCategory from "../src/pages/ShopCategory"
import LoginSignup from "../src/pages/LoginSignup"
import Product from "../src/pages/Product"
import Footer from './components/footer/Footer';
import menbanner from "./components/Assets/mensbanner.png"
import womenbanner from "./components/Assets/womenbanner.png"
import kidsbanner from "./components/Assets/kids.png"
import CategoryPage from "./pages/Categories";
import SubCategoryPage from "./pages/SubCategories";
import SearchResults from "./pages/SearchResults"



function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={menbanner} supercategory="men" />} />
          <Route path='/women' element={<ShopCategory banner={womenbanner} supercategory="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kidsbanner} supercategory="kids" />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>

          {/* <Route path='/women/party-wear' element={<CategoryPage supercategory="women" category="party wear" />} />
          <Route path='/women/casual-wear' element={<CategoryPage supercategory="women" category="casual wear" />} />
          <Route path='/women/night-wear' element={<CategoryPage supercategory="women" category="night wear" />} />

          <Route path='/men/party-wear' element={<CategoryPage supercategory="men" category="party wear" />} />
          <Route path='/men/casual-wear' element={<CategoryPage supercategory="men" category="casual wear" />} />
          <Route path='/men/night-wear' element={<CategoryPage supercategory="men" category="night wear" />} />

          <Route path='/kids/party-wear' element={<CategoryPage supercategory="kids" category="party wear" />} />
          <Route path='/kids/casual-wear' element={<CategoryPage supercategory="kids" category="casual wear" />} />
          <Route path='/kids/night-wear' element={<CategoryPage supercategory="kids" category="night wear" />} /> */}

          {/* <Route path='/women/party-wear/sarees' element={<SubCategoryPage supercategory="women" category="party wear" subcategory="sarees" />} />
          <Route path='/women/party-wear/party-dresses' element={<SubCategoryPage supercategory="women" category="party wear" subcategory="party dresses" />} />

          <Route path='/men/party-wear/kurtas' element={<SubCategoryPage supercategory="men" category="party wear" subcategory="kurtas" />} />
          <Route path='/men/party-wear/suits' element={<SubCategoryPage supercategory="men" category="party wear" subcategory="suits" />} />

          <Route path='/kids/party-wear/frocks' element={<SubCategoryPage supercategory="kids" category="party wear" subcategory="frocks" />} />
          <Route path='/kids/party-wear/lehenga' element={<SubCategoryPage supercategory="kids" category="party wear" subcategory="lehenga" />} /> */}

          <Route
            path='/:supercategory/:category'
            element={<CategoryPage />}
          />
          <Route path="/search" element={<SearchResults />} />




        </Routes>
        <Footer />



      </BrowserRouter>

    </div>
  );
}

export default App;
