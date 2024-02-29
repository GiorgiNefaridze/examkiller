import { memo } from "react";
import { Timeline } from "flowbite-react";

import GroupDetailsForm from "../GroupDetailsForm/GroupDetailsForm";
import GroupTimeline from "../GroupTimeline/GroupTimeline";
import NoContent from "../NoContent/NoContent";
import Loader from "../Loader/Loader";

import { useGetArticles } from "../../hooks/Article/useGetArticles";

import { RoomModelType } from "../../hooks/Room/useGetRooms";
import { getCookie } from "../../helpers/cookie";

type GroupDetailsType = RoomModelType;

const GroupDetails = ({ roomId }: GroupDetailsType) => {
  const user = getCookie("user");
  const userId = user?.userId;

  const { data: articles, isLoading } = useGetArticles({
    roomId,
    userId,
  });

  return (
    <div className="w-full h-full flex flex-col max-md:h-[100%] max-md:gap-y-7 justify-between">
      <Timeline className="w-full h-[65%] overflow-auto scrollbar-hide">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {articles?.length ? (
              articles?.map((article) => <GroupTimeline {...article} />)
            ) : (
              <NoContent />
            )}
          </>
        )}
      </Timeline>

      {Boolean(roomId) && (
        <GroupDetailsForm
          ownerId={user?.userId}
          roomId={roomId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default memo(GroupDetails);
