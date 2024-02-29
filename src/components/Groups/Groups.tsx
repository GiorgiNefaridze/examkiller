import { memo, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import GroupBox from "../GroupBox/GroupBox";
import Loader from "../Loader/Loader";
import GroupDetails from "../GroupDetails/GroupDetails";

import { useGetRooms } from "../../hooks/Room/useGetRooms";
import { getCookie } from "../../helpers/cookie";
import { type RoomModelType } from "../../hooks/Room/useGetRooms";

const Groups = () => {
  const [roomData, setRoomData] = useState<RoomModelType>({} as RoomModelType);
  const [targetRoomId, setTargetRoomId] = useState<number>(0); //0 just default
  const [animationParent] = useAutoAnimate();

  const user = getCookie("user");
  const userId = user?.userId;

  const { data, isLoading } = useGetRooms({ userId });

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
            <GroupDetails {...roomData} />
          </div>
          <div
            ref={animationParent}
            className="w-[25%] max-lg:w-full h-full max-md:h-[100vh] flex bg-gray-100 rounded-md py-5 scrollbar-hide flex-col justify-start gap-y-6 items-center overflow-y-auto"
          >
            {data
              ?.sort((a, b) => b.roomId - a.roomId)
              ?.map((group: RoomModelType) => (
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
