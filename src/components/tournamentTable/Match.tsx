import React from "react";
import "./TournamentTable.css";
import { findIndexInArray } from "../../utils/tournamentUtils";
import { Game } from "./TournamentModels";

export interface IMatchProps {
  round: number;
  match: number;
  bracket: Game[];
  roundMatchArray: number[][];
  increaseScore(match: number, option: string): void;
  decreaseScore(matchNumber: number, round: number, option: string): void;
}

const Match: React.FC<IMatchProps> = ({ round, match, bracket, roundMatchArray, increaseScore, decreaseScore }) => {
  const indexOfBracket: number = findIndexInArray(bracket, match);
  const calculateSpan = (): number => {
    if (roundMatchArray[round - 1][0] === match) {
      return (roundMatchArray[0].length * 4) / roundMatchArray[round - 1].length / 2 - 1;
    }
    return ((roundMatchArray[0].length * 4) / roundMatchArray[round - 1].length / 2 - 1) * 2 - 1;
  };
  const isWinner = (player: string): boolean => {
    return bracket[indexOfBracket]?.playerWinner === player && bracket[indexOfBracket]?.playerWinner !== "";
  };

  return (
    <>
      <div className={`bracket-spacer round${round}`} style={{ gridRow: `span ${calculateSpan()}` }} />
      <div className={`bracket-team round${round} noselect`}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div
          className={`bracket-team round${round}`}
          onClick={() => increaseScore(match, "playerOne")}
          onContextMenu={(e) => {
            e.preventDefault();
            decreaseScore(match, round, "playerOne");
          }}
        >
          <div
            className="bracket-team-name"
            style={isWinner(bracket[indexOfBracket]?.playerOne) ? { fontWeight: `bold` } : {}}
          >
            {bracket[indexOfBracket]?.playerOne}
            <span>&nbsp;</span>
          </div>
          <div
            className="bracket-team-points"
            style={isWinner(bracket[indexOfBracket]?.playerOne) ? { fontWeight: `bold` } : {}}
          >
            {bracket[indexOfBracket]?.playerOneScore}
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div
          className={`bracket-team round${round}`}
          onClick={() => increaseScore(match, "playerTwo")}
          onContextMenu={(e) => {
            e.preventDefault();
            decreaseScore(match, round, "playerTwo");
          }}
        >
          <div
            className="bracket-team-name"
            style={isWinner(bracket[indexOfBracket]?.playerTwo) ? { fontWeight: `bold` } : {}}
          >
            {bracket[indexOfBracket]?.playerTwo}
            <span>&nbsp;</span>
          </div>
          <div
            className="bracket-team-points"
            style={isWinner(bracket[indexOfBracket]?.playerTwo) ? { fontWeight: `bold` } : {}}
          >
            {bracket[indexOfBracket]?.playerTwoScore}
          </div>
        </div>
      </div>
      <div className={`bracket-spacer round${round}`} />
    </>
  );
};

export default Match;
