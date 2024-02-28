import "./TournamentTable.css";
import React from "react";

export interface ILineProps {
  round: number;
  roundMatchArray: number[][];
}

const Lines: React.FC<ILineProps> = ({ round, roundMatchArray }) => {
  const calculateSpan = () => (roundMatchArray[0].length * 4) / roundMatchArray[round - 1].length / 2;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {round === roundMatchArray.length ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      ) : (
        <>
          {[...Array(roundMatchArray[round - 1].length / 2)].map((match: number, i: number) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={i}>
                <div
                  className={`bracket-line round${round}`}
                  style={{ gridRow: `span ${i === 0 ? calculateSpan() + 2 : calculateSpan() * 2}` }}
                />
                <div className={`bracket-line z-down round${round}`} style={{ gridRow: `span ${calculateSpan()}` }} />
                <div className={`bracket-line z-up round${round}`} style={{ gridRow: `span ${calculateSpan()}` }} />
              </React.Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

export default Lines;
