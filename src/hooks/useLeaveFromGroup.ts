import { type MutationFunction, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import networkClient from "../../network";
import { Routes } from "../../Routes";

type leaveGroupDtoType = {
  roomId: number;
  userId: number;
};

type LeaveFromGroupType = (
  props: leaveGroupDtoType
) => Promise<MutationFunction>;

const useLeaveFromGroup = () => {
  const navigate = useNavigate();

  const leaveFromGroup: LeaveFromGroupType = async ({ roomId, userId }) => {
    try {
      const res = await networkClient.delete(
        `/EnrollUser?roomId=${roomId}&userId=${userId}`
      );

      if (res.status == 200) {
        navigate(Routes.Dashboard.path);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return useMutation({
    mutationKey: ["leaveFromGroup"],
    mutationFn: leaveFromGroup,
  });
};

export { useLeaveFromGroup, type leaveGroupDtoType };
