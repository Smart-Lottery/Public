import "./MoreResults.scss";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { TailSpin } from 'react-loader-spinner';

import "react-datepicker/dist/react-datepicker.css";

export const MoreResults = ({ togleMoreResult, generatedNumbersAll, handleSearchPastDrawings, loaderSearchPastDrawings }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [stopDate, setStopDate] = useState(new Date());
  const [number, setNumber] = useState(null);

  useEffect(() => {
    setNumber(generatedNumbersAll.number);
  }, [generatedNumbersAll]);

  return (
    <>
      {togleMoreResult && (
        <div className="more-result">
          <h2 className="more-result__title more-result__title-main">
            SEARCH PAST DRAWINGS
          </h2>
          <div className="more-result__search-data">
            <div className="more-result__search-data-item">
              <h3 className="more-result__title-search">START DATE</h3>

              <DatePicker
                wrapperClassName="datePicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="more-result__search-data-item">
              <h3 className="more-result__title-search">END DATE</h3>
              <DatePicker
                wrapperClassName="datePicker"
                selected={stopDate}
                onChange={(date) => setStopDate(date)}
              />
            </div>

            <button onClick={() => handleSearchPastDrawings(startDate, stopDate)} 
            className="more-result__button-search">Search</button>
          </div>

          {!loaderSearchPastDrawings ? (
            <div className="more-result__results-container">
              {number?.map((el, index) => (
                <div key={index} className="more-result__results">
                  <h3 className="more-result__title more-result__title-after">
                    {el[2]} {el[3]} {el[4]}
                  </h3>
                  <div className="more-result__title-round">
                   ROUND {el[5]}
                  </div>

                  <div className="more-result__result">
                    <div className="more-result__result-item">{el[0][0]}</div>
                    <div className="more-result__result-item">{el[0][1]}</div>
                    <div className="more-result__result-item">{el[0][2]}</div>
                    <div className="more-result__result-item">{el[0][3]}</div>
                    <div className="more-result__result-item">{el[0][4]}</div>
                    <div className="more-result__result-item">{el[1]}</div>
                  </div>
                </div>
              ))}
            </div>
          ): (
            <div  className="more-result__tail-spin">
            <TailSpin
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          </div>
          )}
        </div>
      )}
    
    </>
  );
};
