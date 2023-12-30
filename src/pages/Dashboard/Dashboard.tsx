import { useMemo, memo } from "react";
import { Toaster } from "sonner";

import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import Groups from "../../components/Groups/Groups";
import { useGetRooms } from "../../hooks/useGetRooms";

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
  const { data, isLoading } = useGetRooms();

  // const IsData = useMemo(
  //   () => (data?.length ? Groups : NoContentCMP),
  //   [data?.length]
  // );

  return (
    <DashboardWrapper>
      <Navbar />
      {/* {isLoading ? (
        <Loader />
      ) : (
        <>
          <DashboarContent>
            <IsData />
          </DashboarContent>
          <Toaster closeButton richColors />
        </>
      )} */}
      <Groups {...data} />
    </DashboardWrapper>
  );
};

export default memo(Dashboard);
