import React from "react";
import Match from "./Match";
import "./TournamentTable.css";
import { Game } from "./TournamentModels";

export interface IRoundProps {
  round: number;
  matchArray: number[];
  bracket: Game[];
  roundMatchArray: number[][];
  increaseScore(match: number, option: string): void;
  decreaseScore(matchNumber: number, round: number, option: string): void;
}

const Round: React.FC<IRoundProps> = ({
  round,
  matchArray,
  bracket,
  roundMatchArray,
  increaseScore,
  decreaseScore,
}) => {
  return (
    <>
      <div className={`bracket-grid-header round${round}`}>
        <div className="bracket-header-content" style={{ fontWeight: `bold` }}>
          Round {round}
        </div>
      </div>
      {matchArray.map((match: number) => (
        <Match
          key={match}
          round={round}
          match={match}
          bracket={bracket}
          roundMatchArray={roundMatchArray}
          increaseScore={increaseScore}
          decreaseScore={decreaseScore}
        />
      ))}
    </>
  );
};

export default Round;
