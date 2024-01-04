import { useMemo, memo } from "react";
import { Toaster } from "sonner";

import Loader from "../../components/Loader/Loader";
import Groups from "../../components/Groups/Groups";
import { useGetRooms } from "../../hooks/useGetRooms";
import { getCookie } from "../../helpers/cookie";

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
  const user = getCookie("user");
  const { data, isLoading } = useGetRooms(user?.userId);

  const IsData = useMemo(
    () => (data?.length ? <Groups data={data} /> : <NoContentCMP />),
    [data]
  );

  return (
    <DashboardWrapper>
      {isLoading ? <Loader /> : <DashboarContent>{IsData}</DashboarContent>}
      <Toaster closeButton richColors />
    </DashboardWrapper>
  );
};

export default memo(Dashboard);
