import { useMutation, useQueryClient } from "@tanstack/react-query";

import networkClient from "../../network";
import { ResponseType } from "./Auth/useRegister";
import { RoomQueryKeys } from "./Room/queries";

type enrollModelType = {
  userId: number;
  roomId: number;
};

const enroll = async (enrollModel: enrollModelType) => {
  const { data } = await networkClient.post<ResponseType>(
    "/EnrollUser",
    enrollModel
  );

  return data?.response;
};

const useEnroll = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["enroll"],
    mutationFn: enroll,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: RoomQueryKeys.all });
    },
  });
};

export { useEnroll, type enrollModelType };
