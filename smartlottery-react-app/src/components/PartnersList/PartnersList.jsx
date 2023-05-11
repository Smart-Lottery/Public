import { useEffect } from "react";
import "./PartnersList.scss";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useRef } from "react";
import { useState } from "react";

export const PartnersList = ({withdraw}) => {

  const referClients = useRef(null);
  const getGitHub = useRef(null);
  const instructions = useRef(null);
  const [checkRound, setCheckRound] = useState("");

  

  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="partners-list">
      <h1 className="partners-list__title-main">
        Launch your own app and earn 15% from all purchased tickets or simply
        refer clients to this app. Follow the instructions below
      </h1>
      <div className="partners-list__item">
        <h2 className="partners-list__title"> Overview</h2>
        <div className="partners-list__text">
          As a decentralized lottery (not owned by anyone and residing on the
          blockchain), the goal is to enable anyone to earn from it by simply
          building a front-end interface or referring players through other
          means. The rationale behind this is to create an extremely large
          lottery, making it attractive to players. By providing equal revenue
          opportunities for everyone who brings customers to the lottery, there
          is no incentive for individuals to create their own lottery.
          Additionally, this approach allows for multiple front-end interfaces,
          ensuring that no single entity can ban or take down the lottery: while
          it is impossible to remove a contract from the blockchain, having
          potentially tens or hundreds of front-end interfaces makes it
          infeasible for anyone to shut down access to the lottery. The ultimate
          goal is to achieve full decentralization!
        </div>
        <div className="partners-list__text">
          There are three ways on how you can refer clients or build your
          website:
          <button
            className="partners-list__text partners-list__link"
            onClick={() =>
              referClients.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            1. Simply refer clients by adding your wallet into url parameters.
          </button>
          <button 
           onClick={() =>
            getGitHub.current.scrollIntoView({ behavior: "smooth" })
          }
          className="partners-list__text partners-list__link">
            2. Get the full code from our GitHub and launch your site right
            away.
          </button>
          <button
            onClick={() =>
              instructions.current.scrollIntoView({ behavior: "smooth" })
            }
            className="partners-list__text partners-list__link"
          >
            3. Build your own front end, using step-by-step instructions below.
          </button>
        </div>
        <div className="partners-list__text">
          Those who build front-end interfaces or refer players to the contract
          in other ways are referred to as Partners. Partners earn fees from
          referring clients and can withdraw their portion of the fees from each
          round, which can be used for marketing or other purposes.
        </div>
      </div>
      <div className="partners-list__item">
        <h3 ref={referClients} className="partners-list__title-step">
          1. REFERRING CLIENTS TO THIS APP
        </h3>
        <div className="partners-list__text">
          If you operate website that sells lottery tickets or know how to
          attract clients otherwise, you can simply add ‘_partnerAddress’ URL
          parameter with the value of your Polygon wallet address. Example:
        </div>

        <pre className="partners-list__code">
          <code className="javascript">
            smartlottery.org/?_partnerAddress=0x123
          </code>
        </pre>
      </div>
      <div className="partners-list__item">
        <h3 ref={getGitHub} className="partners-list__title-step">
          2. GET OUR PRODUCTION READY CODE
        </h3>
        <div className="partners-list__text">
          You can download our production-ready code from this GitHub
          repository, tailor the design to your preferences, and deploy it on
          any domain of your choice. Don't forget to replace "ENTER YOUR PARTNER
          ADDRESS" with your own Polygon wallet address. Once the clients enter
          the lottery through your website, you can withdraw your fees for every
          round by pressing the button below”
        </div>
        <div className="partners-list__container-actions">
        <input 
            className="partners-list__input" 
            type='number' 
            value={checkRound}
            onChange={(e) => setCheckRound(e.target.value )}
            placeholder="Round number"
            />
        <button className="partners-list__button" onClick={() => withdraw(checkRound)}> 
         Withdraw partners fees
        </button>
        </div>
        
   
      </div>
      <div ref={instructions} className="partners-list__item">
        <h2 className="partners-list__title">3. Build you own front end</h2>
        <div className="partners-list__item-step">
          <h3 className="partners-list__title-step">
            Step 1: Integrate with the Crypto Lottery contract
          </h3>
          <div className="partners-list__text">
            To connect your platform to the Crypto Lottery contract, you will
            need to integrate with the contract's functions. You can use web3.js
            or a similar library to interact with the contract. First you need
            to add ABI and address of the contract:
          </div>

          <pre className="partners-list__code">
            <code className="javascript">
              const cryptoLotteryABI = [/* Contract ABI goes here */];
            </code>
            <code className="javascript">
              const cryptoLotteryAddress = '0x...'; // Contract address goes
              here
            </code>
          </pre>
        </div>

        <div className="partners-list__item-step">
          <h3 className="partners-list__title-step">
            Step 2: Register players
          </h3>
          <div className="partners-list__text">
            When a user wants to participate in the Smart Lottery from your
            platform, register their entry using the registerPlayer function,
            where partnerAddress is the address of your wallet. partnerAddress
            is further used to track registrations and receive fees for
            attracting users to the lottery
          </div>

          <pre className="partners-list__code">
            <code className="javascript">
              cryptoLotteryContract.methods.registerPlayer(playerAddress,
              numbers, supernumber, partnerAddress).send(&#123;from:
              senderAddress, value: entryTicketCost&#123;);
            </code>
          </pre>
        </div>

        <div className="partners-list__item-step">
          <h3 className="partners-list__title-step">
            Step 3: Withdraw partner's fees
          </h3>
          <div className="partners-list__text">
            After the lottery round has ended, partners can withdraw their fees
            for the round by calling the withdrawPartnersFee function:
          </div>

          <pre className="partners-list__code">
            <code className="javascript">
              cryptoLotteryContract.methods.withdrawPartnersFee(round).send(&#123;from:
              partnerAddress&#123;);{" "}
            </code>
          </pre>
        </div>

        <div className="partners-list__item-step">
          <h3 className="partners-list__title-step">
            Step 4: Monitor balance and withdrawals
          </h3>
          <div className="partners-list__text">
            You can monitor the balance of the contract and the withdrawals made
            by users and partners with the following functions: getBalance:
            Returns the current balance of the contract. withdrawalsInfo:
            Returns the amount withdrawn by a specific address in a specific
            round. Example usage:
          </div>

          <pre className="partners-list__code">
            <code className="javascript">
              cryptoLotteryContract.methods.getBalance().call();
              cryptoLotteryContract.methods.withdrawalsInfo(round,
              address).call();
            </code>
          </pre>
        </div>

        <div className="partners-list__item-step">
          <h3 className="partners-list__title-step">
            Step 5: Getting data on registrations brought by the Partner
          </h3>
          <h4 className="partners-list__title-step-3">
            Retrieve Partner Registrations
          </h4>

          <div className="partners-list__text">
            Partners can retrieve the list of registrations they brought in for
            a specific round using the getPartnerRegistrations function:
          </div>

          <pre className="partners-list__code">
            <code className="javascript">
              cryptoLotteryContract.methods.getPartnerRegistrations(partnerAddress,
              round).call();
            </code>
          </pre>
          <div className="partners-list__text">
            This function returns an array of player addresses registered by the
            partner during the specified round.
          </div>

          <h4 className="partners-list__title-step-3">
            Retrieve Partner Registrations Count
          </h4>

          {/* <div className="partners-list__text">
            To get the total number of registrations a partner brought in for a
            specific round, call the getPartnerRegistrationsCount function:
          </div>

          <pre className="partners-list__code">
            <code className="javascript">
              cryptoLotteryContract..methods.getPartnerRegistrationsCount(partnerAddress,
              round).call();
            </code>
          </pre>
          <div className="partners-list__text">
            This function returns the total number of registrations for the
            given partner and round.
          </div> */}
          <div className="partners-list__text">
            By following these steps, partners can integrate with the Crypto
            Lottery contract, register players, and earn fees for their efforts.
            The contract is designed to ensure a fair distribution of fees to
            partners based on their contribution to the lottery.{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
