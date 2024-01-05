import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { ResponseType } from "./useRegister";
import { client } from "../../QueryClientWrapper";

type enrollModelType = {
  userId: number;
  roomId: number;
};

const useEnroll = () => {
  const enroll = async (enrollModel: enrollModelType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "/EnrollUser",
        enrollModel
      );

      return data?.response;
    } catch (error) {
      throw new Error(error.response.data.errorMessage);
    }
  };

  return useMutation({
    mutationKey: ["enroll"],
    mutationFn: enroll,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ["getRooms"] });
    },
  });
};

export { useEnroll, type enrollModelType };
