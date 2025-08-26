import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { Checkout } from "./pages/Checkout";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
