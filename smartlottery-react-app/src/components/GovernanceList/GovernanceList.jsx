import { useState } from "react";
import "./GovernanceList.scss";

export const GovernanceList = ({
  tokenPrice,
  exchangeRate,
  handleBuyTokens
}) => {
  const [amount, setAmount] = useState(1)
  return (
    <div className="governance-list">
      
      <div className="governance-list__item">
        <div className="governance-list__text">
          This contract is not owned by any one person or organization - it is
          run on the blockchain and you can steer where it goes. You can buy
          SmartLotteryToken, earn fees from the lottery, and participate in the
          contract governance.
        </div>
        <h2 className="governance-list__title">Smart Lottery Tokens (SLT)</h2>
        <div className="governance-list__text">
          Smart Lottery Tokens (SLT) is an ERC20 token that forms the backbone
          of the CryptoLottery ecosystem. As an SLT holder, you can participate
          in protocol governance and earn a share of the fees collected each
          round. SLT has a fixed supply of 1,000,000 tokens, ensuring that your
          token will not be devalued with higher emission.
        </div>
      </div>

      <div className="governance-list__item">
        <h2 className="governance-list__title">
          Purchase Smart Lottery Token (SLT)
        </h2>
        <div className="governance-list__buy">
          <p className="governance-list__buy-text">
            Enter amount of SLT tokens you want to purchase
          </p>
          <div className="governance-list__buy-item">
            <input 
            className="governance-list__input" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <div className="governance-list__value">
              <p>MATIC {(amount * 10**-18 * tokenPrice ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
              <p>($ {(amount * 10**-18 * tokenPrice * exchangeRate ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')})</p>
            </div>
          </div>

          <button className="governance-list__button" onClick={(e) => handleBuyTokens(e, amount)}> Buy</button>
        </div>
      </div>

      <div className="governance-list__item">
        <h2 className="governance-list__title">Governance</h2>
        <p className="governance-list__text">
          CryptoLottery embraces a decentralized governance model, powered by
          the OpenZeppelin smart contract framework. This model allows SLT
          holders to participate in the decision-making process by voting on
          proposed changes to the contract and approving spending requests
          submitted by the contract manager. By leveraging the Tally app
          (https://www.tally.xyz/), SLT holders can seamlessly engage in the
          governance process and have a say in the platform's future.
        </p>

        <p className="governance-list__text">
          By holding SLT and participating in the governance process, you become
          an integral part of the CryptoLottery community, shaping its future
          and reaping the rewards of its growth. Buy SLT today and join us on
          our journey to revolutionize the world of decentralized lotteries.
        </p>

        <p className="governance-list__text">
          <spann>Note: </spann> Governance mechanism is in development and will
          be started soon!
        </p>

        <button className="governance-list__link">Visit the Tally app</button>
      </div>
    </div>
  );
};
