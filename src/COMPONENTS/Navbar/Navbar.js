import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { useCookies } from "react-cookie";
const Navbar = ({ reloadnavbar, searchProduct }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { token, addToken } = useContext(Context);
  const [cartquantity, setcartquantity] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  // {console.log(searchItem)}
  const getcarttotalitems = () => {
    // console.log(cart);
    if (cookies.status === "123") {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        let total = 0;
        cart.forEach((item) => {
          total += item.quantity;
        });
        setcartquantity(total);
      }
    } 
  };

  useEffect(() => {
    getcarttotalitems();
  }, []);

  const search = () => {
    searchProduct(searchItem);
  };
  const logout = async () => {
    try {
      const response = await fetch(`/api/logout`, {
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
        setCookie("status", null);
        removeCookie("token");
        localStorage.removeItem("cart");
        addToken();
        // navigate("/login")
      }
    } catch (error) {
      console.log("error while logging out:", error);
    }
    console.log("logout");
  };

  const [shows3, setshows3] = useState(false);
  return (
    <nav>
      <div className="s1">
        <Link to="/">
          <img
            src={require("../../ASSETS/icon_150.png")}
            alt="logo"
            className="logo"
            onClick={()=>{search("")}}
          />
        </Link>

        <div className="searchbar">
          <input
            typ="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search for products and categries"
            className="search"
          />

          <button
            onClick={() => {
              search();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <div className="right">
          <div className="s2">
            <Link to="/about">
              <a>About Us</a>
            </Link>
            <Link to="/contact">
              <a>Contact Us</a>
            </Link>
          </div>
          <div className="cart">
            <span className="qty">{cartquantity}</span>
            <Link to="/cart" className="stylenone">
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
            </Link>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/user/accountsettings">
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="/myOrders">MyOrders</Dropdown.Item>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/signup">Signup</Dropdown.Item>
              <Dropdown.Item
                href="/login"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {shows3 ? (
        <div className="s3">
          <div className="s31">
            <img
              src={require("../../ASSETS/icon_150.png")}
              alt="logo"
              className="logo"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setshows3(!shows3)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="searchbar">
            <input
              typ="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search for products and categries"
              className="search"
            />

            <button
              onClick={() => {
                search();
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          {/*search ='categoris'
                        {"dipasnu.com/product/catoriges/1"} */}
          <ul className="s32">
            <li>
              {" "}
              <Link to="/about" className="stylenone">
                <a>About Us</a>
              </Link>
            </li>

            <li>
              {" "}
              <Link to="/contact" className="stylenone">
                <a>Contact Us</a>
              </Link>
            </li>

            <li>
              <div className="cart">
                <span className="qty">{cartquantity}</span>
                <Link to="/cart" className="stylenone">
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
                </Link>
              </div>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/myOrders">MyOrders</Dropdown.Item>
                  <Dropdown.Item href="/login">Login</Dropdown.Item>
                  <Dropdown.Item href="/signup">Signup</Dropdown.Item>
                  <Dropdown.Item href="/user/accountsettings">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      ) : (
        <div className="s3">
          <div className="s31">
            <Link to="/">
              <img
                src={require("../../ASSETS/icon_150.png")}
                alt="logo"
                className="logo"
              />
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setshows3(!shows3)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
