import { memo } from "react";

import GroupBox from "../GroupBox/GroupBox";
import { type ResponseRoomModelType } from "../../hooks/Room/useGetRooms";

import { GroupWrapper } from "./Groups.style";

type GroupsType = {
  data: ResponseRoomModelType[] | undefined;
};

const Groups = ({ data }: GroupsType) => {
  return (
    <GroupWrapper>
      <h1>All Groups</h1>
      <div>
        {data?.map((group: ResponseRoomModelType) => (
          <GroupBox key={group?.roomId} {...group} />
        ))}
      </div>
    </GroupWrapper>
  );
};

export default memo(Groups);
