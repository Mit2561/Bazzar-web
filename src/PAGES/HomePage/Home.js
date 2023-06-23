import React, { useContext, useEffect, useState } from "react";
import BannerSlider from "../../COMPONENTS/Banners/BannerSlider";
// import HomeCategories from "../../COMPONENTS/Category/HomeCategories";
import Footer1 from "../../COMPONENTS/Footer/Footer1";
import Footer from "../../COMPONENTS/Footer/Footer";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import ProductSidebar from "../../COMPONENTS/Product/ProductSidebar";
import ProductsSlider from "../../COMPONENTS/Product/ProductsSlider";
import { Context } from "../../App";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [cookies] = useCookies(["token", "status"]);
  const { token } = useContext(Context);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  // console.log(cookies.get("token"));

  const splitImages = (data) => {
    let productData = data;
    productData.forEach((item) => {
      let count = 0;
      // console.log(item);
      let s = String(item.images);
      const news = s.split(",");
      // console.log(news);
      let imgs = [];
      news.forEach((img) => {
        imgs.push({ image_id: count, image: img });
        count++;
      });
      item.images = imgs;
    });
    setNewProduct(productData);
    // console.log(productData);
  };
  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/home", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_id: 1,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        console.log(data.products);
        setNewProduct(data.products);
        setCategories(data.categories);
        splitImages(data.products);
        // console.log();
        if (cookies.status === "123") {
          localStorage.setItem("cart", JSON.stringify(data.cartProducts));
          let cart = JSON.parse(localStorage.getItem("cart"));
          console.log(cart, data.cartProducts);
        }
      }
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };
  console.log("token" + cookies.token);
  console.log("status" + cookies.status);
  useEffect(() => {
    fetchProduct();
    window.scroll(0, 0);
  }, []);

  const filterProducts = (product) => {
    if (product.length === 0) {
      fetchProduct();
    } else {
      let data = newProduct.filter((e) => {
        return e.product_name.toLowerCase().includes(product.toLowerCase());
      });
      console.log(data);
      setNewProduct(data);
    }
  };
  // const filterCategory = (category) => {

  //   // let data = newProduct.filter((e) =>{
  //   //   return e.ca.toLowerCase().includes(category.toLowerCase())
  //   // })
  //   console.log(category);
  //   // setNewProduct(data);
  //   }
  // }
  // console.log(cookies.status);
  // if(cookies.status!=="123"){
  //   console.log(token===123);
  //   navigate('/login')
  // }
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  return (
    <div>
      <Navbar reloadnavbar={true} searchProduct={filterProducts} />
      {/* <BannerSlider /> */}
      {/* {console.log(newProduct)} */}
      <ProductSidebar products={newProduct} categories={categories} />
      {/* {newProduct.length===0 && <h1>unable to fetch data</h1>} */}
      {/* <Footer1 /> */}

      <div className="slidercont">
        <ProductsSlider products={newProduct} categoryname="Related Products" />
      </div>
      <div className="slidercont">
        <ProductsSlider products={newProduct} categoryname="Explore More" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
