import React from "react";
import { useState, useEffect, useRef } from "react";
import useOutsideClick from "@rooks/use-outside-click";
import axios from "axios";
import "../index.scss";
import Web3 from "web3";
import { SmartLotteryABI } from "../abi/abi";
import { useAccount, useSigner } from "wagmi";
import { ChooseNumbers } from "../components/ChooseNumbers/ChooseNumbers";
import { NextJackpot } from "../components/NextJackpot/NextJackpot";
import { PastDrawings } from "../components/PastDrawings/PastDrawings";
import { CheckWon } from "../components/CheckWon/CheckWon";
import { Popup } from "../components/Popup/Popup";
import { PopupPleaseConnect } from "components/PopupPleaseConnect/PopupPleaseConnect";
import { MyEntries } from "../components/MyEntries/MyEntries";
import { CalculationPrize } from "../helpers/helpers";

export const LaunchApp = () => {
  const { data } = useSigner();
  const [web3, setWeb3] = useState();
  const [lottery, setLottery] = useState();

  const [datalottery, setData] = useState({
    manager: "",
    balance: "",
    numbers: [],
    SuperNumber: "",
    numberOfRoundstoEnter: 1,
    message: "",
    generatedNumbers: "",
    generatedSuperNumber: "",
    round: "",
    playerAdress: "",
    round_to_check: "",
    ticketPrice: "",
    guessedNumbers: 0,
    guessedNumbersSuper: false,
    interval: "",
    lastExecution: "",
    partnerAddress: "",
    myEntries: "",
    winners: [],
  });

  const [exchangeRate, setExchangeRate] = useState(null);
  const { isConnected } = useAccount();
  const [generatedNumbersAll, setGeneratedNumbersAll] = useState({});
  const [togleRunTheNumbers, setTogleRunTheNumbers] = useState(false);
  const [guessedArray, setGuessedArray] = useState([]);
  const [loaderCheckWon, setloaderCheckWon] = useState(false);
  const [loaderMyEntries, setLoaderMyEntries] = useState(false);
  const [loaderSearchPastDrawings, setLoaderSearchPastDrawings] =
    useState(false);
  const [changePopup, setChangePopup] = useState(false);
  const pRef = useRef();

  function outsidePClick() {
    setChangePopup(false);
    setData({ ...datalottery, message: "" });
  }
  useOutsideClick(pRef, outsidePClick);

  useEffect(() => {
    if (datalottery.message !== "") {
      setChangePopup(true);
    }
  }, [datalottery.message]);

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

  const fetchDataLottery = async () => {
    const round = await lottery.methods.round().call();
    const manager = await lottery.methods.owner().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const result = await lottery.methods.viewGeneratedNumbers(round - 1).call();
    const generatedNumbers = result[0];
    const generatedSuperNumber = result[1];
    const ticketPrice = await lottery.methods.EntryTicket().call();
    const interval = await lottery.methods.interval().call();
    const lastExecution = await lottery.methods.lastExecution().call();
    const partnerAddress = JSON.parse(
      localStorage.getItem("partnerAddress")
    ).split("=")[1];
    const exchangeRate = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT`
    );
    setExchangeRate(exchangeRate.data.price);

    const winnersArray = [];
    for (let i = 0; i < 10; i++) {
      const winners = await lottery.methods.winners(i).call();
      if (winners.wallet !== "0x0000000000000000000000000000000000000000") {
        winnersArray.push(winners);
      }
    }

    setData({
      ...datalottery,
      manager: manager,
      balance: balance,
      round: round,
      generatedNumbers: generatedNumbers,
      generatedSuperNumber: generatedSuperNumber,
      ticketPrice: ticketPrice,
      partnerAddress: partnerAddress,
      winners: winnersArray,
      interval: interval,
      lastExecution: lastExecution,
    });
  };


  useEffect(() => {
    if (lottery) {
      fetchDataLottery();
    }
  }, [lottery]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lottery) {
        async function fetchData() {
          const exchangeRate = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT`
          );
          setExchangeRate(exchangeRate.data.price);
        }
        fetchData();
      }
    }, 20000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lottery]);

  useEffect(() => {
    if (lottery) {
      async function fetchData() {
        const round = await lottery.methods.round().call();
        const arrayNumber = [];
        const start = round - 10 > 0 ? round - 10 : 1;

        for (let i = start; i < round; i++) {
          const result = await lottery.methods.viewGeneratedNumbers(i).call();
          const dateYear = new Date(result[2] * 1000).getFullYear();
          const dateMonth = new Date(result[2] * 1000).toLocaleString("en-US", {
            month: "long",
          });
          const dateDay = new Date(result[2] * 1000).getDate();

          arrayNumber.unshift([
            result[0],
            result[1],
            dateDay,
            dateMonth,
            dateYear,
            i,
          ]);
        }

        setGeneratedNumbersAll({ ...generatedNumbersAll, number: arrayNumber });
      }
      fetchData();
    }
  }, [lottery]);

  const generateNumbers = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setData({
      ...datalottery,
      message: "New numbers will be generated now!",
    });
    const round = await lottery.methods.round().call();
    let togleviewGeneratedNumbers = false;

    try {
      await lottery.methods.generateNumbers().send({
        from: accounts[0],
      });
      togleviewGeneratedNumbers = true;
    } catch (error) {
      setData({ ...datalottery, message: error.message });
    }

    if (togleviewGeneratedNumbers) {
      try {
        const result = await lottery.methods.viewGeneratedNumbers(round).call();
        const generatedNumbers = result[0];
        const generatedSuperNumber = result[1];
        setData({
          ...datalottery,
          message:
            "New 5 numbers generated: " +
            result[0] +
            " The new SuperNumber is " +
            result[1],
          generatedNumbers: generatedNumbers,
          generatedSuperNumber: generatedSuperNumber,
        });
        setTogleRunTheNumbers(false);
        fetchDataLottery();
      } catch (error) {
        setData({ ...datalottery, message: error.message });
      }
    }
  };

  const resultSearchPastDrawings = (result, round) => {
    let arrayDrawings = [];
    const dateYear = new Date(result[2] * 1000).getFullYear();
    const dateMonth = new Date(result[2] * 1000).toLocaleString("en-US", {
      month: "long",
    });
    const dateDay = new Date(result[2] * 1000).getDate();

    arrayDrawings = [result[0], result[1], dateDay, dateMonth, dateYear, round];
    return arrayDrawings;
  };

  const handleSearchPastDrawings = async (startDate, stopDate) => {
    setLoaderSearchPastDrawings(true);

    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth();
    const startDay = new Date(startDate).getDate();
    const stopYear = new Date(stopDate).getFullYear();
    const stopMonth = new Date(stopDate).getMonth();
    const stopDay = new Date(stopDate).getDate();
    const round = await lottery.methods.round().call();
    let arrayDrawings = [];

    for (let i = 1; i < round; i++) {
      const result = await lottery.methods.viewGeneratedNumbers(i).call();
      const currentYear = new Date(result[2] * 1000).getFullYear();
      const currentMonth = new Date(result[2] * 1000).getMonth();
      const currentDay = new Date(result[2] * 1000).getDate();

      const checkYear =
        currentYear >= startYear &&
        currentYear <= stopYear &&
        startYear === stopYear;
      const checkDifferYear =
        currentYear >= startYear &&
        currentYear <= stopYear &&
        startYear !== stopYear;
      const checkMonth =
        currentMonth >= startMonth &&
        currentMonth <= stopMonth &&
        startMonth === stopMonth;
      const checkDifferMonth =
        currentMonth >= startMonth &&
        currentMonth <= stopMonth &&
        startMonth !== stopMonth;
      const checkDay = currentDay >= startDay && currentDay <= stopDay;
      if (checkYear) {
        if (checkMonth) {
          if (checkDay) {
            arrayDrawings.unshift(resultSearchPastDrawings(result, i));
          }
        }
        if (checkDifferMonth) {
          arrayDrawings.unshift(resultSearchPastDrawings(result, i));
        }
      }
      if (checkDifferYear) {
        arrayDrawings.unshift(resultSearchPastDrawings(result, i));
      }
    }
    setGeneratedNumbersAll({ ...generatedNumbersAll, number: arrayDrawings });
    setLoaderSearchPastDrawings(false);
  };

  const random = () => {
    const arrayRandomNumbers = [];

    for (let i = 0; i < 5; i++) {
      const curentRundomNumber = Math.floor(Math.random() * 69) + 1;
      if (!arrayRandomNumbers.includes(String(curentRundomNumber))) {
        arrayRandomNumbers.push(String(curentRundomNumber));
      } else {
        i--;
      }
    }

    const randomSuperNumber = String(Math.floor(Math.random() * 25) + 1);
    setData({
      ...datalottery,
      numbers: arrayRandomNumbers,
      SuperNumber: randomSuperNumber,
    });
  };

  const handleDeleteNumber = (event) => {
    console.log(event);
    const numbers = datalottery.numbers;
    const curentNumbers = numbers.filter((num) => num != event);

    setData({
      ...datalottery,
      numbers: curentNumbers,
    });
  };

  const handleDeleteSuperNumber = () => {
    setData({
      ...datalottery,
      SuperNumber: "",
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setData({ ...datalottery, message: "Waiting on transaction success..." });
    const numbers = datalottery.numbers;
    const SuperNumber = datalottery.SuperNumber;
    const numberOfRoundstoEnter = datalottery.numberOfRoundstoEnter;
    const ticketPrice = datalottery.ticketPrice;

    if (numberOfRoundstoEnter === "") {
      setData({ ...datalottery, message: "Number of draws not selected" });
      return;
    }

    if (numbers.length !== 5 || SuperNumber === "") {
      setData({
        ...datalottery,
        message: "Please select 5 numbers and 1 Super Number",
      });
      return;
    }
    let curentPartnerAddress = "";

    if (datalottery.partnerAddress !== "") {
      curentPartnerAddress = String(datalottery.partnerAddress);
    } else {
      curentPartnerAddress = "0x17744a8E2C55B24bAdAFC555b294d81766f457eE";
    }

    let result = true;

    try {
      await lottery.methods
        .enter(
          numberOfRoundstoEnter,
          numbers,
          String(SuperNumber),
          curentPartnerAddress
        )
        .send({
          from: accounts[0],
          value: web3.utils.toWei(ticketPrice, "Wei") * numberOfRoundstoEnter,
        });
    } catch (error) {
      result = false;
    }

    if (result) {
      setData({ ...datalottery, message: "You have been entered!" });
      fetchDataLottery();
    } else {
      curentPartnerAddress = "0x17744a8E2C55B24bAdAFC555b294d81766f457eE";

      try {
        await lottery.methods
          .enter(
            numberOfRoundstoEnter,
            numbers,
            String(SuperNumber),
            curentPartnerAddress
          )
          .send({
            from: accounts[0],
            value: web3.utils.toWei(ticketPrice, "Wei") * numberOfRoundstoEnter,
          });
        setData({ ...datalottery, message: "You have been entered!" });
        fetchDataLottery();
      } catch (error) {
        setData({ ...datalottery, message: error.message });
      }
    }
  };

  const handleNumberChange = (event) => {
    const newNumbers = datalottery.numbers;
    const curentNumber = String(event);
    const curent = newNumbers.findIndex((el) => el === curentNumber);

    if (curent === -1 && newNumbers.length < 5) {
      newNumbers.push(String(event));
      setData({ ...datalottery, numbers: newNumbers });
    } else {
      const newArray = newNumbers.filter((el) => el !== curentNumber);
      setData({ ...datalottery, numbers: newArray });
    }
  };

  const handleSuperNumberChange = (event) => {
    if (datalottery.SuperNumber == "") {
      setData({ ...datalottery, SuperNumber: event });
    }
    if (datalottery.SuperNumber == event) {
      setData({ ...datalottery, SuperNumber: "" });
    }
  };

  const handleNumberOfRoundsInput = (event) => {
    setData({ ...datalottery, numberOfRoundstoEnter: event.target.value });
  };

  const handlePlayerAddressInput = (event) => {
    setData({ ...datalottery, playerAdress: event.target.value });
  };

  const handleRoundToCheckInput = (event) => {
    setData({ ...datalottery, round_to_check: event.target.value });
  };

  const checkNumbers = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const roundToCheckStart = Math.max(Number(datalottery.round) - 11, 1);
    const roundToCheckFinish = Number(datalottery.round);
    const arrayGuessedNumber = [];

    setData({
      ...datalottery,
      message: "Checking if you guessed any numbers...",
    });
    setloaderCheckWon(true);

    try {
      for (let i = roundToCheckStart; i < roundToCheckFinish; i++) {
        const countEntries = await lottery.methods
          .checkPlayerEntriesCountForRound(accounts[0], i)
          .call();

        if (countEntries > 0) {
          for (let j = 0; j < countEntries; j++) {
            const result = await lottery.methods
              .checkPlayerForRoundDetailed(accounts[0], i, j)
              .call();

            const withdrawnInfo = await lottery.methods
              .withdrawnInfo(i, accounts[0], j)
              .call();
              console.log(`round: ${i}, account: ${accounts[0]}, entryIndex: ${j}`);
            const prize =
              CalculationPrize(datalottery.balans, result[0], result[1]) || 0;

            if (result[0] !== "0" && result[0]) {
              let curentSuper = result[1] ? " + SuperNumber" : "";

              arrayGuessedNumber.unshift([
                i,
                prize,
                result[0],
                curentSuper,
                j,
                withdrawnInfo,
              ]);
              setData({ ...datalottery, message: "" });
            }
          }
        }

        if (i === roundToCheckFinish - 1) {
          setloaderCheckWon(false);
          if (arrayGuessedNumber.length !== 0) {
            setGuessedArray(arrayGuessedNumber);
          } else {
            setData({ ...datalottery, message: "YOU DIDN'T GUESS ANY NUMBERS. GOOD LUCK NEXT TIME!" });
          }
        }
      }
    } catch (error) {
      setloaderCheckWon(false);
      setData({ ...datalottery, message: error.message });
    }
  };

  const withdraw = async (event, round, index) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setData({ ...datalottery, message: "Waiting on transaction success..." });

    try {
      await lottery.methods.withdrawPrize(round, index).send({
        from: accounts[0],
      });

      setData({ ...datalottery, message: "Your prize has been paid out!" });
      fetchDataLottery();
    } catch (error) {
      setData({ ...datalottery, message: error.message });
    }
  };

  const showMyEntries = async () => {
    setLoaderMyEntries(true);
    const accounts = await web3.eth.getAccounts();
    const round = await lottery.methods.round().call();
    const arrayMyEntries = [];

    for (let i = 1; i < Number(round) + 1; i++) {
      const entriesCount = await lottery.methods
        .checkPlayerEntriesCountForRound(accounts[0], i)
        .call();
      if (entriesCount !== 0) {
        for (let j = 0; j < entriesCount; j++) {
          const result = await lottery.methods
            .viewPlayerEntry(i, accounts[0], j)
            .call();
          arrayMyEntries.unshift([result.numbers, result.supernumber, i]);
        }
      }
      if (i === Number(round)) {
        setData({
          ...datalottery,
          myEntries: arrayMyEntries,
        });
        setLoaderMyEntries(false);
        if (arrayMyEntries.length === 0) {
          setData({ ...datalottery, message: "There is no history yet" });
        }
      }
    }
  };

  const hideMyEntries = () => {
    setData({
      ...datalottery,
      myEntries: "",
    });
  };

  // const withdrawPartnersFees = async (event) => {
  //   event.preventDefault();
  //   const accounts = await web3.eth.getAccounts();
  //   const round = await lottery.methods.round().call();

  //   setData({ ...datalottery, message: "Waiting on transaction success..." });
  //   try {
  //     await lottery.methods.withdrawPartnersFee(round - 1).send({
  //       from: accounts[0],
  //     });
  //     setData({ ...datalottery, message: "You have been paid out!" });
  //   } catch (error) {
  //     setData({ ...datalottery, message: error.message });
  //   }
  // };

  return (
    <>
      <div className="page_launch-app">
        <main>
          {!isConnected ? (
            <PopupPleaseConnect />
          ) : (
            <div>
              <div>
                <NextJackpot
                  balance={datalottery.balance}
                  ticketPrice={datalottery.ticketPrice}
                  exchangeRate={exchangeRate}
                  interval={datalottery.interval}
                  lastExecution={datalottery.lastExecution}
                  round={datalottery.round}
                  generateNumbers={generateNumbers}
                  togleRunTheNumbers={togleRunTheNumbers}
                  setTogleRunTheNumbers={setTogleRunTheNumbers}
                  winners={datalottery.winners}
                />
                <PastDrawings
                  generatedNumbers={datalottery.generatedNumbers}
                  generatedSuperNumber={datalottery.generatedSuperNumber}
                  generatedNumbersAll={generatedNumbersAll}
                  handleSearchPastDrawings={handleSearchPastDrawings}
                  loaderSearchPastDrawings={loaderSearchPastDrawings}
                />
              </div>

              <ChooseNumbers
                handleNumberChange={handleNumberChange}
                handleSuperNumberChange={handleSuperNumberChange}
                numberOfRoundstoEnter={datalottery.numberOfRoundstoEnter}
                handleNumberOfRoundsInput={handleNumberOfRoundsInput}
                numbers={datalottery.numbers}
                SuperNumber={datalottery.SuperNumber}
                onSubmit={onSubmit}
                random={random}
                handleDeleteNumber={handleDeleteNumber}
                handleDeleteSuperNumber={handleDeleteSuperNumber}
              />

              <CheckWon
                handlePlayerAddressInput={handlePlayerAddressInput}
                handleRoundToCheckInput={handleRoundToCheckInput}
                playerAdress={datalottery.playerAdress}
                round_to_check={datalottery.round_to_check}
                checkNumbers={checkNumbers}
                withdraw={withdraw}
                guessedNumbers={datalottery.guessedNumbers}
                guessedNumbersSuper={datalottery.guessedNumbersSuper}
                balance={datalottery.balance}
                guessedArray={guessedArray}
                loaderCheckWon={loaderCheckWon}
              />
              <MyEntries
                showMyEntries={showMyEntries}
                hideMyEntries={hideMyEntries}
                loaderMyEntries={loaderMyEntries}
                myEntries={datalottery.myEntries}
              />
              {changePopup && (
                <div>
                  <Popup message={datalottery.message} pRef={pRef} />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};
