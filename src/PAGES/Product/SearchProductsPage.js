import React, { useEffect, useState } from "react";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import { useParams } from "react-router-dom";
import AllProduct from "../../COMPONENTS/Product/AllProduct";

export const SearchProductsPage = () => {
  const params = useParams();
  const searchItem = params.filter;
  const [products, setProducts] = useState({});
  const fetchProduct = async () => {
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
      setProducts(data.products)
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };
  useEffect(()=>{
    fetchProduct();
  },[])
  return (
    <div>
      <Navbar />
      {products.length > 0 && <AllProduct products={products} />}
    </div>
  );
};
