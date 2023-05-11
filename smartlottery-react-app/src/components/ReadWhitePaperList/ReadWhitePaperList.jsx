import "./ReadWhitePaperList.scss";

export const ReadWhitePaperList = () => {
  return (
    <div className="read-white">
      <h1 className="read-white__title-main">Decentralized Smart Lottery</h1>
      <div className="read-white__item">
        <h2 className="read-white__title">Abstract</h2>
        <div className="read-white__text">
          This white paper presents the concept and design of a fully
          decentralized, transparent, and autonomous lottery system implemented
          as a smart contract on the blockchain. The Smart Lottery contract
          allows anyone to participate in the lottery and generate winning
          numbers without a central authority or operator. This paper also
          suggests potential next steps in the development of the Smart Lottery
          contract to enhance security, improve user experience, and increase
          the adoption of the decentralized lottery system.
        </div>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">Introduction</h2>
        <div className="read-white__text">
          The traditional lottery industry is dominated by centralized systems,
          often managed by governments or private entities, which control ticket
          sales, draws, and payouts. These systems lack transparency, have high
          operating costs, and are prone to manipulation or fraud. Decentralized
          blockchain technology offers an opportunity to revolutionize the
          lottery industry by providing a trustless, transparent, and secure
          platform for conducting lotteries.
        </div>
        <div className="read-white__text">
          The Smart Lottery contract proposed in this paper is a decentralized
          application (dApp) built on the blockchain network, utilizing smart
          contract technology to ensure that no single entity owns or operates
          the lottery. Participants can interact with the contract directly, and
          the contract autonomously manages the lottery process, including
          ticket sales, random number generation, and prize distribution.
        </div>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">Smart Lottery Contract Design</h2>
        <p className="read-white__text">
          The Smart Lottery contract contains the following key components:
        </p>
        <p className="read-white__text">
          Ticket Sales: Participants can purchase tickets by sending tokens to
          the contract, which are then used as the prize pool. The initial
          implementation uses Matic tokens. The contract records each ticket
          purchase, associating the ticket with the buyer's address.
        </p>
        <p className="read-white__text">
          Random Number Generation: The generateNumbers function in the contract
          is designed to be triggered by anyone, initiating the random number
          generation process for the lottery draw. The contract uses a
          combination of user-provided entropy and on-chain data, such as block
          hashes, to generate a sufficiently random and unpredictable winning
          number.
        </p>
        <p className="read-white__text">
          Prize Distribution: Once the winning numbers are generated, the
          contract autonomously identifies the winning tickets and distributes
          the prize pool accordingly. Winners can claim their prizes by
          interacting with the contract, which transfers the tokens directly to
          their wallets.
        </p>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">Decentralization and Security</h2>
        <div className="read-white__text">
          The Smart Lottery contract is designed to ensure full decentralization
          and security by leveraging the features of the blockchain network and
          smart contract best practices:
        </div>
        <div className="read-white__text">
          No Central Authority: The contract operates autonomously without any
          central authority, ensuring that no single party can control or
          manipulate the lottery process.
        </div>
        <div className="read-white__text">
          Transparency: All transactions and lottery events are recorded on the
          blockchain blockchain, providing full transparency and enabling
          participants to audit the lottery process independently.
        </div>
        <div className="read-white__text">
          Security: The contract is developed with security in mind,
          implementing safe arithmetic operations and mitigating common smart
          contract vulnerabilities, such as reentrancy attacks and integer
          overflows/underflows.
        </div>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">
          Main Participants in the Smart Lottery Contract
        </h2>
        <div className="read-white__text">
          The Smart Lottery is implemented as a smart contract that can be run
          on popular chains like Ethereum or layer 2 chains like blockchain,
          Arbitrum or Optimism.The Smart Lottery contract is designed to be a
          decentralized and autonomous system, with several key participants
          playing vital roles in its operation. These participants include:
        </div>
        <div className="read-white__text">
          Owner: The Owner is the entity responsible for deploying the Smart
          Lottery contract. It is essential to emphasize that the Owner does not
          own or control the lottery; they only launch the contract and perform
          functions based on the decisions made by the Smart Lottery Token
          holders. The Owner can be a single individual or a community that has
          access to the wallet with the registered "Owner" address.
        </div>
        <div className="read-white__text">
          Players: Players are individuals or entities that participate in the
          lottery by purchasing tickets and submitting their chosen numbers.
          They interact with the contract by entering the lottery, checking
          their results, and withdrawing their prizes if they have won.
        </div>
        <div className="read-white__text">
          Token Holders: Smart Lottery Token holders are essential stakeholders
          in the ecosystem. They play a crucial role in decision-making
          processes and benefit from a share of the fees generated through
          lottery registrations. Token holders can also contribute to the prize
          pool by adding funds for specific rounds, enhancing the attractiveness
          of the lottery and incentivizing more participants to join.
        </div>
        <div className="read-white__text">
          Partners: Partners are entities or individuals who facilitate the
          registration of new players in the Smart Lottery. They promote the
          lottery, onboard new participants, and receive a fee based on the
          number of registrations they facilitate for each round. Partners
          contribute to the growth and popularity of the Smart Lottery by
          attracting new players and increasing the overall prize pool.
        </div>
        <div className="read-white__text">
          These participants interact and work together to create a
          decentralized, transparent, and fair lottery system that operates
          autonomously on blockchain. Each participant plays a distinct role,
          and their combined efforts ensure the smooth operation and ongoing
          development of the Smart Lottery ecosystem.
        </div>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">How does the Lottery Works</h2>
        <div className="read-white__text">
          The core functions of the contract ensure smooth operation, prize
          distribution, and accessibility for participants. Here are the main
          functions and how they work together:
        </div>
        <div className="read-white__text">
          Set Entry Ticket Price: The contract owner can set the price of the
          entry ticket using the setEntryTicket function. This ensures that the
          price remains dynamic and can be adjusted according to market
          conditions.This parameter will be decided by the voting of Smart
          Lottery Token holders.
        </div>
        <div className="read-white__text">
          Enter the Lottery: Participants can enter the lottery by calling the
          enter function, which requires them to submit their chosen numbers and
          the required entry fee. The contract ensures that the numbers are
          within the specified range and records the player's entry.
        </div>
        <div className="read-white__text">
          Generate Numbers: The lottery numbers are generated by calling the
          generateNumbers function. This function uses a combination of
          blockchain variables, such as block timestamp and difficulty, to
          generate random numbers within the specified range. The generated
          numbers are then stored in the contract for future reference.
        </div>
        <div className="read-white__text">
          View Generated Numbers: Participants can view the generated numbers
          for a specific round by calling the viewGeneratedNumbers function.
          This allows them to check the winning numbers and compare them with
          their own entries.
        </div>
        <div className="read-white__text">
          Check Player Results: The contract provides a function
          checkPlayerForRoundDetailed that allows participants to see how many
          numbers they have guessed correctly and if they have guessed the
          supernumber. This function is essential for determining the prize
          payouts.
        </div>
        <div className="read-white__text">
          Withdraw Prizes: If a participant has guessed the correct numbers,
          they can withdraw their prize using the withdrawPrize function. The
          contract calculates the prize amount based on the number of correctly
          guessed numbers and transfers the prize to the participant's address.
        </div>
        <div className="read-white__text">
          Add Funds: The contract allows users to add funds to the prize pool
          for a specific round by calling the addFunds function. This can help
          increase the potential winnings and attract more participants.
        </div>

        <div className="read-white__text">
          Withdraw Stakers Fees: Token holders can withdraw their portion of the
          fees for a round using the withdrawStakersFees function. The portion
          of the fees is calculated based on the token holder's share in the
          total token supply.
        </div>
        <div className="read-white__text">
          Withdraw Partners Fee: Partners can withdraw their fees for a specific
          round by calling the withdrawPartnersFee function. The fee is based on
          the number of registrations the partner has facilitated for that
          round.
        </div>
        <div className="read-white__text">
          All of the parameters of the contract and respective upgrades will be
          decided by the voting on Smart Lottery Contract Token holders.
        </div>

        <div className="read-white__text">
          By combining these functions, the Smart Lottery contract creates a
          decentralized lottery system that is transparent, secure, and
          accessible to all participants. Prizes are paid out automatically and
          fairly, ensuring that the lottery process remains trustworthy and
          autonomous.
        </div>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">Next Steps in Development</h2>
        <div className="read-white__text">
          To further enhance the Smart Lottery contract and its adoption, the
          following next steps are recommended:
        </div>
        <div className="read-white__text">
          Auditing and Testing: Conduct thorough third-party audits and
          extensive testing to ensure the contract's security, reliability, and
          efficiency.
        </div>
        <div className="read-white__text">
          User Interface Development: Develop multiple user-friendly interfaces
          (web or mobile applications) to facilitate user interaction with the
          Smart Lottery contract, making it more accessible to a wider audience.
        </div>
        <div className="read-white__text">
          Multi-Token Support: Implement support for multiple tokens, allowing
          users to participate in the lottery using various cryptocurrencies,
          potentially increasing adoption.
        </div>
        <div className="read-white__text">
          Scaling and Optimization: Explore layer-2 scaling solutions and
          contract optimizations to reduce transaction fees and increase the
          lottery's efficiency.
        </div>
        <div className="read-white__text">
          Community Engagement: Engage with the community through social media,
          forums, and community-driven events to raise awareness about the Smart
          Lottery contract and gather user feedback for continuous improvement.
        </div>
        <div className="read-white__text">
          Building functionality to participate in the lottery without having
          crypto assets. In order to facilitate lottery usage outside of the
          world of crypto native users, the functionality to issue digital
          tickets will be used.
        </div>
      </div>

      <div className="read-white__item">
        <h2 className="read-white__title">Conclusion</h2>
        <div className="read-white__text">
          The Smart Lottery contract presents a novel approach to the lottery
          industry, leveraging the power of decentralized blockchain technology
          to create a transparent, autonomous, and secure lottery system. By
          eliminating the need for a central authority, the Smart Lottery
          contract ensures that participants can trust the fairness and
          integrity of the lottery process.
        </div>
        <div className="read-white__text">
          The potential next steps in development, such as auditing, user
          interface development, multi-token support, scaling, and community
          engagement, will further enhance the Smart Lottery contract's
          usability and adoption. By continuing to refine the contract and
          actively engaging with the community, the Smart Lottery has the
          potential to revolutionize the lottery industry and become a model for
          future decentralized applications.
        </div>
      </div>
    </div>
  );
};
