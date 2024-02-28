import React from "react";

export interface PlayerProps {
  id: number;
  name: string;
}

export interface IGameResultNoId {
  [index: string]: string | number;
  gameDate: string;
  firstPlace: string;
  firstPlaceId: number;
  secondPlace: string;
  secondPlaceId: number;
  thirdPlace: string;
  thirdPlaceId: number;
}

export interface IGameResultProps {
  id: number;
  gameDate: string;
  firstPlace: string;
  firstPlaceId: number;
  secondPlace: string;
  secondPlaceId: number;
  thirdPlace: string;
  thirdPlaceId: number;
}

export interface IResultsTableProps {
  [index: number]: Array<IGameResultProps>;
  results: Array<IGameResultProps>;
  setResults: React.Dispatch<React.SetStateAction<IGameResultProps[]>>;
  addedResultId: number;
  setAddedResultId: React.Dispatch<React.SetStateAction<number>>;
  playerList: Array<PlayerProps>;
  addButtonClicked: boolean;
  fetchStatus: boolean;
  resultGroupId: number;
}

export interface CreateResultData {
  gameDate: string;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  resultsGroup: number;
}

export interface UpdateResultData {
  id: number;
  gameDate: string;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  resultsGroup: number;
}
