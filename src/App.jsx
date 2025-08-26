import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { Checkout } from "./pages/Checkout";
import { OrderPage } from "./pages/OrderPage";
import { Header } from "./section/Header";
import { TrackingPage } from "./pages/TrackingPage";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
