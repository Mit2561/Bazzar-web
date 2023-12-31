import React, { useContext, useEffect, useState } from "react";
import BannerSlider from "../../COMPONENTS/Banners/BannerSlider";
// import HomeCategories from "../../COMPONENTS/Category/HomeCategories";
import Footer1 from "../../COMPONENTS/Footer/Footer1";
import Footer from "../../COMPONENTS/Footer/Footer";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import ProductsSlider from "../../COMPONENTS/Product/ProductsSlider";
import { Context } from "../../App";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CategorySidebar from "../../COMPONENTS/Product/CategorySidebar";
import AllProduct from "../../COMPONENTS/Product/AllProduct";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "./Home.css";
const Home = () => {
  const [cookies] = useCookies(["token", "status"]);
  const { token } = useContext(Context);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(false);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
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
    console.log("fetch");
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
      // console.log(data);
      if (data.success === true) {
        console.log(data.products);
        setNewProduct(data.products);
        setCategories(data.categories);
        splitImages(data.products);
        // console.log();
        if (cookies.status === "123") {
          localStorage.setItem("cart", JSON.stringify(data.cartProducts));
        }
      }
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
    window.scroll(0, 0);
  }, []);

  const fetchSerchProduct = async (searchItem) => {
    try {
      const response = await fetch(`/api/products/?name=${searchItem}`, {
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
        splitImages(data.products);
        setNoOfPages(Math.ceil(data.numberOfProducts / 10));
        setSearch(true);
      }
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };
  const filterProducts = (product) => {
    if (product.length > 0) {
      fetchSerchProduct(product);
    }
    else{
      fetchProduct();
      setSearch(false);
    }

  };
  const fetchCategoryProduct = async (category) => {
    try {
      const response = await fetch(`/api/products/?category=${category}`, {
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
        setNewProduct(data.products);
        splitImages(data.products);
        setNoOfPages(Math.ceil(data.numberOfProducts / 10));
        setSearch(true);
      }
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };
  const filterCategory = (category_id) => {
    if (category_id >= 0) {
      fetchCategoryProduct(category_id);
    }
  };
  
  return (
    <div>
      <Navbar reloadnavbar={true} searchProduct={filterProducts} />
      <div className="productscont">
        <CategorySidebar categories={categories} searchCategory={filterCategory} />
        {newProduct.length > 0 && <AllProduct products={newProduct} />}
      </div>

      {!search && (
        <div>
          <div className="slidercont">
            <ProductsSlider
              products={newProduct}
              categoryname="Related Products"
            />
          </div>
          <div className="slidercont">
            <ProductsSlider products={newProduct} categoryname="Explore More" />
          </div>
        </div>
      )}
      {
        search && <div className="paginationCont">
          <PaginationControl
          page={page}
          total={noOfPages}
          limit={1}
          changePage={(page) => {
            setPage(page);
          }}
        />
        </div>
      }
      <Footer />
    </div>
  );
};

export default Home;
