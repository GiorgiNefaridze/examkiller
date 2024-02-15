import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import networkClient from "../../../network";
import { ResponseType } from "../Auth/useRegister";
import { RoomQueryKeys } from "./queries";

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

const createRoom = async (roomModel: RoomModelType) => {
  try {
    const { data } = await networkClient.post<ResponseType>(
      "Room",
      DTOMapper(roomModel)
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.errorMessage);
    }
  }
};

const useCreateRoom = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["createRoom"],
    mutationFn: createRoom,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: RoomQueryKeys.all });
    },
  });
};

export { useCreateRoom };
