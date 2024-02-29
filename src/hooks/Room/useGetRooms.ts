import { useQuery } from "@tanstack/react-query";

import networkClient from "../../../network";
import { RoomQueryKeys } from "./queries";

type OwnerType = {
  nickname: string;
  email: string;
};

type RoomModelType = {
  roomId: number;
  name: string;
  type: string;
  description: string;
  owner: OwnerType;
  isJoined: boolean;
};

type GetRoomsResponseType = {
  response: RoomModelType[];
};

type GetRoomsType = {
  userId: number;
  query: string;
};

const getRooms = async ({ userId, query }: GetRoomsType) => {
  const { data } = await networkClient.get<GetRoomsResponseType>(
    `/Room?userId=${userId}&name=${query}`
  );

  return data?.response;
};

const useGetRooms = ({ userId, query }: GetRoomsType) => {
  return useQuery({
    queryKey: [...RoomQueryKeys.all, query],
    queryFn: () => getRooms({ userId, query }),
    enabled: Boolean(userId),
  });
};

export { useGetRooms, type RoomModelType };
