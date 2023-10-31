import React, { useContext, useEffect } from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../TokenContext/TokenContext";
import { Offline} from "react-detect-offline";

export default function Layout() {
  let { setUserToken} = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("usertoken") !== null) {
      setUserToken(localStorage.getItem("usertoken"));
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="container min-vh-100">
        <Outlet></Outlet>
      </div>
      <Offline>
        <div className="network">
          <i className="fas fa-wifi"></i>
          <span> oops you are offline</span> 
        </div>
      </Offline>

      <Footer />
    </>
  );
}
