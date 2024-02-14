import { memo, useEffect } from "react";
import { IoEnterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { RoomModelType } from "../../hooks/Room/useGetRooms";
import { type enrollModelType } from "../../hooks/useEnroll";
import { useEnroll } from "../../hooks/useEnroll";
import { getCookie } from "../../helpers/cookie";
import { Toast } from "../../helpers/Toast";
import { Routes } from "../../../Routes";

import {
  GroupContainer,
  Button,
  GroupContent,
  GroupButtons,
} from "./GroupBox.style";

const GroupBox = (props: RoomModelType) => {
  const {
    name,
    description,
    roomId,
    isJoined,
    owner: { nickname },
  } = props;

  const { data, error, mutateAsync: Enroll } = useEnroll();
  const user = getCookie("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (data || error?.message) {
      Toast(error?.message, data);
    }
  }, [data, error?.message]);

  const handleEnroll = async () => {
    if (user?.userId) {
      const requestDto: enrollModelType = {
        userId: user.userId,
        roomId,
      };
      await Enroll(requestDto);
    }
  };

  return (
    <GroupContainer title={name}>
      <GroupContent isEnrolled={isJoined}>
        <h1>Title: {name}</h1>
        <h1>Description: {description}</h1>
        <h1>Lead: {nickname}</h1>
      </GroupContent>
      <GroupButtons>
        {isJoined ? (
          <Button
            onClick={() =>
              navigate(Routes.Group.path, {
                state: { ...props, userId: user?.userId },
              })
            }
          >
            See more...
          </Button>
        ) : (
          <Button onClick={handleEnroll}>
            Enroll
            <IoEnterSharp />
          </Button>
        )}
      </GroupButtons>
    </GroupContainer>
  );
};

export default memo(GroupBox);
