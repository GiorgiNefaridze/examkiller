import { useQuery } from "@tanstack/react-query";

import networkClient from "../../network";

type ResponseRoomModelType = {
  roomId: number;
  name: string;
  type: string;
  description: string;
  ownerId: number;
};

type ResponseType = {
  response: ResponseRoomModelType[];
};

const responseDTOMapper = <T>(request: T[]) => {
  return request?.map((room: T) => {
    return {
      roomId: room.roomId,
      name: room.name,
      type: room.type,
      description: room.description,
      ownerId: room.ownerId,
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
