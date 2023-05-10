import React from "react";
import {
    Route,
    Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductSearchList from "./pages/ProductSearchList/ProductSearchList";
import BuyCartForm from "./pages/BuyCartForm/BuyCartForm";

const App = () => (
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/items" element={ <ProductSearchList /> } />
        <Route path="/items/:id" element={ <ProductDetail /> } />
        <Route path="/items/:id/buy-cart" element={<BuyCartForm /> } />
        <Route path='*' element={<Home /> }/>
    </Routes>
);

export default App;