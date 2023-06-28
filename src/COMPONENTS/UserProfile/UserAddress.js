import React, { useEffect, useState } from "react";
import "./UserAddress.css";

const UserAddress = () => {
  const [show, setShow] = React.useState(false);
  const [savedaddress, setSavedaddress] = useState([]);
  const [street1, setStreet1] = useState();
  const [street2, setStreet2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();

  const getSavedAddress = () => {
    console.log("called address");
    fetchSavedAddress();
  };

  const fetchSavedAddress = async () => {
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
      if (data.success === true) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postAddress = async (street1, street2, city, zip) => {
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
    postAddress(street1, street2, city, zip);
  };

  useEffect(() => {
    getSavedAddress();
  }, []);
  return (
    <div className="useraddress">
      {!show && <h1 className="mainhead1">Your Address</h1>}
      {!show && (
        <div className="addressin">
          {savedaddress.map((item, index) => {
            return (
              <div className="address" key={index}>
                <span>{item.street1 != null && item.street1}</span>,
                <span>{item.street2 != null && item.street2 + ","}</span>
                <span>{item.city != null && item.city}</span>,
                <span>{item.zipcode != null && item.zipcode}</span>
                <div className="delbtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      fill="white"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!show && (
        <div className="addnewbtn" onClick={() => setShow(true)}>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      )}
      {show && (
        <div className="addnew">
          <h1 className="mainhead1">Add New Address</h1>
          <div className="form">
            <div className="form-group">
              <label htmlFor="postalcode">Postal Code</label>
              <input
                type="number"
                placeholder="Postal Code"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressline1">Street-1</label>
              <input
                type="text"
                placeholder="Street-1"
                onChange={(e) => {
                  setStreet1(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressline2">Street-2</label>
              <input
                type="text"
                placeholder="Street-2"
                onChange={(e) => {
                  setStreet2(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressline3">City</label>
              <input
                type="text"
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
          </div>

          <button
            className="mainbutton1"
            onClick={() => {
              setShow(false);
              saveAddress();
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAddress;
