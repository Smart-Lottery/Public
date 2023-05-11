import React from "react";
import "./MyEntries.scss";
import { TailSpin } from "react-loader-spinner";


export const MyEntries = ({ showMyEntries, hideMyEntries, loaderMyEntries, myEntries }) => {

  return (
    <div className="my-entries">
      <h2 className="my-entries__title">My entries</h2>
      <div className="my-entries__container">
        {!myEntries && (
          <button onClick={showMyEntries} className="my-entries__button">
            SHOW HISTORY OF MY ENTRIES
          </button>
        )}

        {loaderMyEntries ? (
            <div className="my-entries__tail">
                <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
            </div>
          
        ) : (
          <>
            {myEntries && (
              <>
                <button onClick={hideMyEntries} className="my-entries__button my-entries__button-hide">
                  Hide HISTORY OF MY ENTRIES
                </button>
                <div className="my-entries__block-head">
                  <h3 className="my-entries__block-head-item">Round</h3>
                  <h3 className="my-entries__block-head-item">Numbers</h3>
                </div>
               
                {myEntries.map((el, index) => (
                  <div key={index} className="my-entries__block">
                  
                     
                      <div className="my-entries__block-round-item">
                        {el[2]}{" "}
                      </div>
                  
            
                     
                      <div className="my-entries__result">
                        <div className="my-entries__result-item">
                          {el[0][0]}
                        </div>
                        <div className="my-entries__result-item">
                          {el[0][1]}
                        </div>
                        <div className="my-entries__result-item">
                          {el[0][2]}
                        </div>
                        <div className="my-entries__result-item">
                          {el[0][3]}
                        </div>
                        <div className="my-entries__result-item">
                          {el[0][4]}
                        </div>
                        <div className="my-entries__result-item">{el[1]}</div>
                      </div>
                    </div>
           
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
