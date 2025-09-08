import { React, useEffect, useState } from "react";
import "./HomePage.css";
import { Header } from "../../components/Header";
// import { products } from "../../starting code/data/products";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid";

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
      <ProductsGrid products = {products}/>
      </div>
    </>
  );
};

export default HomePage;
