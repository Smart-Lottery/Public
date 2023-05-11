import "./CheckWon.scss";
import { TailSpin } from 'react-loader-spinner'

export const CheckWon = ({
  playerAdress,
  handlePlayerAddressInput,
  loaderCheckWon,

  checkNumbers,
  withdraw,

  guessedArray,
}) => {
  return (
    <div className="check-won">
      <div className="check-won__check">
        <h2 className="check-won__title check-won__title-check">
          Check if you have won!
        </h2>
        <div className="check-won__check-container">
       
          <button
            onClick={(e) => checkNumbers(e)}
            className="check-won__button check-won__button-check"
          >
            CHECK
          </button>
        </div>
      </div>

      {loaderCheckWon ? (<div  className="check-won__tail-spin">
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
        </div>) : (
            <>
            {guessedArray.length !== 0 && (
              <div className="check-won__withdraw">
                <h2 className="check-won__title check-won__withdraw-title">
                  You guessed numbers in {guessedArray.length} rounds!
                </h2>
                <div className="check-won__head">
                  <p className="check-won__head-item">ROUND</p>
                  <p className="check-won__head-item">Guessed numbers</p>
                  <p className="check-won__head-item">Prize*</p>
                </div>
      
                {guessedArray.map((el, index) => (
                  <div className="check-won__block" key={index}>
                    <p className="check-won__withdraw-lable"> Round</p>
                    <p className="check-won__item">{el[0]}</p>
                    <p className="check-won__withdraw-lable"> Guessed numbers</p>
                    <p className="check-won__item">
                      {el[2]} numbers {el[3]}
                    </p>
                    <p className="check-won__withdraw-lable">Prize</p>
                    <p className="check-won__item">{el[1]} MATIC</p>
                    {el[5] ? (
                     <p className="check-won__item">Already withdrawn</p>
                    ) : (
                    <button
                      onClick={(e) => withdraw(e, el[0], el[4])}
                      className="check-won__button check-won__button-withdraw"
                    >
                      Withdraw
                    </button>
                    )}
                  </div>
                ))}
                <p className="check-won__instruction">
                  * If the prize exceeds the balance of the contract in the end of the round,
                  maximum 70% <br></br>of the round balance minus already made
                  withdrawals will be paid out
                </p>
              </div>
            )}
            </>
          )}
   </div>
)};
