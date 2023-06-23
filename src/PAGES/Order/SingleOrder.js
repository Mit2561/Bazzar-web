import React, { useEffect, useState } from "react";
import Navbar from "../../COMPONENTS/Navbar/Navbar.js";
import { useParams } from "react-router-dom";
import "./SingleOrder.css";

export const SingleOrder = () => {
  const params = useParams();
  const orderId = params.orderid;
  // console.log(orderId);
  const [order, setOrder] = useState(null);
  // const order = {
  //   order_id: 15,
  //   buyer_id: 4,
  //   address_id: 1,
  //   total_price: 114500,
  //   shipping_price: 50,
  //   order_date: "2023-06-04T13:41:45.000Z",
  //   shipping_date: null,
  //   delievered_date: "2023-06-04T13:41:45.000Z",
  //   order_status: 0,
  //   address: {
  //     city: "Indore",
  //     street1: "Murai Mohalla",
  //     street2: null,
  //     zipcode: 45120,
  //     address_id: 1,
  //   },
  //   products: [
  //     {
  //       price: 14500,
  //       images: "smartphone001",
  //       quantity: 1,
  //       product_id: 1,
  //       product_name: "Samsung Galaxy M33 5G",
  //     },
  //     {
  //       price: 100000,
  //       images: "smartphone001",
  //       quantity: 1,
  //       product_id: 4,
  //       product_name: "Nokia C12",
  //     },
  //   ],
  // };

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_id: 1,
        },
      });
      const data = await response.json();
      console.log(data);
      setOrder(data.order);
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
    // order
  }, []);
  // let statusValue = [];
  // for (let index = 1; index <= order.order_status; index++) {
  //   statusValue.push(index);
  // }
  return (
    <div>
      <Navbar />
      {order !== null && (
        <div className="mainContainer">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "32px" }}>Order Receipt</p>
            {/* <p>Order ID:</p>
          <p>{order.order_id}</p> */}
          </div>
          <div className="orderDetails">
            <div className="dateContainer">
              <div className="dateHeader">
                <p>Date</p>
              </div>
              <div className="dateValue">
                <p>Order Date: </p>
                <p>{order.order_date.split("T")[0]}</p>
              </div>
              {order.shipping_date !== null && (
                <div className="dateValue">
                  <p>Shipping Date: </p>
                  <p>{order.shipping_date.split("T")[0]}</p>
                </div>
              )}
              {order.delievered_date !== null && (
                <div className="dateValue">
                  <p>Delievered Date: </p>
                  <p>{order.delievered_date.split("T")[0]}</p>
                </div>
              )}
            </div>
            {/* <div>
            <div>
              <p>Order Id</p>
            </div>
            <div>
              <p>{order.order_id}</p>
            </div>
          </div> */}
          </div>
          <div className="productinfo">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((item) => {
                  return (
                    <tr className="productRow">
                      <td>
                        <div
                          onClick={() => {
                            window.location.href = `/product/${item.product_id}`;
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={`https://res.cloudinary.com/dqzedyrjd/image/upload/${item.images}.jpg`}
                            alt={item.product_name}
                          />
                          <p className="productname">{item.product_name}</p>
                        </div>
                      </td>
                      <td>
                        <p>{item.quantity}</p>
                      </td>
                      <td>
                        <p>{item.price}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="orderSummaryContainer">
            <div className="addressContainer">
              <div className="addressHeader">
                <p>Address</p>
              </div>
              <div className="addressValue">
                <p>
                  {order.address.street1}
                  {order.address.street2}
                </p>
                <p>{order.address.city}</p>
                <p>PinCode: {order.address.zipcode}</p>
              </div>
            </div>
            <div>
              <div className="summaryData">
                <p className="summaryTag">Total Price:</p>
                <p className="summaryValue">{order.total_price}</p>
              </div>
              <div className="summaryData">
                <p className="summaryTag">Shipping Cost:</p>
                <p className="summaryValue">{order.shipping_price}</p>
              </div>
              <div className="summaryData">
                <p className="summaryTag">Total Cost:</p>
                <p className="summaryValue">
                  {order.shipping_price + order.total_price}
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "32px" }}>Order Status</p>
          </div>
          <div className="statusContainer">
            {order.order_status !== 0 && (
              <>
                <div className="statusTag">
                  <div>
                    <p>Placed</p>
                    {order.order_status >= 1 && (
                      <img
                        src={require("../../ASSETS/checkmark.png")}
                        alt="Done"
                      />
                    )}
                  </div>
                  <div>
                    <p>Shipped</p>
                    {order.order_status >= 2 && (
                      <img
                        src={require("../../ASSETS/checkmark.png")}
                        alt="Done"
                      />
                    )}
                  </div>
                  <div>
                    <p>Delievered</p>
                    {order.order_status >= 3 && (
                      <img
                        src={require("../../ASSETS/checkmark.png")}
                        alt="Done"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
            {order.order_status === 0 && (
              <div className="cancleTag">
                <p className="cancleText">Order Cancelled</p>
              </div>
            )}
          </div>
          <div className="buttonContainer">
            {order.order_status === 1 && (
              <div
                className="button"
                onClick={() => {
                  console.log("order cancled");
                }}
              >
                Cancle order
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
