import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../index.scss";
import { MainQuestions } from "../components/MainQuestions/MainQuestions.jsx";
import { RobotDesign } from "../components/RobotDesign/RobotDesign";
import { RobotDesktop } from "../components/RobotDesktop/RobotDesktop";
import { NextJackpotHome } from "../components/NextJackpotHome/NextJackpotHome";
import { SmartLotteryABI } from "../abi/abi";
import {  useLocation } from "react-router-dom";
import { useSigner  } from "wagmi";
import Web3 from "web3";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const Home = () => {
  const { data } = useSigner();
  const [dataLottery, setData] = useState({
    balance: "",
    ticketPrice: "",
  });
  const [exchangeRate, setExchangeRate] = useState(null);
  const { balance, ticketPrice } = dataLottery;
  const location = useLocation();

  useEffect(() => {
    const unspecifiedData = data;
    async function fetchData() {
      const web3 = new Web3(unspecifiedData?.provider?.provider);
      const lottery = new web3.eth.Contract(SmartLotteryABI, contractAddress);
      const balance = await web3.eth.getBalance(lottery.options.address);
      const ticketPrice = await lottery.methods.EntryTicket().call();
      const exchangeRate = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT`
      );
      setExchangeRate(exchangeRate.data.price);
     
      setData({
        ...dataLottery,
        balance: balance,
        ticketPrice: ticketPrice,
       
      });
    }
    fetchData();
  }, [data]);

  useEffect(() => {
    if(location.search !== "") {
      localStorage.setItem('partnerAddress', JSON.stringify(location.search));
    }
   }, [location]);



  useEffect(() => {
   let intervalId = setInterval(() => {
    async function fetchData() {
      const exchangeRate = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT`
      );
      setExchangeRate(exchangeRate.data.price);
    };
    fetchData();
  }, 20000);

  return () => {
    clearInterval(intervalId);
  };
  }, []);
  

  return (
    <div className="page">
      <div className="page__robot-design">
        <RobotDesign />
      </div>
      <div className="page__robot-desktop">
        <RobotDesktop />
      </div>
      <NextJackpotHome 
      balance={balance}  
      exchangeRate={exchangeRate}
      ticketPrice={ticketPrice} 
      />
     
      <div>
        <MainQuestions exchangeRate={exchangeRate} balance={balance} />
      </div>
    </div>
  );
};
