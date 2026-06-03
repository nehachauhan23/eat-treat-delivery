import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/orderTrackingPage";
import Navbar from "./components/Navbar";
import './App.css';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders/:id" element={<OrderTrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
