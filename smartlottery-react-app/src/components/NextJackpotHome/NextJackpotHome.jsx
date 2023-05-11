import "./NextJackpotHome.scss";
import { useAccount } from "wagmi";

export const NextJackpotHome = ({ balance, exchangeRate, ticketPrice }) => {
  const { isConnected } = useAccount();

  return (
    <div className="next-jackpot-home">
      {isConnected ? (
        <>
          <div className="next-jackpot-home__item">
            <p>The Prize Pool is </p>
            <p> $ {(balance * exchangeRate * 10**-18).toFixed(2)} </p>
            <p className="next-jackpot-home__item-matic">
              (MATIC {(balance  * 10**-18).toFixed(2)})
            </p>
          </div>

          <div className="next-jackpot-home__ticket-price">
            <p>Current ticket price:</p>
            <p className="next-jackpot-home__ticket-price">
              {ticketPrice * 10**-18}
              MATIC
            </p>
          </div>
        </>
      ) : (
        <div className="next-jackpot-home__item">
          Connect your wallet to check jackpot
        </div>
      )}
    </div>
  );
};
