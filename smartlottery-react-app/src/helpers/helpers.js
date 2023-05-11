export const CalculationPrize = (balance, guessedNumbers, guessedNumbersSuper) => {
    if (guessedNumbers === "5" && guessedNumbersSuper) {
      return (balance * 70) / 100;
    }
    if (guessedNumbers === "5" && guessedNumbersSuper === false) {
      return 2000000;
    }
    if (guessedNumbers === "4" && guessedNumbersSuper) {
      return 100000;
    }

    if (guessedNumbers === "4" && guessedNumbersSuper === false) {
      return 10000;
    }
    if (guessedNumbers === "3" && guessedNumbersSuper) {
      return 1000;
    }
    if (guessedNumbers === "3" && guessedNumbersSuper === false) {
      return 150;
    }
    if (guessedNumbers === "2" && guessedNumbersSuper) {
      return 200;
    }
    if (guessedNumbers === "2" && guessedNumbersSuper === false) {
      return 30;
    }
    if (guessedNumbers === "1" && guessedNumbersSuper) {
      return 40;
    }
    if (guessedNumbers === "1" && guessedNumbersSuper === false) {
      return 5;
    }
    if (guessedNumbers === "0" && guessedNumbersSuper) {
      return 20;
    }
    if (guessedNumbers === "0" && guessedNumbersSuper === false) {
      return 0;
    }
  };