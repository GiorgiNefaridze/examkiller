import { memo } from "react";

import Navbar from "../../components/Navbar/Navbar";

import NoContentLoadedImage from "../../assets/nocontent.svg";
import {
  DashboardWrapper,
  DashboarContent,
  NoContent,
} from "./Dashboard.style";

export const NoContentCMP = () => {
  return (
    <NoContent>
      <img src={NoContentLoadedImage} />
      <h1>There is no room</h1>
    </NoContent>
  );
};

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Navbar />
      <DashboarContent>
        <NoContentCMP />
      </DashboarContent>
    </DashboardWrapper>
  );
};

export default memo(Dashboard);
