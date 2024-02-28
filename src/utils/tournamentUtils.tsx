import { Details, Game } from "../components/tournamentTable/TournamentModels";
import { PlayerProps } from "../components/playerSelectionModal/PlayerSelectionModal";

// Check if provided number can be based of two.
const isBaseOfTwo = (playerCount: number): boolean => Math.log2(playerCount) % 1 === 0;

// Determine if player count is divisible of two
const isEvenCount = (playerCount: number): boolean => playerCount % 2 === 0;

// Needed for splitting players in to two groups
const upperHalfPlayers = (playerCount: number): number => Math.ceil((playerCount + 1) / 2);

// Needed to determine how many "Bye" rounds are given to lower half players
const lowerHalfByes = (byeTotal: number): number => Math.ceil((byeTotal + 1) / 2);

// Calculates number of rounds
const numberOfRounds = (playerCount: number): number => Math.ceil(Math.log2(playerCount));

// returns index of searched match
export const findIndexInArray = (array: Game[], matchToLookFor: number): number =>
  array.findIndex((item) => item.match === matchToLookFor);

// returns total amount of matches
export const totalAmountOfMatches = (details: Details[]): number =>
  details.reduce((accumulator, value) => accumulator + value.matchCount, 0);

// Calculates how many "Bye" rounds are given
const numbOfByes = (playerCount: number): number => {
  if (isBaseOfTwo(playerCount)) {
    return 0;
  }
  const nearestBaseOfTwo = Math.ceil(Math.log2(playerCount));
  return 2 ** nearestBaseOfTwo - playerCount;
};

// Calculates next match number
export const winnerNextPath = (match: number, firstRoundMatches: number): number =>
  Math.round(match / 2) + firstRoundMatches;

export const bestOfOptions: number[] = [1, 3, 5, 7];

// returns paired players, if there are bye rounds, gives those to players.
const playerPairing = (playerList: PlayerProps[], byeCount: number): PlayerProps[][] => {
  const unpairedPlayerList: PlayerProps[] = [...playerList];
  const pairedPlayerList: PlayerProps[][] = [];
  let shouldGiveByeToLastPlayer = true;
  for (let i = 0; i < byeCount; i += 1) {
    if (shouldGiveByeToLastPlayer) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const lastPlayerInList: PlayerProps = unpairedPlayerList.pop()!;
      pairedPlayerList.push([{ ...lastPlayerInList }, { id: -1, name: "--" }]);
      shouldGiveByeToLastPlayer = false;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const firstPlayerInList: PlayerProps = unpairedPlayerList.shift()!;
      pairedPlayerList.push([{ ...firstPlayerInList }, { id: -1, name: "--" }]);
      shouldGiveByeToLastPlayer = true;
    }
  }
  while (unpairedPlayerList.length !== 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastPlayer: PlayerProps = unpairedPlayerList.pop()!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstPlayer: PlayerProps = unpairedPlayerList.shift()!;
    pairedPlayerList.push([firstPlayer, lastPlayer]);
  }
  return pairedPlayerList;
};

// returns multidimensional array of player pairs for first round
const firstRoundPairedPlayerList = (playerList: PlayerProps[]): PlayerProps[][] => {
  if (playerList.length === 2) {
    return playerPairing(playerList, 0);
  }
  const byesCount: number = numbOfByes(playerList.length);
  const upperHalfPlayerCount: number = isEvenCount(playerList.length)
    ? playerList.length / 2
    : upperHalfPlayers(playerList.length);
  const lowerByesCount: number = isEvenCount(playerList.length) ? byesCount / 2 : lowerHalfByes(byesCount);
  const upperByesCount: number = byesCount - lowerByesCount;
  const upperArray: PlayerProps[] = playerList.slice(0, upperHalfPlayerCount);
  const lowerArray: PlayerProps[] = playerList.slice(upperHalfPlayerCount, playerList.length);
  const upper: PlayerProps[][] = playerPairing(upperArray, upperByesCount);
  const lower: PlayerProps[][] = playerPairing(lowerArray, lowerByesCount);
  return [...upper, ...lower];
};

// returns details of game bracket
export const tournamentDetails = (playerList: PlayerProps[]): Details[] => {
  const finalPairedPlayerList: PlayerProps[][] = firstRoundPairedPlayerList(playerList);
  const numMatchesFirstRound: number = finalPairedPlayerList.length;
  let participants: number = numMatchesFirstRound * 2;
  const numbRounds: number = numberOfRounds(participants);
  let tournamentDetailList: Details[] = [];
  for (let i = 1; i <= numbRounds; i += 1) {
    participants = i === 1 ? participants : (participants /= 2);
    tournamentDetailList = [
      ...tournamentDetailList,
      {
        round: i,
        matchCount: participants / 2,
      },
    ];
  }
  return tournamentDetailList;
};

