import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo_phone_home.svg";
import menu from "../../assets/images/menu_open_phone.svg";
import logo_poligon_phone from "../../assets/images/logo_poligon_phone.svg";
import logoApp from "../../assets/images/logo_phone_app.svg";
import useOutsideClick from "@rooks/use-outside-click";

import { RobotPhone } from "../RobotPhone/RobotPhone";
import roborApp from "../../assets/images/Robot_app.png";
import line_for_menu_phone from "../../assets/images/line_for_menu_phone.svg";

import {
  handleHowItWorks,
  handlePayoutSructure,
  handleTokenAndGovernance,
  handleIWantTheSameDApp,
  handleDisclaimer,
} from "store/reducers/navigate/navigate";
import "./HeaderPhone.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";


let classNames = require("classnames");

export const HeaderPhone = () => {
  const dispatch = useDispatch();
  const {
    togleHowItWorks,
    toglePayoutSructure,
    togleTokenAndGovernance,
    togleIWantTheSameDApp,
    togleDisclaimer,
  } = useSelector((state) => state.navigate);

  const [togleMenu, setTogleMenu] = useState(false);
  const [togleButton, setTogleButton] = useState("/");

  const handleMenu = () => {
    setTogleMenu(!togleMenu);
  };

  useEffect(() => {
    if(togleHowItWorks ||
      toglePayoutSructure ||
      togleTokenAndGovernance ||
      togleIWantTheSameDApp ||
      togleDisclaimer) {
        setTogleMenu(false);
      }
   
  }, [togleHowItWorks,
    toglePayoutSructure,
    togleTokenAndGovernance,
    togleIWantTheSameDApp,
    togleDisclaimer,]);

  const pRef = useRef();
  function outsidePClick() {
    setTogleMenu(false);
  }
  useOutsideClick(pRef, outsidePClick);

  const location = useLocation();

  useEffect(() => {
    setTogleButton(location.pathname);
    if(location.pathname === "/app") {
      handleHowItWorks(false);
      handlePayoutSructure (false);
      handleTokenAndGovernance (false);
      handleIWantTheSameDApp (false);
      handleDisclaimer (false);
    }   
  }, [location.pathname]);

  useEffect(() => {
   
    if(togleButton !== "/") {
      dispatch(handleHowItWorks(false))
      dispatch(handleHowItWorks(false));
      dispatch(handlePayoutSructure (false));
      dispatch(handleTokenAndGovernance (false));
      dispatch(handleIWantTheSameDApp (false));
      dispatch(handleDisclaimer (false));
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
    <div className="header-phone">
     
      <nav className="header-phone__nav">
        <Link to="/" className="header-phone__logo">
          {togleButton === "/" && <img src={logo} alt="SMART lottery" />}
          {togleButton !== "/" && (
            <img
              src={logoApp}
              alt="SMART lottery"
              className="header-phone__logoApp"
            />
          )}
        </Link>

          <img
            src={logo_poligon_phone}
            alt="Polygon"
            className="header-phone__logo-poligon"
          />

        <div ref={pRef} 
        className={classNames("header-phone__menu", {
          "header-phone__menu-home": togleButton === "/",
          "header-phone__menu-other": togleButton === "/governance" ||  togleButton === "/partners",
        })}>
          <div className="header-phone__buttom-menu" onClick={handleMenu}>
            <img src={menu} alt="menu" />
          </div>
          {togleMenu && (
            <ul className="header-phone__menu-item">
              <li
                className={classNames("header-phone__link", {
                  "header-phone__link-active": togleHowItWorks,
                })}
                onClick={() => dispatch(handleHowItWorks(true))}
              >
                <Link to="/"> How It Works </Link>
              </li>
              <li
                className={classNames("header-phone__link", {
                  "header-phone__link-active": toglePayoutSructure,
                })}
                onClick={() => dispatch(handlePayoutSructure(true))}
              >
                <Link to="/"> Payout structure </Link>
              </li>
              <li
                className={classNames("header-phone__link", {
                  "header-phone__link-active": togleTokenAndGovernance,
                })}
                onClick={() => dispatch(handleTokenAndGovernance(true))}
              >
                <Link to="/"> Token and Governance </Link>
              </li>
              <li
                className={classNames("header-phone__link", {
                  "header-phone__link-active": togleIWantTheSameDApp,
                })}
                onClick={() => dispatch(handleIWantTheSameDApp(true))}
              >
                <Link to="/">I want the same DApp!</Link>
              </li>
              <li
                className={classNames("header-phone__link", {
                  "header-phone__link-active": togleDisclaimer,
                })}
                onClick={() => dispatch(handleDisclaimer(true))}
              >
                <Link to="/"> Disclaimer </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Outlet />
      {togleButton === "/" && (
        <>
          <div className="header-phone__roborHome">
            <RobotPhone />
          </div>

          <div className="header-phone__text">
          <p>
            Transparent and fair lottery <br></br> 
            on smart contract <br></br> 
            that you can understand 
          </p>
          <p>
            Higher payouts than in traditional lotteries
          </p>
          <p>
           Fully decentralized <br></br> and controlled by community
          </p>
        </div>
          <div>
            <Link to="/app" className="header-phone__button">
              Launch App
            </Link>
            <img
            src={logo_poligon_phone}
            alt="Polygon"
            className="header-phone__button-poligon"
          />
          </div>
        </>
      )}

   
   
        {togleButton === "/app" && (
          <img className="header-phone__roborApp" src={roborApp} alt="robot" />
          )}

           {togleButton !== "/" && (
          <div>
            {
              togleButton !== "/app" && (
                <img className="header-phone__line" src={line_for_menu_phone} alt="robot" />
              )

            }
            
            <button 
           onClick={onClick} disabled={loading}
              className={classNames("header-phone__button header-phone__button-connect", {
                  "header-phone__button-connect-other": togleButton !== "/app",
                })}
                >
              {loading ? "Loading..." : label}
            </button>
          </div>
     )}
  
    </div>
  );
};
