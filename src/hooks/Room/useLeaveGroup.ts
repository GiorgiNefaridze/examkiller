import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import networkClient from "../../../network";
import { RoomQueryKeys } from "./queries";
import { Routes } from "../../../Routes";

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
  const navigate = useNavigate();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["leaveFromGroup"],
    mutationFn: leaveGroup,
    onSuccess(data) {
      if (data.status == 200) {
        navigate(Routes.Dashboard.path);
      }
      return client.invalidateQueries({ queryKey: RoomQueryKeys.all });
    },
  });
};

export { useLeaveFromGroup };
