import { useQuery } from "@tanstack/react-query";

import networkClient from "../../network";

type ResponseRoomModelType = {
  roomId: number;
  name: string;
  type: string;
  description: string;
  owner: OwnerType;
};

type OwnerType = {
  nickname: string;
  email: string;
};

type ResponseType = {
  response: ResponseRoomModelType[];
};

const responseDTOMapper = <T>(request: T[]): T[] => {
  return request?.map((room: T) => {
    return {
      roomId: room.roomId,
      name: room.name,
      type: room.type,
      description: room.description,
      owner: {
        nickname: room.owner.nickname,
        email: room.owner.email,
      },
    };
  });
};

const useGetRooms = () => {
  const getRooms = async () => {
    try {
      const { data } = await networkClient.get<ResponseType>("/Room");

      return responseDTOMapper<ResponseRoomModelType>(data?.response);
    } catch (error) {
      throw new Error(error.response.data.errorMessage);
    }
  };

  return useQuery({
    queryKey: ["getRooms"],
    queryFn: getRooms,
  });
};

export { useGetRooms, type ResponseRoomModelType };
