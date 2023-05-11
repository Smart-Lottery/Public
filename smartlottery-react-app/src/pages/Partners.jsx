import React, {useEffect, useState, useRef} from "react";
import "../index.scss";
import { PartnersList } from '../components/PartnersList/PartnersList';
import Web3 from "web3";
import { SmartLotteryABI } from "../abi/abi";
import { useAccount, useSigner  } from "wagmi";
import useOutsideClick from "@rooks/use-outside-click";
import { Popup } from "../components/Popup/Popup";

export const Partners = () =>  {
  const { data } = useSigner();
  const[ web3, setWeb3 ] = useState();
  const[ lottery, setLottery ] = useState();
  const { isConnected } = useAccount();
  const[ message, setMessage ] = useState("");
  const pRef = useRef();
  
  const [changePopup, setChangePopup] = useState(false);
  function outsidePClick() {
      setChangePopup(false);
      setMessage("");
    }
    useOutsideClick(pRef, outsidePClick);
  
    useEffect(() => {
      if (message !== "") {
        setChangePopup(true);
      }
    }, [message]);
  
  
  useEffect(() => {
    const unspecifiedData = data;
    async function fetchData() {
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const web3 = new Web3(unspecifiedData?.provider?.provider);
    const lottery = new web3.eth.Contract(SmartLotteryABI, contractAddress);
      setWeb3(web3);
      setLottery(lottery);
  }
    fetchData();

}, [data, isConnected]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const withdraw = async (checkRound) => {
    setMessage( "Waiting on transaction success..." );
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.withdrawStakersFees(checkRound).send({
        from: accounts[0],
      });

      setMessage("You have been paid out!" );
    } catch (error) {
      setMessage(error.message);
    }
  }  
     
    return (
      <div className='page'>
      <PartnersList 
      withdraw={withdraw}
      />
       {changePopup && (
            <div>
              <Popup message={message} pRef={pRef} />
            </div>
          )}
    </div>


    );
  }