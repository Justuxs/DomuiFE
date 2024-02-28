import React, { useState } from "react";
import LeadersTable from "../components/leadersTable/LeadersTable";
import "../components/leadersTable/LeadersTableStyle.css";
import Slides from "../components/leadersTable/Slides";
import Banner from "../components/banner/Banner";
import DonateDialog from "../components/donationDialog/DonateDialog";
import "../style/center_style.css";
import CustomizedDialogs from "../components/ActionDialog/CustomizedDialogs";
const HomePage: React.FunctionComponent = () => {
  const [leaderDateFrom] = useState<Date>(new Date());
  const [leaderDateTo] = useState<Date>(new Date());

  return (
    <div>
      <Banner title="SVEIKI" />
      <div>
          <div className={"center"}>
              <DonateDialog/>
          </div>
      </div>
        <div className={"center"}>
            <CustomizedDialogs/>
        </div>
    </div>
  );
};

export default HomePage;
