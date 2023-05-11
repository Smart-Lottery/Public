import "./PayoutsDescktop.scss";
// import { useAccount } from "wagmi";

export const PayoutsDescktop = ({ exchangeRate, balance }) => {
  const valuePrize = {
    fiveSuper: balance*0.7,
    five: 2000000,
    fourSuper: 100000,
    four: 10000,
    threeSuper: 1000,
    three: 150,
    twoSuper: 200,
    two: 30,
    oneSuper: 40,
    one: 5,
    Super: 20,
  };

  // const { isConnected } = useAccount();
  

  return (
    <div className="payouts-desctop">
      <div className="payouts-desctop__table">
        <div className="payouts-desctop__match ">
          <div className="payouts-desctop__match-row-left payouts-desctop__match-row-head">MATCH</div>
          <div className="payouts-desctop__match-row-center payouts-desctop__match-row-head ">PRIZE</div>
          <div className="payouts-desctop__match-row-right payouts-desctop__match-row-head ">
            Current $ <br></br>value
          </div>
        </div>
        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-plas">+</div>
            <div className="payouts-desctop__match-item payouts-desctop__match-item-last"></div>
          </div>
          <div className="payouts-desctop__match-row-jackpot">
          Jackpot
          </div>
          
          {/* {isConnected ? (<div className="payouts-desctop__match-row-center">
          MATIC  {((valuePrize.fiveSuper * 0.7 / exchangeRate ).toFixed(2)).toLocaleString()}
          </div> ) : (
            <div className="payouts-desctop__match-row-center">
             Connect your wallet to check jackpot
          </div>
          )}
          
          {isConnected ? ( <div className="payouts-desctop__match-row-right">
            $ {(((valuePrize.fiveSuper * 7) / 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>) : (
              <div className="payouts-desctop__match-row-right">
              – . ––
              </div>
          )} */}
         
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-plas-hiden">+</div>
            <div className="payouts-desctop__match-item-hiden"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {(valuePrize.five).toLocaleString()}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.five * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas">+</div>
            <div className="payouts-desctop__match-item payouts-desctop__match-item-last"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {(valuePrize.fourSuper).toLocaleString()}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.fourSuper * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas-hiden">+</div>
            <div className="payouts-desctop__match-item-hiden "></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {(valuePrize.four).toLocaleString()}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.four * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas">+</div>
            <div className="payouts-desctop__match-item payouts-desctop__match-item-last"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.threeSuper}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.threeSuper * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas-hiden">+</div>
            <div className="payouts-desctop__match-item-hiden"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.three}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.three * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas">+</div>
            <div className="payouts-desctop__match-item  payouts-desctop__match-item-last"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.twoSuper}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.twoSuper * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas-hiden">+</div>
            <div className="payouts-desctop__match-item-hiden"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.two}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.two * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas">+</div>
            <div className="payouts-desctop__match-item payouts-desctop__match-item-last"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.oneSuper}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.oneSuper * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas-hiden">+</div>
            <div className="payouts-desctop__match-item-hiden"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.one}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.one * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>

        <div className="payouts-desctop__match">
          <div className="payouts-desctop__match-row-left">
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-hiden"></div>
            <div className="payouts-desctop__match-item-plas-hiden">+</div>
            <div className="payouts-desctop__match-item payouts-desctop__match-item-last"></div>
          </div>
          <div className="payouts-desctop__match-row-center">
            MATIC {valuePrize.Super}
          </div>
          <div className="payouts-desctop__match-row-right">
            $ {(valuePrize.Super * exchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>
      </div>
    </div>
  );
};
