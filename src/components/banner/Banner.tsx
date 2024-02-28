import * as React from "react";
import banner from "./banner_img.png";
import "./bannerStyle.css";

interface BannerProps {
  title: string;
}

const Banner: React.FunctionComponent<BannerProps> = ({ title }) => {
  return (
    <div className="banner">
      <img src={banner} id="bannerImg" alt="page title" />
      <h3 id="title">{title}</h3>
    </div>
  );
};
export default Banner;
