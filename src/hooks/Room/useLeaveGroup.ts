import { useMutation, useQueryClient } from "@tanstack/react-query";

import networkClient from "../../../network";
import { RoomQueryKeys } from "./queries";

type LeaveGroupType = {
  roomId: number;
  userId: number;
};

const leaveGroup = async ({ roomId, userId }: LeaveGroupType) => {
  const data = await networkClient.delete(
    `/EnrollUser?roomId=${roomId}&userId=${userId}`
  );

  return data;
};

const useLeaveFromGroup = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["leaveFromGroup"],
    mutationFn: leaveGroup,
    onSuccess() {
      return client.invalidateQueries({ queryKey: RoomQueryKeys.all });
    },
  });
};

export { useLeaveFromGroup };
