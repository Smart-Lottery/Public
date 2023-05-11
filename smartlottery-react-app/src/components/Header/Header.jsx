import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo_small.svg";
import logo_poligon from "../../assets/images/poligon_desktop.png";
import { useDispatch, useSelector } from "react-redux";
import {
  handleHowItWorks,
  handlePayoutSructure,
  handleTokenAndGovernance,
  handleIWantTheSameDApp,
  handleDisclaimer,
} from "store/reducers/navigate/navigate";

import "./Header.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
// import { polygonMumbai } from 'wagmi/chains';


let classNames = require("classnames");

export const Header = () => {


  const dispatch = useDispatch();
  const {
    togleHowItWorks,
    toglePayoutSructure,
    togleTokenAndGovernance,
    togleIWantTheSameDApp,
    togleDisclaimer,
  } = useSelector((state) => state.navigate);
  const [togleButton, setTogleButton] = useState("/");

  const location = useLocation();
  useEffect(() => {
    setTogleButton(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (togleButton !== "/") {
      dispatch(handleHowItWorks(false));
      dispatch(handleHowItWorks(false));
      dispatch(handlePayoutSructure(false));
      dispatch(handleTokenAndGovernance(false));
      dispatch(handleIWantTheSameDApp(false));
      dispatch(handleDisclaimer(false));
    }
  }, [togleButton]);

  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect" : "Connect Wallet";

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();    
    }
  }

  return (
    <div className="header">
      <nav className="header__nav">
        {togleButton !== "/" && (
          <Link to="/" className="header__logo">
            <img src={logo} alt="SMART lottery" />
          </Link>
        )}
        <ul className="header_menu">
          <li
            className={classNames("header__link", {
              "header__link-active": togleHowItWorks,
              "header__link-home": togleButton === "/",
            })}
            onClick={() => dispatch(handleHowItWorks(true))}
          >
            <Link to="/"> How It Works</Link>
          </li>
          <li
            className={classNames("header__link", {
              "header__link-active": toglePayoutSructure,
              "header__link-home": togleButton === "/",
            })}
            onClick={() => dispatch(handlePayoutSructure(true))}
          >
            <Link to="/"> Payout structure</Link>
          </li>
          <li
            className={classNames("header__link", {
              "header__link-active": togleTokenAndGovernance,
              "header__link-home": togleButton === "/",
            })}
            onClick={() => dispatch(handleTokenAndGovernance(true))}
          >
            <Link to="/"> Token and Governance</Link>
          </li>
          <li
            className={classNames("header__link", {
              "header__link-active": togleIWantTheSameDApp,
              "header__link-home": togleButton === "/",
            })}
            onClick={() => dispatch(handleIWantTheSameDApp(true))}
          >
            <Link to="/"> I want the same DApp!</Link>
          </li>
          <li
            className={classNames("header__link", {
              "header__link-active": togleDisclaimer,
              "header__link-home": togleButton === "/",
            })}
            onClick={() => dispatch(handleDisclaimer(true))}
          >
            <Link to="/">Disclaimer</Link>
          </li>
        </ul>
        {togleButton !== "/" && (
         
            <button
              onClick={onClick}
              disabled={loading}
              className="header__button header__button-connect"
              icon="show"
            >
              {loading ? "Loading..." : label}
            </button>

           
        )}
        {togleButton === "/" && (
          <>
            {" "}
            <Link to="/app" className="header__button header__button-launch">
              Launch App
            </Link>
            <img src={logo_poligon} alt="" className="header__logo-polygon" />
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
};
