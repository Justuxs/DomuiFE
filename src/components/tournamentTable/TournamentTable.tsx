import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { tournamentUrl } from "../../api/endpoints";
import Round from "./Round";
import "./TournamentTable.css";
import {
  findIndexInArray,
  findRoundsAndMatches,
  totalAmountOfMatches,
  tournamentDetailsFromMatches,
  winnerNextPath,
  previousGame,
  canDecrease,
} from "../../utils/tournamentUtils";
import { Details, Game } from "./TournamentModels";
import Lines from "./Lines";
import sendRequest from "../../api/fetch";

const TournamentTable: React.FC = () => {
  const { id } = useParams();
  const [bracket, setBracket] = useState<Game[]>([]);
  const [details, setDetails] = useState<Details[]>([]);
  const [name, setName] = useState<string>("");
  const [bestOfScore, setBestOfScore] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await sendRequest(`${tournamentUrl}/${id}`, "GET", "");
      const bracketList = JSON.parse(res.message).matchList;
      const tournamentName = JSON.parse(res.message).name;
      const playingTill = JSON.parse(res.message).score;
      setBracket(bracketList);
      setName(tournamentName);
      setBestOfScore(playingTill);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDetails(tournamentDetailsFromMatches(bracket));
  }, [bracket]);

  const roundsAndMatches: number[][] = findRoundsAndMatches(details);
  const noRounds: number = roundsAndMatches.length;
  const amountOfMatches: number = totalAmountOfMatches(details);

  const handleSave = async () => {
    await sendRequest(`${tournamentUrl}/${id}`, "PUT", JSON.stringify(bracket));
  };

  const advance = (copyOfObject: Game): void => {
    const nextWinnerMatch: number = winnerNextPath(copyOfObject.match, details[0].matchCount);
    const indexOfNextGame: number = findIndexInArray(bracket, nextWinnerMatch);
    const newState: Game[] = [...bracket];
    const newObjectToUpdate: Game = newState[indexOfNextGame];
    const winnerId =
      copyOfObject.playerWinner === copyOfObject.playerOne ? copyOfObject.playerOneId : copyOfObject.playerTwoId;
    if (copyOfObject.match / 2 + details[0].matchCount === nextWinnerMatch) {
      newObjectToUpdate.playerTwo = copyOfObject.playerWinner;
      newObjectToUpdate.playerTwoId = winnerId;
    } else {
      newObjectToUpdate.playerOne = copyOfObject.playerWinner;
      newObjectToUpdate.playerOneId = winnerId;
    }
    newState[indexOfNextGame] = newObjectToUpdate;
    setBracket(newState);
  };

  const checkIfWonAndUpdate = (indexOfMatch: number): void => {
    const newState: Game[] = [...bracket];
    const gameToCheck: Game = newState[indexOfMatch];
    if (
      gameToCheck.playerOneScore === bestOfScore ||
      (gameToCheck.playerTwoScore === bestOfScore && !gameToCheck.playerWinner)
    ) {
      gameToCheck.playerWinner =
        gameToCheck.playerOneScore > gameToCheck.playerTwoScore ? gameToCheck.playerOne : gameToCheck.playerTwo;
    }
    newState[indexOfMatch] = gameToCheck;
    setBracket(newState);
    if (gameToCheck.match !== amountOfMatches && gameToCheck.playerWinner) {
      advance(gameToCheck);
    }
  };

  const increaseScore = (matchNumber: number, option: string): void => {
    const newState: Game[] = [...bracket];
    const indexOfMatch: number = findIndexInArray(bracket, matchNumber);
    const gameToUpdate: Game = bracket[indexOfMatch];
    if (
      !gameToUpdate.playerWinner &&
      gameToUpdate.playerOne &&
      gameToUpdate.playerTwo &&
      gameToUpdate.playerOneScore < bestOfScore &&
      gameToUpdate.playerTwoScore < bestOfScore
    ) {
      // eslint-disable-next-line no-unused-expressions
      option === "playerOne" ? (gameToUpdate.playerOneScore += 1) : (gameToUpdate.playerTwoScore += 1);
    }
    newState[indexOfMatch] = gameToUpdate;
    setBracket(newState);
    checkIfWonAndUpdate(indexOfMatch);
  };

  const updateStateIfScoreNegative = (
    matchNumber: number,
    round: number,
    option: string,
    currentObject: Game
  ): void => {
    const copyOfCurrentGame = { ...currentObject };
    const userToUpdate: string = option === "playerOne" ? currentObject.playerOne : currentObject.playerTwo;
    const idToUpdate: number = option === "playerOne" ? currentObject.playerOneId : currentObject.playerTwoId;
    const previousGameObj: Game | undefined = previousGame(
      bracket,
      roundsAndMatches,
      currentObject.match,
      round,
      userToUpdate
    );
    if ((currentObject.playerOneScore < 0 || currentObject.playerTwoScore < 0) && previousGameObj) {
      copyOfCurrentGame.playerOneScore = 0;
      copyOfCurrentGame.playerTwoScore = 0;
      // eslint-disable-next-line no-unused-expressions
      copyOfCurrentGame.playerOne = copyOfCurrentGame.playerOne === userToUpdate ? "" : copyOfCurrentGame.playerOne;
      copyOfCurrentGame.playerOneId = copyOfCurrentGame.playerOneId === idToUpdate ? 0 : copyOfCurrentGame.playerOneId;
      // eslint-disable-next-line no-unused-expressions
      copyOfCurrentGame.playerTwo = copyOfCurrentGame.playerTwo === userToUpdate ? "" : copyOfCurrentGame.playerTwo;
      copyOfCurrentGame.playerTwoId = copyOfCurrentGame.playerTwoId === idToUpdate ? 0 : copyOfCurrentGame.playerTwoId;
      const newState: Game[] = [...bracket];
      const indexOfMatch: number = findIndexInArray(bracket, currentObject.match);
      newState[indexOfMatch] = copyOfCurrentGame;
      if (previousGameObj) {
        previousGameObj.playerWinner = "";
        // eslint-disable-next-line no-unused-expressions
        previousGameObj.playerOne === userToUpdate
          ? (previousGameObj.playerOneScore -= 1)
          : (previousGameObj.playerTwoScore -= 1);
        const indexOfPreviousMatch: number = findIndexInArray(bracket, previousGameObj?.match);
        newState[indexOfPreviousMatch] = previousGameObj;
      }
      setBracket(newState);
    }
  };

  const decreaseScore = (matchNumber: number, round: number, option: string): void => {
    const newState = [...bracket];
    const indexOfMatch = findIndexInArray(bracket, matchNumber);
    const objectToUpdate = bracket[indexOfMatch];
    const userToUpdate = option === "playerOne" ? objectToUpdate.playerOne : objectToUpdate.playerTwo;
    if (canDecrease(bracket, roundsAndMatches, details, objectToUpdate, userToUpdate, round)) {
      // eslint-disable-next-line no-unused-expressions
      option === "playerOne" ? (objectToUpdate.playerOneScore -= 1) : (objectToUpdate.playerTwoScore -= 1);
      objectToUpdate.playerWinner = "";
    }
    newState[indexOfMatch] = objectToUpdate;
    setBracket(newState);
    updateStateIfScoreNegative(matchNumber, round, option, objectToUpdate);
  };

  if (details.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
      <Typography variant="h6">{name}</Typography>
      <div
        className="bracket-grid"
        style={{
          gridTemplateRows: `repeat(${5 * roundsAndMatches[0].length},var(--grid-row-height))`,
          gridTemplateColumns: `repeat(${noRounds}, 3em minmax(12em, 12em)`,
        }}
      >
        {roundsAndMatches.map((roundMatches: number[], i: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            <Round
              /* eslint-disable-next-line react/no-array-index-key */
              key={`roundId${i}${1}`}
              round={i + 1}
              matchArray={roundMatches}
              bracket={bracket}
              roundMatchArray={roundsAndMatches}
              increaseScore={increaseScore}
              decreaseScore={decreaseScore}
            />
            {/* eslint-disable-next-line react/no-array-index-key */}
            <Lines key={`${i}uniqID`} round={i + 1} roundMatchArray={roundsAndMatches} />
          </React.Fragment>
        ))}
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default TournamentTable;
