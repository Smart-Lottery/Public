import "./MainQuestions.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Payouts } from "components/Payouts/Payouts";
import { PayoutsDescktop } from "components/PayoutsDescktop/PayoutsDescktop";
import { Link } from "react-router-dom";
import {
  handleHowItWorks,
  handlePayoutSructure,
  handleTokenAndGovernance,
  handleIWantTheSameDApp,
  handleDisclaimer,
} from "store/reducers/navigate/navigate";
import useOutsideClick from "@rooks/use-outside-click";
import button_up from "../../assets/images/buttom_up_main.svg";
let classNames = require("classnames");

export const MainQuestions = ({ exchangeRate, balance }) => {
  let togleHowItWorksRef = useRef(null);
  let toglePayoutSructureRef = useRef(null);
  let togleTokenAndGovernanceRef = useRef(null);
  let togleIWantTheSameDAppRef = useRef(null);
  let togleDisclaimerRef = useRef(null);
  const pRef = useRef(null);

  const listTogles = {
    read_white_paper: "read_white_paper",
  };
  const { read_white_paper } = listTogles;

  const [toglePopup, setToglePopup] = useState(null);

  const dispatch = useDispatch();
  const {
    togleHowItWorks,
    toglePayoutSructure,
    togleTokenAndGovernance,
    togleIWantTheSameDApp,
    togleDisclaimer,
  } = useSelector((state) => state.navigate);

  const handlePopup = (event) => {
    if (toglePopup !== event) {
      setToglePopup(event);
      console.log(toglePopup);
    } else {
      setToglePopup(null);
      console.log(toglePopup);
    }
  };

  function outsidePClick() {
    if (toglePopup !== null) {
      setToglePopup(null);
      console.log(toglePopup);
    }
  }
  useOutsideClick(pRef, outsidePClick);

  useEffect(() => {
    if (togleHowItWorks) {
      togleHowItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (toglePayoutSructure) {
      toglePayoutSructureRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (togleTokenAndGovernance) {
      togleTokenAndGovernanceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (togleIWantTheSameDApp) {
      togleIWantTheSameDAppRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (togleDisclaimer) {
      togleDisclaimerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    togleHowItWorks,
    toglePayoutSructure,
    togleTokenAndGovernance,
    togleIWantTheSameDApp,
    togleDisclaimer,
  ]);

  return (
    <div className="MainQuestions">
      <div className="MainQuestions__block-title">
        <button
          className={classNames(
            "MainQuestions__title MainQuestions__title-HowItWorks",
            {
              "MainQuestions__title-active": togleHowItWorks,
            }
          )}
          onClick={() => dispatch(handleHowItWorks(true))}
        >
          How It Works
        </button>
        <button
          className={classNames(
            "MainQuestions__title MainQuestions__title-PayoutSructure",
            {
              "MainQuestions__title-active": toglePayoutSructure,
            }
          )}
          onClick={() => dispatch(handlePayoutSructure(true))}
        >
          Payout structure
        </button>
        <button
          className={classNames(
            "MainQuestions__title  MainQuestions__title-TokenAndGovernance",
            {
              "MainQuestions__title-active": togleTokenAndGovernance,
            }
          )}
          onClick={() => dispatch(handleTokenAndGovernance(true))}
        >
          Token and Governance
        </button>
        <button
          className={classNames(
            "MainQuestions__title  MainQuestions__title-IWantTheSameDApp",
            {
              "MainQuestions__title-active": togleIWantTheSameDApp,
            }
          )}
          onClick={() => dispatch(handleIWantTheSameDApp(true))}
        >
          I want the same DApp!
        </button>
        <button
          className={classNames(
            "MainQuestions__title  MainQuestions__title-Disclaimer",
            {
              "MainQuestions__title-active": togleDisclaimer,
            }
          )}
          onClick={() => dispatch(handleDisclaimer(true))}
        >
          Disclaimer
        </button>
        <button
          className="MainQuestions__buttom_up"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <img src={button_up} alt="up" />
        </button>
      </div>

      <div className="MainQuestions__block-inform">
        <div
          ref={togleHowItWorksRef}
          className="MainQuestions__inform  MainQuestions__inform-block"
        >
          <h2 className="MainQuestions__inform-title">HOW IT WORKS</h2>
          <ul className="MainQuestions__inform-text">
            <li>
              Introducing SmartLottery: a fully decentralized lottery platform,
              ensuring fair and transparent gameplay for all participants.
              Thanks to its smart contract foundation, no one can manipulate
              results, withhold payouts, or impose taxes.
            </li>
            <li>
              SmartLottery runs on a verifiable smart contract, with winning
              numbers generated through a collective, player-controlled random
              algorithm. This ensures a level playing field for all, as no
              single individual has control over the outcome.
            </li>
            <li>
              To participate, simply pick your lucky numbers and join the smart
              contract with a 1 Matic entry fee. Drawings take place three times
              a week - on Mondays, Wednesdays, and Fridays. The exact draw
              timings remain unpredictable due to the random algorithm,
              preventing any potential manipulation of the blockchain,
              especially when stakes are high.
            </li>
            <li>
              Match one or more numbers, and you'll win a prize based on the
              payout chart. You can then easily withdraw your winnings using the
              same crypto wallet you used to enter the lottery. The grand
              jackpot goes to the player(s) who successfully match all six
              numbers. If no one hits the jackpot, the remaining funds roll over
              to the next round, further increasing the jackpot amount.
            </li>
            <li>
              Stakers and partners receive only 30% of the total funds collected
              each round, a notably lower share compared to the 50% typically
              withheld by traditional lotteries. Join SmartLottery today for a
              fair, transparent, and decentralized lottery experience!
            </li>
          </ul>
          <Link
            to="/read-white-paper-list"
            className="MainQuestions__button MainQuestions__button-governance"
          >
            Read white paper
          </Link>

          <Link
            to="/Smart_Lottery_White_Paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="MainQuestions__button MainQuestions__button-governance"
          >
            Download White Paper PDF
          </Link>

          <Link
            to="https://polygonscan.com/address/0x001201d9d2b2ebf54a2f5581670bfd3d25fcfe1d"
            target="_blank"
            rel="noopener noreferrer"
            className="MainQuestions__button MainQuestions__button-governance"
          >
            Explore contract on Polygonscan
          </Link>

          <Link
            to="https://github.com/Smart-Lottery/Public/tree/master"
            target="_blank"
            rel="noopener noreferrer"
            className="MainQuestions__button MainQuestions__button-governance"
          >
            See code on GitHub
          </Link>
        </div>

        <div
          ref={toglePayoutSructureRef}
          className="MainQuestions__inform MainQuestions__inform-block"
        >
          <h2 className="MainQuestions__inform-title MainQuestions__inform-title-payout">
            Payout structure
          </h2>
          <div className="MainQuestions__desktop-hiden">
            <Payouts exchangeRate={exchangeRate} balance={balance} />
          </div>
          <div className="MainQuestions__phone-hiden">
            <PayoutsDescktop exchangeRate={exchangeRate} balance={balance} />
          </div>
        </div>

        <div
          ref={togleTokenAndGovernanceRef}
          className="MainQuestions__inform  MainQuestions__inform-block"
        >
          <h2 className="MainQuestions__inform-title">Token and Governance</h2>
          <ul className="MainQuestions__inform-text">
            <li>
              SmartLotteryTokens (SLT): your opportunity to participate in
              protocol governance and earn a share of the collected fees. There
              are 10,000 SLT tokens minted at the start of the project. Only 2%
              can be minted additionally every month. With a total supply
              limited at 1,000,000 tokens. This allows for increase of the token
              supply as the number of users grows and prevents from devaluation
              of the tokens long term.
            </li>
            <li>
              As a SLT holder, you'll enjoy a share of the fees accumulated by
              the protocol each round. Your share is calculated as 10% of the
              total entry fees for that round, proportionate to your SLT
              holdings. Additionally, SLT holders can actively participate in
              the decision-making process by voting on proposed contract changes
              and approving spending requests submitted by the contract manager.
            </li>
            <li>
              Not only can you trade your SLT tokens with others, but you can
              also enjoy a competitive exchange rate of 1 SLT = 1 Matic. [this
              number should be accessed from the contract].
            </li>
          </ul>
          <Link
            to="/governance"
            className="MainQuestions__button MainQuestions__button-governance"
          >
            Learn more and buy token
          </Link>
        </div>
        <div
          ref={togleIWantTheSameDAppRef}
          className="MainQuestions__inform  MainQuestions__inform-block"
        >
          <h2 className="MainQuestions__inform-title">I want the same DApp!</h2>
          <p className="MainQuestions__inform-text">
            No one 'owns' this lottery. It is a smart contract that runs on
            Ethereum. The idea behind this is to create a large jackpot, where
            the contract is owned by no one but can be used by anyone to profit
            from it. To participate in the lottery, anyone can build a website
            and connect it to the SmartLotteryContract by adding their wallet
            number for players to enter. By doing so, you will receive 15% of
            the entrance fees collected from your website
          </p>
          <Link
            to="/partners"
            className="MainQuestions__button MainQuestions__button-governance"
          >
            Read the documentation
          </Link>
        </div>

        <div
          ref={togleDisclaimerRef}
          className="MainQuestions__inform MainQuestions__inform-block"
        >
          <h2 className="MainQuestions__inform-title">Disclaimer</h2>
          <p className="MainQuestions__inform-text">
            This website solely functions as an interface for interacting with
            the smart contract on Polygon chain at address
            0x001201D9D2B2EbF54a2F5581670bfd3d25FCFe1D and does not organize,
            facilitate, endorse, or promote any lottery, gambling activity, or
            related services. Participation in this smart contract may be deemed
            illegal in certain jurisdictions, and users are advised to verify
            the legality of such activities in their respective countries or
            territories before engaging.
          </p>
          <br></br>
          <p className="MainQuestions__inform-text">
            The owner of the website and its associated domain assumes no
            responsibility for any legal claims, consequences, or proceedings
            arising from interactions with the smart contract or any actions
            taken by the participants. The website and its services are provided
            on an "as-is" basis, with no warranties or guarantees regarding the
            accuracy, reliability, or completeness of the content or
            functionalities. There may be potential bugs, errors, or other
            issues that the website owner may not be aware of, and users
            interact with the smart contract at their own risk.
          </p>
        </div>
      </div>
    </div>
  );
};
