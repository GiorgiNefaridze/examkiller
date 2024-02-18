import { memo, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

import GroupBox from "../GroupBox/GroupBox";
import Loader from "../Loader/Loader";
import GroupDetails from "../GroupDetails/GroupDetails";

import { useGetRooms } from "../../hooks/Room/useGetRooms";
import { useLeaveFromGroup } from "../../hooks/Room/useLeaveGroup";
import { getCookie } from "../../helpers/cookie";
import { type RoomModelType } from "../../hooks/Room/useGetRooms";

const Groups = () => {
  const [roomData, setRoomData] = useState<RoomModelType>({} as RoomModelType);
  const [targetRoomId, setTargetRoomId] = useState<number>(0); //0 just default

  const user = getCookie("user");
  const userId = user?.userId;
  const isRoomSelected = Boolean(Object.keys(roomData)?.length);

  const { data, isLoading } = useGetRooms({ userId });
  const { mutateAsync: LeaveRoom } = useLeaveFromGroup();

  return (
    <div className="w-full h-full flex flex-col px-36 max-md:px-10 max-md:overflow-auto overflow-hidden">
      <div className="flex items-center gap-x-3">
        <FaHouse size={20} className="text-blue-500" />
        <h1 className="font-normal text-xl">Rooms</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-[90vh] max-md:!h-auto max-md:gap-y-10 pb-10 pt-2 flex max-lg:flex-col gap-x-4 justify-between">
          <div className="w-[70%] max-lg:w-full h-full max-md:h-[80vh] relative p-5 flex bg-gray-100 rounded-md items-start scrollbar-hide flex-wrap justify-start gap-6 gap-x-24">
            <div
              style={{
                border: isRoomSelected ? "2px solid rgb(118 169 250)" : "none",
              }}
              className="absolute p-[8px] rounded-[50%] cursor-pointer top-0 right-0 translate-x-1/2 -translate-y-1/2"
              onClick={async () => {
                await LeaveRoom({ roomId: roomData?.roomId, userId });
                setRoomData({});
              }}
            >
              {isRoomSelected && <TbLogout size={15} color="blue" />}
            </div>
            <GroupDetails {...roomData} />
          </div>
          <div className="w-[25%] max-lg:w-full h-full max-md:h-[100vh] flex bg-gray-100 rounded-md py-5 scrollbar-hide flex-col justify-start gap-y-6 items-center overflow-y-auto">
            {data?.map((group: RoomModelType) => (
              <GroupBox
                key={group?.roomId}
                setRoomData={setRoomData}
                targetRoomId={targetRoomId}
                setTargetRoomId={setTargetRoomId}
                {...group}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Groups);
