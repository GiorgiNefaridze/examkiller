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
};

const getRooms = async ({ userId }: GetRoomsType) => {
  const { data } = await networkClient.get<GetRoomsResponseType>(
    `/Room/user/${userId}`
  );

  return data?.response;
};

const useGetRooms = ({ userId }: GetRoomsType) => {
  return useQuery({
    queryKey: RoomQueryKeys.all,
    queryFn: () => getRooms({ userId }),
    enabled: Boolean(userId),
  });
};

export { useGetRooms, type RoomModelType };
