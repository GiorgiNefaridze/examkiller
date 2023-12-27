import { memo } from "react";
import { Toaster } from "sonner";

import Navbar from "../../components/Navbar/Navbar";

import NoContentLoadedImage from "../../assets/nocontent.svg";
import {
  DashboardWrapper,
  DashboarContent,
  NoContent,
} from "./Dashboard.style";

export const NoContentCMP = ({ label }: { label: string }) => {
  return (
    <NoContent>
      <img src={NoContentLoadedImage} />
      <h1>There is no {label}</h1>
    </NoContent>
  );
};

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Navbar />
      <DashboarContent>
        <NoContentCMP label="room" />
      </DashboarContent>
      <Toaster closeButton richColors />
    </DashboardWrapper>
  );
};

export default memo(Dashboard);
