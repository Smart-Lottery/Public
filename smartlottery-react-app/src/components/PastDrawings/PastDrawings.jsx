import { useState } from "react";
import "./PastDrawings.scss";
import { MoreResults } from "../../components/MoreResults/MoreResults";

export const PastDrawings = ({
  generatedNumbers,
  generatedSuperNumber,
  generatedNumbersAll,
  handleSearchPastDrawings,
  loaderSearchPastDrawings,
}) => {
  const [togleMoreResult, setTogleMoreResult] = useState(false);

  const hanleMoreResult = () => {
    setTogleMoreResult(!togleMoreResult);
  };

  return (
    <div className="past-drawings">
      <div className="past-drawings__container-result">
        <h2 className="past-drawings__title">Past drawings:</h2>
        <div className="past-drawings__container-result-button">
          <div className="past-drawings__result">
            <div className="past-drawings__result-item">
              {generatedNumbers[0]}
            </div>
            <div className="past-drawings__result-item">
              {generatedNumbers[1]}
            </div>
            <div className="past-drawings__result-item">
              {generatedNumbers[2]}
            </div>
            <div className="past-drawings__result-item">
              {generatedNumbers[3]}
            </div>
            <div className="past-drawings__result-item">
              {generatedNumbers[4]}
            </div>
            <div className="past-drawings__result-item">
              {generatedSuperNumber}
            </div>
          </div>
          <button className="past-drawings__button" onClick={hanleMoreResult}>
          {togleMoreResult ? 
          (<p className="past-drawings__button-hide">Hide results</p>
          ) : (
            <p className="past-drawings__button-visible">More results</p>
          )}
        
          </button>
         
        </div>
      </div>
      <MoreResults
        togleMoreResult={togleMoreResult}
        generatedNumbersAll={generatedNumbersAll}
        handleSearchPastDrawings={handleSearchPastDrawings}
        loaderSearchPastDrawings={loaderSearchPastDrawings}
      />
    </div>
  );
};