export const tournamentDetailsFromMatches = (matchList: Game[]): Details[] => {
  const numMatchesFirstRound: number = Math.ceil(matchList.length / 2);
  let participants: number = numMatchesFirstRound * 2;
  const numbRounds: number = numberOfRounds(participants);
  let tournamentDetailList: Details[] = [];
  for (let i = 1; i <= numbRounds; i += 1) {
    participants = i === 1 ? participants : (participants /= 2);
    tournamentDetailList = [
      ...tournamentDetailList,
      {
        round: i,
        matchCount: participants / 2,
      },
    ];
  }
  return tournamentDetailList;
};

export const findRoundsAndMatches = (tournamentDetailsList: Details[]): number[][] => {
  const games: number[][] = [];
  const totalNumberOfMatches: number = tournamentDetailsList.reduce(
    (accumulator, value) => accumulator + value.matchCount,
    0
  );
  let prevValue = 0;
  let tempValue = 0;
  for (let i = 0; i < tournamentDetailsList.length; i += 1) {
    const element: number = tournamentDetailsList[i].matchCount;
    prevValue += element;
    tempValue = prevValue - element;
    const arr: number[] = [];
    for (let j = 1; j <= totalNumberOfMatches; j += 1) {
      if (j > tempValue && j <= prevValue) arr.push(j);
    }
    games.push(arr);
  }
  return games;
};

const determineWinnerIfPairedBye = (pair: PlayerProps[]): string => {
  if (pair[0].name === "--" || pair[1].name === "--") {
    return pair[0].name === "--" ? pair[1].name : pair[0].name;
  }
  return "";
};

const createFirstRound = (playerList: PlayerProps[]): Game[] => {
  const firstRoundPlayers = firstRoundPairedPlayerList(playerList);

  let firstRound: Game[] = [];
  for (let i = 0; i < firstRoundPlayers.length; i += 1) {
    firstRound = [
      ...firstRound,
      {
        match: i + 1,
        playerOneId: firstRoundPlayers[i][0].id,
        playerOne: firstRoundPlayers[i][0].name,
        playerOneScore: 0,
        playerTwoId: firstRoundPlayers[i][1].id,
        playerTwo: firstRoundPlayers[i][1].name,
        playerTwoScore: 0,
        playerWinner: determineWinnerIfPairedBye(firstRoundPlayers[i]),
      },
    ];
  }
  return firstRound;
};

const advance = (matchState: Game[], match: Game, tournamentDet: Details[]): Game[] => {
  const array: Game[] = matchState;
  const nextMatch: number = winnerNextPath(match.match, tournamentDet[0].matchCount);
  const indexOfBracket: number = findIndexInArray(matchState, nextMatch);
  const determinePosition: number = match.match / 2 + tournamentDet[0].matchCount;
  if (determinePosition === nextMatch) {
    array[indexOfBracket].playerTwoId = match.playerOne === match.playerWinner ? match.playerOneId : match.playerTwoId;
    array[indexOfBracket].playerTwo = match.playerWinner;
  } else {
    array[indexOfBracket].playerOneId = match.playerOne === match.playerWinner ? match.playerOneId : match.playerTwoId;
    array[indexOfBracket].playerOne = match.playerWinner;
  }
  return array;
};

