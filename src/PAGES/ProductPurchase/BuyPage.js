import React, { useState, useEffect } from "react";
import SingleBanner from "../../COMPONENTS/Banners/SingleBanner";
import Footer1 from "../../COMPONENTS/Footer/Footer1";
import Footer2 from "../../COMPONENTS/Footer/Footer";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import poster from "../../ASSETS/poster.jpg";
import "./BuyPage.css";
import "./Progress.css";
import "./Container.css";
import "./ShippingContainer.css";
import "./PaymentContainer.css";
import "./OrderSucessfull.css";
import { useRecoilState } from "recoil";
import { orderSuccessfulProvider } from "../../Providers/OrderSuccessfulProvider";
import OrderSuccessful from "../../COMPONENTS/Order/OrderSuccessful";
import { useParams } from "react-router-dom";
const BuyPage = () => {
  const params = useParams();
  const prodid = params.prodid;
  // let products = [];
  const [quantity,setQuantity] = useState(parseInt(params.quantity))
  const [product, setProduct] = useState();
  const [buyQuantity, setBuyQuantity] = useState(parseInt(params.quantity));
  const [subtotal, setsubtotal] = useState(0);
  const [shipping, setshipping] = useState(0);
  const [active, setactive] = useState(1);
  const [tax, settax] = useState(0);
  const [deliverydate, setdeliverydate] = useState(
    new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]
  );
  const [savedaddress,setSavedaddress] = useState([]);
  const [street1, setStreet1] = useState();
  const [street2, setStreet2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [orderAddressId,setOrderAddressId] = useState(-1);
  
  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product/${prodid}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_id: 1,
        },
      });
      const data = await response.json();
      console.log(data.product);
      setProduct(data.product);
      console.log(product);
      let tempsubtotal = 0;
      if (product !== undefined) {
        tempsubtotal = product.price * buyQuantity;
      }
      // console.log(tempsubtotal)
      setsubtotal(tempsubtotal);
      setshipping(40);
      settax(tempsubtotal * 0.18 + 80 * 0.1);
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  };

  // {active==1 && fetchProduct()}
  useEffect(() => {
    fetchProduct();
    window.scroll(0, 0);
  }, []);

  const checklogin = () => {
    return true;
  };

  const [reloadnavbar, setreloadnavbar] = useState(false);

  const getSavedAddress = () => {
    console.log("called address");
    fetchSavedAddress();
  } 
  
  const fetchSavedAddress = async() =>{
    try {
      const response = await fetch(`/api/address`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_id: 1,
        },
      });
      const data = await response.json();
      console.log(data);
      setSavedaddress(data.address);
      if(data.success===true){
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postAddress = async (street1,street2,city,zip) => {
    try {
      const response = await fetch("/api/address/new", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_id: 1,
        },
        body: JSON.stringify({
          street1: street1,
          street2: street2,
          city: city,
          zipcode: zip,
        }),
      });

      if (!response.ok) {
        throw new Error("failed to upload your Address");
      }
      const data = await response.json();
      console.log(data);
      console.log("Address uploaded:", data.success);
      if (data.success === true) {
        // let currentAddress = savedaddress;
        // currentAddress.push()
      }
    } catch (error) {
      console.error("Error upload address:", error);
    }
  };
  const saveAddress = () => {
    postAddress(street1,street2,city,zip);
  };
  const [selectedorderid, setselectedorderid] = useState(0);
  const [ordersuccesscont, setordersuccesscont] = useRecoilState(
    orderSuccessfulProvider
  );
  
  const checkAddressSelected = ()=>{
    if(orderAddressId===-1){
      alert("Please Select Deliver address");
      setactive(2);
    }
    else{
      setactive(3);
    }
  }

  // const addressId = 1;
  const postOrder = async() => {
    let orderProducts = {};
    orderProducts[product.product_id]=quantity;
    try {
      const response = await fetch("/api/order/new", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_id: 1,
        },
        body: JSON.stringify({
          address_id:orderAddressId,
          shipping_price:shipping,
          orderProducts:orderProducts
        }),
      });
      if (!response.ok) {
        throw new Error("failed to upload Order data");
      }
      const data = await response.json();
      console.log("Data uploaded:", data.success);
      if (data.success === true) {
        setactive(4);
      }
      else{
        alert("Error while Ordering please retry..");
      }
    } catch (error) {
      alert("Error while Ordering please retry..");
      console.error("Error, while ordering:", error);
    }
  }
  const sendOrder = () => {
    postOrder();
    console.log("order Successfull");
  }

  return (
    <div>
      <Navbar reloadnavbar={reloadnavbar} />
      {ordersuccesscont && (
        <OrderSuccessful
          orderid={selectedorderid}
          message={`Order Placed Successfully, Order ID: ${selectedorderid}`}
          redirecto="userorders"
        />
      )}
      <SingleBanner heading="Happy Buying" bannerimage={poster} />
      <div className="cart">
        <div className="progress">
          {active == 1 ? (
            <div
              className="c11"
              onClick={() => {
                product !== undefined && checklogin() && setactive(1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span>Summary</span>
            </div>
          ) : (
            <div
              className="c1"
              onClick={() => {
                product !== undefined && checklogin() && setactive(1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span>My Product</span>
            </div>
          )}

          {active == 2 ? (
            <div
              className="c11"
              onClick={() => {
                product !== undefined && checklogin() && setactive(2);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              <span>Shipping</span>
            </div>
          ) : (
            <div
              className="c1"
              onClick={() => {
                product !== undefined && checklogin() && setactive(2);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              <span>Shipping</span>
            </div>
          )}

          {active == 3 ? (
            <div
              className="c11"
              onClick={() => {
                product !== undefined && checklogin() && setactive(3);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>

              <span>Payment</span>
            </div>
          ) : (
            <div
              className="c1"
              onClick={() => {
                product !== undefined && checklogin() && setactive(3);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>

              <span>Payment</span>
            </div>
          )}
          {active == 4 ? (
            <div
              className="c11"
              onClick={() => {
                product !== undefined && checklogin() && setactive(4);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>

              <span>Success</span>
            </div>
          ) : (
            <div
              className="c1"
              onClick={() => {
                product !== undefined && checklogin() && setactive(4);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>

              <span>Success</span>
            </div>
          )}
        </div>

        {active == 1 && (
          <div className="cartcont">
            {/* <p>{product.name}</p> */}
            {product !== undefined ? (
              <table className="carttable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    {/* <th>Remove</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* {cartdata.map((item, index) => {
                    return ( */}
                  <tr key={1} className="cartitemrow">
                    <td data-label="Product">
                      <div
                        className="cartproduct"
                        onClick={() => {
                          window.location.href = `/product/${product.ProductId}`;
                        }}
                      >
                        <img
                          src={`https://res.cloudinary.com/dqzedyrjd/image/upload/${product.images}.jpg`}
                          alt={product.product_name}
                        />
                        <p>{product.ProductName}</p>
                      </div>
                    </td>

                    <td data-label="Quantity">
                      <div className="quantity">
                        <button
                          className="minus"
                          onClick={() => {
                            // let newcartdata = [...cartdata]

                            if (buyQuantity > 1) {
                              setBuyQuantity(buyQuantity - 1);
                            }
                          }}
                        >
                          -
                        </button>
                        <span>{buyQuantity}</span>
                        <button
                          className="plus"
                          onClick={() => {
                            setBuyQuantity(buyQuantity + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td data-label="Price">
                      <p>₹ {product.price ? product.price.toFixed(2) : 0.0}</p>
                    </td>

                    <td>
                      <p>₹ {(product.price * buyQuantity).toFixed(2)}</p>
                    </td>

                    {/* <td
                              data-label="Remove"
                            >
                              <div className='delbtn'
                                onClick={() => {
                                  removeitemfromcart(index)
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                              </div>
                            </td> */}
                  </tr>
                  {/* );
                  })} */}

                  <tr>
                    <td></td>
                    <td></td>
                    <td className="totaltableleft">Sub-Total</td>
                    <td className="totaltableright">₹ {subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="totaltableleft">Shipping</td>
                    <td className="totaltableright">₹ {shipping.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="totaltableleft">Total</td>
                    <td className="totaltableright">
                      ₹ {(subtotal + shipping).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="totaltableleft">Tax</td>
                    <td className="totaltableright">₹ {tax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="totaltableleft">Net-Total</td>
                    <td className="totaltableright">
                      ₹ {(tax + subtotal + shipping).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="emptycart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <p>Your cart is empty</p>
              </div>
            )}
          </div>
        )}

        {active == 2 && (
          <div className="shippingcont">
            <div className="selectdate">
              <h2 className="mainhead1">Select Delivery Date</h2>
              <input
                min={
                  new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                type="date"
                value={deliverydate}
                onChange={(e) => {
                  setdeliverydate(e.target.value);
                }}
              />
            </div>
            <div className="previous">
              <h2 className="mainhead1">Previous Saved Address</h2>
              {savedaddress.length > 0 ? (
                savedaddress.map((item, index) => {
                  return (
                    <div className="radio" key={index}>
                      <input type="radio" name="address" id={index} onClick={()=>{setOrderAddressId(item.address_id)}} />
                      <span>
                        {item.street1!=null && item.street1} 
                          ,  
                          {item.street2!=null && item.street2} 
                          ,  
                          {item.city!=null && item.city} 
                          ,  
                          {item.zipcode!=null && item.zipcode}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="emptyaddress">
                  <p>No address Found</p>
                </div>
              )}
            </div>
            <h3>OR</h3>
            <div className="shippingadd">
              <input
                type="text"
                placeholder="Street-1"
                onChange={(e) => {
                  setStreet1(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Street-2"
                onChange={(e) => {
                  setStreet2(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Postal Code"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
              <button onClick={()=>{saveAddress()}}>Save</button>
            </div>
          </div>
        )}
        {active == 3 && (
          <div className="paymentcont">
            <h2 className="mainhead1">Select Payment Method</h2>
            <div className="paymenttypes">
              <div className="c1">
                <input type="radio" name="payment" id="payment1" />
                <img
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                  alt="paypal"
                />
              </div>
              <div className="c1">
                <input type="radio" name="payment" id="payment1" />
                <img
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                  alt="paypal"
                />
              </div>
              <div className="c1">
                <input type="radio" name="payment" id="payment1" />
                <img
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                  alt="paypal"
                />
              </div>
            </div>

            <div className="paymentagreement">
              <input type="checkbox" name="agreement" id="agreement" />
              <label htmlFor="agreement">
                I agree to the terms and conditions
              </label>
            </div>

            <div className="c2">
              <span>Net Total</span>
              &nbsp;&nbsp;
              <span>₹ {(subtotal + tax + shipping).toFixed(2)}</span>
            </div>
          </div>
        )}
        {active == 4 && (
          <div className="ordersuccessfull">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>

            <h2 className="mainhead1">Order Placed Successfully</h2>
            <p>Thank you for shopping with us</p>
            <span>Order ID : 12345</span>
          </div>
        )}

        {/* CART BUTTONS */}
        {active == 1 &&  (
          <div className="btns">
            <button
              className="nextbtn"
              onClick={() => {
                checklogin() && setactive(2) ;
                getSavedAddress();
              }}
            >
              Next
            </button>
          </div>
        )}

        {active == 2 && (
          <div className="btns">
            <button
              className="backbtn"
              onClick={() => {
                checklogin() && setactive(1);
              }}
            >
              Back
            </button>
            <button
              className="nextbtn"
              onClick={() => {
                checklogin() && setactive(3);
                checkAddressSelected();
              }}
            >
              Next
            </button>
          </div>
        )}

        {active == 3 && (
          <div className="btns">
            <button
              className="backbtn"
              onClick={() => {
                checklogin() && setactive(2);
                setOrderAddressId(-1);
              }}
            >
              Back
            </button>
            <button
              className="nextbtn"
              onClick={() => {
                checklogin() && sendOrder() ;
                // sendOrder()
              }}
            >
              Next
            </button>
          </div>
        )}
        {active == 4 && (
          <div className="btns">
            {/* <button className='backbtn'
              onClick={() => {
                checklogin() && setactive(3)
              }}
            >Back</button> */}
            <button
              className="nextbtn"
              onClick={() => {
                setselectedorderid(12345);
                setordersuccesscont(true);
              }}
            >
              View Invoice
            </button>
          </div>
        )}
      </div>
      <Footer1 />
      <Footer2 />
    </div>
  );
};

export default BuyPage;
