import { memo } from "react";

import { type ResponseRoomModelType } from "../../hooks/useGetRooms";

import { GroupWrapper } from "./Groups.style";

const Groups = (group: ResponseRoomModelType) => {
  return (
    <GroupWrapper>
      <h1>All Groups</h1>
    </GroupWrapper>
  );
};

export default memo(Groups);
