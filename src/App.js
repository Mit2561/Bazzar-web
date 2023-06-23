import React, { createContext, useState, useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Home from "./PAGES/HomePage/Home";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPage from "./PAGES/Product/ProductPage";
import About from "./PAGES/Extra/About";
import Contact from "./PAGES/Extra/Contact";
import Login from "./PAGES/Auth/Login";
import Signup from "./PAGES/Auth/Signup";
import ForgotPassword from "./PAGES/Auth/ForgotPassword";
import Cart from "./PAGES/Cart/Cart";
import UserProfile from "./PAGES/User/UserProfile";
import FAQ from "./PAGES/Extra/FAQ";
import Termsandconditions from "./PAGES/Extra/Termsandconditions";
import PrivacyPolicy from "./PAGES/Extra/PrivacyPolicy";
import BuyPage from "./PAGES/ProductPurchase/BuyPage";
import { useCookies } from "react-cookie";
import { OrderPage } from "./PAGES/Order/OrderPage";
import { SingleOrder } from "./PAGES/Order/SingleOrder";
export const Context = createContext({ token: null, addToken: () => {} });
const App = () => {
  const [token, setToken] = useState(123);
  const [cookies, setCookie, removeCookie] = useCookies(["status"]);
  const addToken = () => {
    setToken(() => ( cookies.status === 123 ? 123 : null));
  };
  return (
    <Context.Provider value={{ token, addToken }}>
      <Routes>
        {/* {token===null && <Route path="/" element/>} */}
        <Route path="/" element={<Home/>} />
        {/* <Route path="/" element={token!==null ? <Home /> : <Navigate to="/login"/>} /> */}
        {/* <Route path="/home" element={token!==null ? <Home /> : <Login/>} /> */}
        { <Route path="/home" element={<Home /> } />}
        <Route path="/product/:prodid" element={token!==null ? <ProductPage /> : <Login/>} />
        <Route path="/order/:orderid" element={token!==null ? <SingleOrder /> : <Login/>} />
        <Route path="/myOrders" element={token!==null ? <OrderPage /> : <Login/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart /> } />
        <Route path="/user/:activepage" element={token!==null ? <UserProfile /> : <Login/>} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/termsandconditions" element={<Termsandconditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/Buy/:prodid/:quantity" element={token!==null ? <BuyPage /> : <Login/>} />

        <Route
          path="*"
          element={
            <div>
              <h1>404 NOT FOUND</h1>
            </div>
          }
        />
      </Routes>
    </Context.Provider>
  );
};

export default App;
