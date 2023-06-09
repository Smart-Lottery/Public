import React, { useState, useEffect, useRef } from "react";
import "../index.scss";
import { GovernanceList } from '../components/GovernanceList/GovernanceList';
import useOutsideClick from "@rooks/use-outside-click";
import { Popup } from "../components/Popup/Popup";
import { useSigner  } from "wagmi";
import axios from "axios";
import Web3 from "web3";
import { SmartLotteryTokenSaleABI } from "../abi/abiTokenSale";
import { SmartLotteryTokenABI } from "../abi/abiToken";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_GOVERNANCE;
const tokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS_TOKEN;

console.log("Contract Address: ", contractAddress);
console.log("Token Address: ", tokenAddress);

export const Governance = () =>  {
  const [changePopup, setChangePopup] = useState(false);
  const { data } = useSigner();
  const[web3, setWeb3 ] = useState();
  const[lotteryToken, setLotteryToken ] = useState();
  const [tokenSLT, setTokenSLT] = useState();
  const [tokenTotalSupply, setTokenTotalSupply] = useState();

  const [dataToken, setData] = useState({
      exchangeRate: "",
      tokenPrice: "",
      tokenTotalSupply: "0",
      message: ""
  });

  const { exchangeRate,  tokenPrice, message } = dataToken;

  const pRef = useRef();
  function outsidePClick() {
    setChangePopup(false);
    setData({ ...dataToken, message: "" });
  }
  useOutsideClick(pRef, outsidePClick);

  useEffect(() => {
    if (message !== "") {
      setChangePopup(true);
    }
  }, [message]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (data && data.provider) {
        const web3 = new Web3(data.provider.provider);
        setWeb3(web3);
        const lotteryToken = new web3.eth.Contract(SmartLotteryTokenSaleABI, contractAddress);
        setLotteryToken(lotteryToken);
        const tokenSLT = new web3.eth.Contract(SmartLotteryTokenABI, tokenAddress);
        setTokenSLT(tokenSLT);
  
        const exchangeRate = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT`);
        const tokenPrice = await lotteryToken.methods.tokenPrice().call();
        let tokenTotalSupply = "";  // Declare tokenTotalSupply here
  
        try {
          tokenTotalSupply = await tokenSLT.methods.totalSupply().call();  // Assign value here
          console.log("tokenTotalSupply: ", tokenTotalSupply)
        } catch (error) {
          console.error("Error getting total supply: ", error);
        }
  
        setData({
          ...dataToken,
          exchangeRate: exchangeRate.data.price,
          tokenPrice: tokenPrice,
          tokenTotalSupply: tokenTotalSupply,
        });
      }
    }
    fetchData();
  }, [data]);



  const handleBuyTokens = async (event, amount) => {
    event.preventDefault(); 
    const accounts = await web3.eth.getAccounts();
   
    setData({ ...dataToken, message: "Waiting on transaction success..." }); 
    const valueInEther = tokenPrice * amount;
      try {
        await lotteryToken.methods.buyTokens(amount).send({
          from: accounts[0],
          value: valueInEther.toString()

        });

      setData({ ...dataToken, message: "Transaction success!" });
    } catch (error) {
      setData({ ...dataToken, message: error.message });
    }
  };
     
    return (
       <div className='page'>
      <GovernanceList 
        exchangeRate={exchangeRate}
        tokenPrice={tokenPrice}
        handleBuyTokens={handleBuyTokens}
        tokenTotalSupply={dataToken.tokenTotalSupply}
      />
      {changePopup && (
            <div>
              <Popup message={dataToken.message} pRef={pRef} />
            </div>
          )}
    </div>
    );
  }
