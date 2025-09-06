import { Routes, Route } from "react-router-dom";
import "./style/App.css";
import HomePage from "./pages/HomePage";
import { Checkout } from "./pages/Checkout";
import { OrderPage } from "./pages/OrderPage";
import { TrackingPage } from "./pages/TrackingPage";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      });
  }, []);
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes> */}

      <Routes>
        <Route path="/" element={<HomePage cart={cart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
