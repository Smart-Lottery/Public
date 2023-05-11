import "./ChooseNumbers.scss";
import { useState, useEffect } from "react";

export const ChooseNumbers = ({
  handleNumberChange,
  handleSuperNumberChange,
  numberOfRoundstoEnter,
  handleNumberOfRoundsInput,
  numbers,
  SuperNumber,
  onSubmit,
  random,
  handleDeleteNumber,
  handleDeleteSuperNumber,
}) => {
  let start = 1;
  const numbersAll = [];
  const numbersClass = {};
  while (start < 70) {
    numbersAll.push(start++);
    numbersClass[start - 2] = `choose-numbers__item--${start - 1}`;
  }

  const [classNumber, setClassNumber] = useState(numbersClass);

  let startSuper = 1;
  const numbersSuper = [];
  const numbersClassSuper = {};
  while (startSuper < 26) {
    numbersSuper.push(startSuper++);
    numbersClassSuper[startSuper - 2] = `choose-numbers__item-super--${
      startSuper - 1
    }`;
  }

  const [classNumberSuper, setClassNumberSuper] = useState(numbersClassSuper);

  const deleteNumber = (number) => {
    setClassNumber({
      ...classNumber,
      [number - 1]: `choose-numbers__item--${number}`,
    });
    handleDeleteNumber(number);
  };

  const deleteSuperNumber = (number) => {
    setClassNumberSuper({
      ...classNumberSuper,
      [number - 1]: `choose-numbers__item-super--${number}`,
    });
    handleDeleteSuperNumber();
  };

  const handleNumber = (number) => {
    if (
      classNumber[number - 1] !== `choose-numbers__item-active--${number}` &&
      numbers.length < 5
    ) {
      setClassNumber({
        ...classNumber,
        [number - 1]: `choose-numbers__item-active--${number}`,
      });
    } else {
      setClassNumber({
        ...classNumber,
        [number - 1]: `choose-numbers__item--${number}`,
      });
    }
    handleNumberChange(number);
  };

  const handleNumberSuper = (number) => {
    if (
      SuperNumber === "" &&
      classNumberSuper[number - 1] !==
        `choose-numbers__item-super-active--${number}`
    ) {
      setClassNumberSuper({
        ...classNumberSuper,
        [number - 1]: `choose-numbers__item-super-active--${number}`,
      });
    } else {
      setClassNumberSuper({
        ...classNumberSuper,
        [number - 1]: `choose-numbers__item-super--${number}`,
      });
    }
    handleSuperNumberChange(number);
  };

  const randomClassActive = () => {
    setClassNumber({
      ...classNumber,
      [numbers[0] - 1]: `choose-numbers__item-active--${numbers[0]}`,
      [numbers[1] - 1]: `choose-numbers__item-active--${numbers[1]}`,
      [numbers[2] - 1]: `choose-numbers__item-active--${numbers[2]}`,
      [numbers[3] - 1]: `choose-numbers__item-active--${numbers[3]}`,
      [numbers[4] - 1]: `choose-numbers__item-active--${numbers[4]}`,
    });
    setClassNumberSuper({
      ...classNumberSuper,
      [SuperNumber - 1]: `choose-numbers__item-super-active--${SuperNumber}`,
    });
  };

  const randomClassDisactive = () => {
    setClassNumber({
      ...classNumber,
      [numbers[0] - 1]: `choose-numbers__item--${numbers[0]}`,
      [numbers[1] - 1]: `choose-numbers__item--${numbers[1]}`,
      [numbers[2] - 1]: `choose-numbers__item--${numbers[2]}`,
      [numbers[3] - 1]: `choose-numbers__item--${numbers[3]}`,
      [numbers[4] - 1]: `choose-numbers__item--${numbers[4]}`,
    });

    setClassNumberSuper({
      ...classNumberSuper,
      [SuperNumber - 1]: `choose-numbers__item-super--${SuperNumber}`,
    });
  };

  const handleRandom = (event) => {
    event.preventDefault();
    randomClassDisactive();
    random();
  };

  useEffect(() => {
    randomClassActive();
  }, [numbers, SuperNumber]);

  return (
    <div className="choose-numbers">
      <h2 className="choose-numbers__title choose-numbers__instruction-desktop">
        Choose your numbers to play!
      </h2>
      <button
        onClick={(e) => handleRandom(e)}
        className="choose-numbers__button choose-numbers__button-random"
      >
        RANDOM PICK
      </button>
      <p className="choose-numbers__instruction-main">
        Enter the lottery by inputting 5 numbers and 1 Super Number
      </p>
      <section className="choose-numbers__block">
        <article className="choose-numbers__block-item">
          <h3 className="choose-numbers__instruction">
            Enter 5 numbers from 1 to 69
          </h3>
          <div className="choose-numbers__row">
            {numbersAll.map((number, index) => (
              <button
                key={index}
                className={classNumber[number - 1]}
                onClick={() => handleNumber(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </article>
        <article className="choose-numbers__block-item">
          <h3 className="choose-numbers__instruction choose-numbers__instruction-super">
            Enter 1 numbers from 1 to 25
          </h3>
          <div className="choose-numbers__row choose-numbers__row-super">
            {numbersSuper.map((number, index) => (
              <button
                key={index}
                className={classNumberSuper[number - 1]}
                onClick={() => handleNumberSuper(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </article>
      </section>
      <div className="choose-numbers__drawings-block">
        <div className="choose-numbers__drawings-block-right">
          <h3 className="choose-numbers__title choose-numbers__title-your-bet choose-numbers__instruction-super ">
            Your bet is
          </h3>
          <h4 className="choose-numbers__drawings-instructions choose-numbers__instruction ">
            Select how many drawings you would like to participate in
          </h4>
          <div className="choose-numbers__drawings">
            <input
              className="choose-numbers__drawings-input"
              type="number"
              placeholder="000"
              value={numberOfRoundstoEnter}
              onChange={(event) => handleNumberOfRoundsInput(event)}
            />
            <span>ROUNDS</span>
          </div>
          <div className="choose-numbers__bet-continer">
            <div className="choose-numbers__your-bet">
              <button
                onClick={() => deleteNumber(numbers[0])}
                className="choose-numbers__your-bet-item"
              >
                {numbers[0]}
              </button>
              <button
                onClick={() => deleteNumber(numbers[1])}
                className="choose-numbers__your-bet-item"
              >
                {numbers[1]}
              </button>
              <button
                onClick={() => deleteNumber(numbers[2])}
                className="choose-numbers__your-bet-item"
              >
                {numbers[2]}
              </button>
              <button
                onClick={() => deleteNumber(numbers[3])}
                className="choose-numbers__your-bet-item"
              >
                {numbers[3]}
              </button>
              <button
                onClick={() => deleteNumber(numbers[4])}
                className="choose-numbers__your-bet-item"
              >
                {numbers[4]}
              </button>
              <button
                onClick={() => deleteSuperNumber(SuperNumber)}
                className="choose-numbers__your-bet-item choose-numbers__your-bet-item-super"
              >
                {SuperNumber}
              </button>
            </div>
            <button
              onClick={onSubmit}
              className="choose-numbers__button choose-numbers__enter"
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
{/* 
      <div className="choose-numbers__exchanges-bet"> */}
        {/* <div className="choose-numbers__exchanges">
          <h3 className="choose-numbers__instruction choose-numbers__instruction-super">
            <p className="choose-numbers__instal-metamask">
              You need to install MetaMask or similar wallet to connect to
              Crypto Lottery app
            </p>
            <p className="choose-numbers__instal-metamask-two">
              Need to buy crypto?<br></br> Check these popular exchanges: 
            </p>
          </h3>
          <div className="choose-numbers__exchanges-binanse">
          </div>
          <div className="choose-numbers__exchanges-coinbase">
          </div>
         <div className="choose-numbers__exchanges-etoro"
>        </div>
          
        </div> */}
      {/* </div> */}
    </div>
  );
};
