import { type Dispatch, type SetStateAction, memo } from "react";
import { Badge, Button, Card, Spinner } from "flowbite-react";

import BadgeComponent from "../Badge/Badge";

import { RoomModelType } from "../../hooks/Room/useGetRooms";
import { type enrollModelType } from "../../hooks/useEnroll";
import { useEnroll } from "../../hooks/useEnroll";
import { cutText } from "../../helpers/textCutter";
import { getCookie } from "../../helpers/cookie";

type GroupBoxtype = RoomModelType & {
  setRoomData: Dispatch<SetStateAction<RoomModelType>>;
};

const GroupBox = (props: GroupBoxtype) => {
  const {
    name,
    description,
    roomId,
    isJoined,
    type,
    owner: { nickname },
    setRoomData,
  } = props;

  const roomData = {
    name,
    description,
    roomId,
    isJoined,
    type,
    owner: { nickname },
  };

  const { mutateAsync: Enroll, isPending } = useEnroll();

  const user = getCookie("user");

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
    <Card
      className="h-[23%] w-[90%] max-md:h-[50%] px-3 relative cursor-pointer"
      style={{
        filter: isJoined ? "none" : "blur(1px)",
      }}
      onClick={() => {
        if (isJoined) {
          setRoomData(roomData);
        }
      }}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {cutText(name, 15)}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {cutText(description, 30)}
      </p>
      <div className="flex justify-between items-center">
        <Badge color="gray" className="w-1/2 rounded-md">
          Created by {cutText(nickname, 7)}
        </Badge>
        <BadgeComponent type={type} />
      </div>
      {isJoined ? (
        <div className="w-full bg-transparent absolute flex items-center justify-center top-0 bottom-0 left-0 right-0">
          <Button className="w-1/3">Details</Button>
        </div>
      ) : (
        <div className="w-full bg-transparent absolute flex items-center justify-center top-0 bottom-0 left-0 right-0">
          <Button className="w-1/3" onClick={handleEnroll}>
            {isPending ? (
              <Spinner aria-label="Default status example" size={"sm"} />
            ) : (
              "Enroll"
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default memo(GroupBox);