const advancePlayersInByeRounds = (matchState: Game[], tournamentDet: Details[]): Game[] => {
  const matchWithByeRounds: Game[] = matchState.filter(
    (element) => element.playerOne.includes("--") || element.playerTwo.includes("--")
  );
  if (matchWithByeRounds.length === 0) {
    return matchState;
  }
  const arr: Game[][] = matchWithByeRounds.map((match) => advance(matchState, match, tournamentDet));
  return arr[0];
};
const shuffleArray = (array: PlayerProps[]): PlayerProps[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const prepareMatchState = (playerList: PlayerProps[]): Game[] => {
  if (playerList.length <= 1) {
    return [
      {
        match: 1,
        playerOneId: 0,
        playerOne: "",
        playerOneScore: 0,
        playerTwoId: 0,
        playerTwo: "",
        playerTwoScore: 0,
        playerWinner: "",
      },
    ];
  }
  const players: PlayerProps[] = shuffleArray(playerList);
  const firstRoundDetails: Game[] = createFirstRound(players);
  const tournamentDet: Details[] = tournamentDetails(players);
  const totalNumberOfMatches: number = tournamentDet.reduce((accumulator, value) => accumulator + value.matchCount, 0);
  let totalMatchDetails: Game[] = [...firstRoundDetails];
  for (let i = firstRoundDetails.length; i < totalNumberOfMatches; i += 1) {
    totalMatchDetails = [
      ...totalMatchDetails,
      {
        match: i + 1,
        playerOneId: 0,
        playerOne: "",
        playerOneScore: 0,
        playerTwoId: 0,
        playerTwo: "",
        playerTwoScore: 0,
        playerWinner: "",
      },
    ];
  }
  return advancePlayersInByeRounds(totalMatchDetails, tournamentDet);
};

export const previousGame = (
  currentBracket: Game[],
  roundsMatches: number[][],
  matchNumber: number,
  round: number,
  player: string
): Game | undefined => {
  if (round === 1) {
    return undefined;
  }
  const possibleMatches: number[] = roundsMatches[round - 2];
  const possibleMatch: number[] = possibleMatches.filter(
    (match) => winnerNextPath(match, roundsMatches[0].length) === matchNumber
  );
  const indexGameOne: number = findIndexInArray(currentBracket, possibleMatch[0]);
  const indexGameTwo: number = findIndexInArray(currentBracket, possibleMatch[1]);
  const gameOne: Game = currentBracket[indexGameOne];
  const gameTwo: Game = currentBracket[indexGameTwo];
  return Object.values(gameOne).includes(player) ? gameOne : gameTwo;
};

export const canDecrease = (
  currentBracket: Game[],
  roundsMatches: number[][],
  gameDetails: Details[],
  currentGame: Game,
  playerName: string,
  currentRound: number
): boolean => {
  const nextWinnerMatch: number = winnerNextPath(currentGame.match, gameDetails[0].matchCount);
  const indexOfMatch: number = findIndexInArray(currentBracket, nextWinnerMatch);
  const nextBracketObject: Game = currentBracket[indexOfMatch];
  const previousObject: Game | undefined = previousGame(
    currentBracket,
    roundsMatches,
    currentGame.match,
    currentRound,
    playerName
  );
  const doesPreviousObjectExist = !!previousObject;
  if (!playerName) {
    return false;
  }
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  if (roundsMatches.length === currentRound) {
    if (
      (currentGame.playerOneScore === 0 && currentGame.playerOne === playerName) ||
      (currentGame.playerTwoScore === 0 && currentGame.playerTwo === playerName)
    ) {
      if (currentGame.playerWinner) {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (doesPreviousObjectExist && !Object.values(previousObject!).includes("--")) {
        return true;
      }
      return false;
    }
    if (currentGame.playerWinner && currentGame.playerWinner !== playerName) {
      return false;
    }
    return true;
  }
  if (Object.values(currentGame).includes("--")) {
    return false;
  }
  if (Object.values(nextBracketObject).includes(playerName)) {
    return false;
  }
  if (nextBracketObject && currentGame.playerWinner) {
    return false;
  }
  if (
    !previousObject &&
    ((currentGame.playerOne === playerName && currentGame.playerOneScore > 0) ||
      (currentGame.playerTwo === playerName && currentGame.playerTwoScore > 0))
  ) {
    return true;
  }
  if (!previousObject) {
    return false;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Object.values(previousObject!).includes("--") &&
    currentGame.playerOneScore === 0 &&
    currentGame.playerTwoScore === 0
  ) {
    return false;
  }
  if (
    doesPreviousObjectExist &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    !Object.values(previousObject!).includes("--") &&
    ((currentGame.playerOne === playerName && currentGame.playerOneScore > 0) ||
      (currentGame.playerTwo === playerName && currentGame.playerTwoScore > 0)) &&
    !(
      Object.values(nextBracketObject).includes(currentGame.playerOne) ||
      Object.values(nextBracketObject).includes(currentGame.playerTwo)
    )
  ) {
    return true;
  }
  if (
    previousObject &&
    ((currentGame.playerOne === playerName && currentGame.playerOneScore > 0) ||
      (currentGame.playerTwo === playerName && currentGame.playerTwoScore > 0))
  ) {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (previousObject && !Object.values(previousObject!).includes("--")) {
    return true;
  }
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  return false;
};
