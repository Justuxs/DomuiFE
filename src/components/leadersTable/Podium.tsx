import React from "react";
import useFitText from "use-fit-text";
import podium from "./Podium_img.png";
import "./PodiumStyle.css";

interface ILeaderProps {
  place: number;
  id: number;
  name: string;
  surname: string;
  point: number;
}
export interface IPodiumProps {
  first: ILeaderProps;
  second: ILeaderProps;
  third: ILeaderProps;
}
interface ITextProps {
  text: string;
  width: number;
  height: number;
}

const FitText: React.FunctionComponent<ITextProps> = ({ text, width, height }) => {
  const { fontSize, ref } = useFitText();

  return (
    <div id="textDiv" ref={ref} style={{ fontSize, height, width }}>
      {text}
    </div>
  );
};

const Podium: React.FunctionComponent<IPodiumProps> = ({ first, second, third }) => {
  return (
    <div className="podium">
      <img src={podium} id="podiumIng" alt="page title" />
      <div id="first" className="podiumNameDiv">
        <FitText text={first.name} height={100} width={40} />
      </div>
      <div id="second" className="podiumNameDiv">
        <FitText text={second.name} height={100} width={40} />
      </div>
      <div id="third" className="podiumNameDiv">
        <FitText text={third.name} height={100} width={40} />
      </div>
    </div>
  );
};

export default Podium;
