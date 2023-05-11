import React from "react";
import { useState } from "react";
import Logo from "../../assets/images/Logo_popup_connect.svg";
import Logo_polygon from "../../assets/images/logo_poligon_phone.svg";
import "./PopupPleaseConnect.scss";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

export const PopupPleaseConnect = () => {
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
    <>
      <div className="popup-connect">
        <img src={Logo} alt="SmartLottery" className="popup-connect__logo" />

        <img
          src={Logo_polygon}
          alt="SmartLottery"
          className="popup-connect__logo-poligon"
        />

        <div className="popup-connect__text">
          <p className="popup-connect__text-item">Please connect your wallet</p>
          <p className="popup-connect__text-item">
            In order to get the latest data and be able to interact with the
            app, please connect your web3 wallet like{" "}
            <a className="popup-connect__link" href="https://metamask.io/">
              MetaMask{" "}
            </a>{" "}
            or other
          </p>
        </div>
        <button
          onClick={onClick}
          disabled={loading}
          className="popup-connect__button"
        >
          {loading ? "Loading..." : label}
        </button>
      </div>
    </>
  );
};
