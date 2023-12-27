import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { ResponseType } from "./useRegister";

export type RoomModelType = {
  name: string;
  type: string;
  description: string;
  ownerId: number;
};

const DTOMapper = (request) => {
  return {
    Name: request.name,
    Type: request.type,
    Description: request.description,
    OwnerId: request.ownerId,
  };
};

const useCreateRoom = () => {
  const createRoom = async (roomModel: RoomModelType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "Room/Create",
        DTOMapper(roomModel)
      );

      return data;
    } catch (error) {
      throw new Error(error.response.data.errorMessage);
    }
  };

  return useMutation({
    mutationKey: ["createRoom"],
    mutationFn: createRoom,
  });
};

export { useCreateRoom };