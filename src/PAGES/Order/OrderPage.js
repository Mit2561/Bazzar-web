import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import "./CartContainer.css";
import "./Cart.css";
import { Pagination } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const OrderPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [orders, setOrders] = useState();
  const [totalOrders, setTotalOrders] = useState(0);
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders/myorders/?page=${page}`, {
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
        setTotalOrders(data.noOfOrders);
        setOrders(data.orders);
        setNoOfPages(Math.ceil(data.noOfOrders / 10));
      }
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    window.scroll(0, 0);
  }, [page]);

  //   let pages = [];
  //   const loadPageNumbers = (nopages) => {
  //     // console.log(nopages);
  //     for (let index = 1; index <= nopages; index++) {
  //       pages.push(index);
  //     }
  //     // console.log(pages);
  //   };
  //   console.log(currPage);
  console.log(page);
  const status = ["Cancelled", "Placed", "Shipped", "Delivered"];
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "12px",
        }}
      >
        <div>
          <h1>My Orders</h1>
        </div>
        <div>
          <h5>Total Orders:{totalOrders}</h5>
        </div>
      </div>
      {cookies.status !== "123" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "x-large" }}>
            Please Login to check your Orders
          </p>
          <button className="buttonlogin" onClick={()=>{navigate("/login")}}>Login</button>
        </div>
      )}
      <div className="cart">
        <div className="cartcont">
          {/* <p>Cart cont</p> */}
          {totalOrders > 0 ? (
            <table className="carttable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Order Date</th>
                  <th>Order Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => {
                  let date = item.order_date.split("T");
                  return (
                    <tr key={index} className="cartitemrow">
                      <td>
                        <p>{item.order_id}</p>
                      </td>
                      <td style={{ paddingTop: "12px" }}>
                        {item.products.map((product, product_id) => {
                          return (
                            <div
                              className="cartproduct"
                              style={{ paddingTop: "8px" }}
                              onClick={() => {
                                navigate(`/order/${item.order_id}`);
                              }}
                            >
                              <div
                                onClick={() => {
                                  window.location.href = `/product/${product.product_id}`;
                                }}
                              >
                                <img
                                  src={`https://res.cloudinary.com/dqzedyrjd/image/upload/${product.images}.jpg`}
                                  alt={product.product_name}
                                />
                              </div>
                              <p>{product.product_name}</p>
                            </div>
                          );
                        })}
                      </td>
                      <td style={{ paddingTop: "12px" }}>
                        {item.products.map((product, product_id) => {
                          return (
                            <div>
                              <p>{product.price}</p>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        <p>{date[0]}</p>
                      </td>
                      <td>
                        <p>{status[item.order_status]}</p>
                      </td>
                      <td data-label="Price">
                        <p>
                          Rs.{" "}
                          {item.total_price ? item.total_price.toFixed(2) : 0.0}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="emptycart">
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 425.832 425.833"
                xml="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M377.763,83.169l-86.238-80.33c-1.957-1.83-4.54-2.839-7.21-2.839H55.291c-5.855,0-10.597,4.742-10.597,10.59v404.647 c0,5.843,4.742,10.595,10.597,10.595H370.54c5.854,0,10.599-4.74,10.599-10.595V90.92 C381.134,87.979,379.915,85.172,377.763,83.169z M108.599,388.26c0-8.273,6.735-15.011,15.018-15.011 c8.282,0,15.012,6.737,15.012,15.011c0,8.284-6.73,15.016-15.012,15.016C115.334,403.276,108.599,396.544,108.599,388.26z M185.611,388.26c0-8.273,6.736-15.011,15.019-15.011c8.275,0,15.003,6.737,15.003,15.011c0,8.284-6.728,15.016-15.003,15.016 C192.347,403.276,185.611,396.544,185.611,388.26z M360.118,404.654l-135.527-0.131c3.152-4.641,5.007-10.238,5.007-16.258 c0-15.983-12.993-28.974-28.968-28.974c-15.981,0-28.983,12.99-28.983,28.974c0,6.003,1.839,11.574,4.972,16.214l-28.979-0.031 c3.126-4.618,4.952-10.191,4.952-16.183c0-15.983-12.994-28.974-28.975-28.974c-15.98,0-28.98,12.99-28.98,28.974 c0,5.971,1.814,11.519,4.925,16.132l-33.844-0.033l0.252-134.205L87.207,355.1h144.215l69.822-160.598h21.06 c5.79,0,10.476-4.69,10.476-10.473c0-5.782-4.686-10.471-10.476-10.471h-34.79l-69.828,160.589h-114.13l-17.453-69.821h108.77 c5.79,0,10.473-4.691,10.473-10.468c0-5.791-4.684-10.486-10.473-10.486H66.021l0.005-3.951V21.17h197.629v79.471 c0,5.844,4.738,10.585,10.583,10.585h85.88V404.654z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>

              <p>Your Order List is Empty</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <Pagination>
          <Pagination.Prev />
          {pages.map((page) => {
            return(
                <Pagination.Item active={page===currPage}>{page}</Pagination.Item>
            )
          })}

          <Pagination.Next />
        </Pagination> */}
        <PaginationControl
          page={page}
          total={noOfPages}
          limit={1}
          changePage={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};
