import "./Payouts.scss";
import { useAccount } from "wagmi";

export const Payouts = ({ exchangeRate, balance }) => {
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
    <div className="payouts">
      <div className="payouts__table">
        <div className="payouts__match">
          <div className="payouts__match-row-left-head">MATCH</div>
          <div className="payouts__match-row-right-head">PRIZE / VALUE</div>
        </div>
        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-plas">+</div>
            <div className="payouts__match-item payouts__match-item-last"></div>
          </div>
          <div className="payouts__match-row-right-jackpot">
               Jackpot
            {/* {isConnected ? (
              <div className="payouts__match-row-right-top">
                MATIC{" "}
                {((valuePrize.fiveSuper * 0.7) / exchangeRate)
                  .toFixed(2)
                  .toLocaleString()}
              </div>
            ) : (
              <div className="payouts__match-row-right-top">
                Connect your wallet to check jackpot
              </div>
            )}

            {isConnected ? (
              <div className="payouts__match-row-right-bottom">
                ${" "}
                {((valuePrize.fiveSuper * 7) / 10)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
            ) : (
              <div className="payouts__match-row-right-bottom">– . ––</div>
            )} */}
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-plas-hiden">+</div>
            <div className="payouts__match-item-hiden"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              MATIC {valuePrize.five.toLocaleString()}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.five * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas">+</div>
            <div className="payouts__match-item payouts__match-item-last"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              MATIC {valuePrize.fourSuper.toLocaleString()}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.fourSuper * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas-hiden">+</div>
            <div className="payouts__match-item-hiden "></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.four}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.four * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas">+</div>
            <div className="payouts__match-item payouts__match-item-last"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              MATIC {valuePrize.threeSuper}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.threeSuper * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas-hiden">+</div>
            <div className="payouts__match-item-hiden"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.three}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.three * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas">+</div>
            <div className="payouts__match-item  payouts__match-item-last"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.twoSuper}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.twoSuper * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas-hiden">+</div>
            <div className="payouts__match-item-hiden"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.two}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.two * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas">+</div>
            <div className="payouts__match-item payouts__match-item-last"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.oneSuper}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.oneSuper * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas-hiden">+</div>
            <div className="payouts__match-item-hiden"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.one}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.one * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>

        <div className="payouts__match">
          <div className="payouts__match-row-left">
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-hiden"></div>
            <div className="payouts__match-item-plas-hiden">+</div>
            <div className="payouts__match-item payouts__match-item-last"></div>
          </div>
          <div className="payouts__match-row-right">
            <p className="payouts__match-row-right-top">
              {" "}
              MATIC {valuePrize.Super}
            </p>
            <p className="payouts__match-row-right-bottom">
              ${" "}
              {(valuePrize.Super * exchangeRate)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
