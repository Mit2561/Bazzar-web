import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../COMPONENTS/Footer/Footer";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import SingleBanner from "../../COMPONENTS/Banners/SingleBanner";
import UserSidebar from "../../COMPONENTS/UserProfile/UserSidebar";
import AccountSettings from "../../COMPONENTS/UserProfile/AccountSettings";
import poster from "../../ASSETS/poster.jpg";
import "./UserProfile.css";
import ChangePassword from "../../COMPONENTS/UserProfile/ChangePassword";
import YourOrders from "../../COMPONENTS/UserProfile/YourOrders";
import UserAddress from "../../COMPONENTS/UserProfile/UserAddress";
import LegalNotice from "../../COMPONENTS/UserProfile/LegalNotice";

const UserProfile = () => {
  const { activepage } = useParams();

  // alert(activepage)
  return (
    <div className="userprofile">
      <Navbar />
      <SingleBanner
        heading={`My Profile`}
        bannerimage={poster}
      />
      {/* UserProfile , showing {activepage}
       */}

      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "accountsettings" && <AccountSettings />}
          {activepage === "changepassword" && <ChangePassword />}
          {/* {activepage === "yourorders" && <YourOrders />} */}
          {activepage === "address" && <UserAddress />}
          {activepage === "legalnotice" && <LegalNotice />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
