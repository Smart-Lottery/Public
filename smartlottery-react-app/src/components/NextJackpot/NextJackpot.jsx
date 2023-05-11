/* eslint-disable jsx-a11y/no-distracting-elements */
import React from "react";
import { useEffect, useState } from "react";
import "./NextJackpot.scss";

let classNames = require("classnames");

export const NextJackpot = ({
  balance,
  ticketPrice,
  exchangeRate,
  interval,
  lastExecution,
  round,
  generateNumbers,
  togleRunTheNumbers,
  setTogleRunTheNumbers,
  winners
}) => {
  const [[diffH, diffM, diffS], setDiff] = useState([ 0, 0, 0]);
  const [tick, setTick] = useState(false);
  const [timerID, setTimerID] = useState(0);


  useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
      const finishTime = lastExecution * 1000 + (interval * 1000);
      const diff = (finishTime - new Date()) / 1000;

      if (diff > 0) {
        setTogleRunTheNumbers(false);
        setDiff([
          Math.floor(diff / 3600),
          Math.floor((diff / 60) % 60),
          Math.floor(diff % 60),
        ]);
      } else {
        setDiff([
          0, 0, 0
        ]);
        setTogleRunTheNumbers(true);
      }
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick, generateNumbers]);

  return (
    <div className="next-jackpot">
      
      <marquee 
        scrollamount="10" 
        behavior="scroll" 
        direction="left"         
      >
        <div className="next-jackpot__connet-ticker">
          <p>CURRENT ROUND {round}</p>
          <p>THE JACKPOT IS MATIC {(balance * 0.7 * 10**-18).toFixed(2)}</p>
          {winners?.map(winner => 
          <p key={winner.wallet}>
          `${winner.wallet.substring(0, 5)} won MATIC {(winner.amount * 10**-18).toFixed(2)}`
         </p>
          )}
        </div>
      </marquee>
      <div className="next-jackpot__container">
        <div className="next-jackpot__value">
          <span>
            <span>The next </span>Prize pool is MATIC {(balance * 10**-18).toFixed(2)}
          </span>
          <div className="next-jackpot__value-curent">
            ($ {(balance * exchangeRate * 10**-18).toFixed(2)})
          </div>

          <p className="next-jackpot__ticket-price">
            Current ticket price:{" "}
            <span>{ticketPrice * 10**-18}</span> MATIC{" "}
          </p>
        </div>
        <div className="next-jackpot__time-container">
          <div className="next-jackpot__time-block">
            <h3 className="next-jackpot__title">
              The next drawing will happen
            </h3>
            <p className="next-jackpot__title-desktop">Time till the next round</p>
            <div className="next-jackpot__time-item-block">
              <p className="next-jackpot__time-item">
                {`${diffH.toString().padStart(2, "0")}:${diffM
                  .toString()
                  .padStart(2, "0")}:${diffS.toString().padStart(2, "0")}`}
              </p>
              <p className="next-jackpot__time-text">hours mins secs</p>
            </div>
          </div>
        <button
             disabled={!togleRunTheNumbers}
             onClick={generateNumbers}
             className={classNames("next-jackpot__button-runTheNumbers", {
              "next-jackpot__button-runTheNumbers-active": togleRunTheNumbers,
            })}
    
          >
           Run the numbers
          </button>
          <p className="next-jackpot__time-instruction">
            How does it work? Once the countdown is over, anyone can hit the
            "Run the numbers" button to initiate the drawing. As soon as the
            winning numbers are drawn, a new round will begin, and the timer
            will reset accordingly.
          </p>
         
        </div>
      </div>
    </div>
  );
};
