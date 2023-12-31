import { memo } from "react";
import { IoEnterSharp } from "react-icons/io5";

import { ResponseRoomModelType } from "../../hooks/useGetRooms";

import {
  GroupContainer,
  Button,
  GroupContent,
  GroupButtons,
} from "./GroupBox.style";

const GroupBox = ({
  name,
  description,
  owner: { nickname },
}: ResponseRoomModelType) => {
  return (
    <GroupContainer title={name}>
      <GroupContent>
        <h1>Title: {name}</h1>
        <h1>Description: {description}</h1>
        <h1>Lead: {nickname}</h1>
      </GroupContent>
      <GroupButtons>
        <Button>See more...</Button>
        <Button>
          Enroll
          <IoEnterSharp />
        </Button>
      </GroupButtons>
    </GroupContainer>
  );
};

export default memo(GroupBox);
