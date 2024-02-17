import { memo } from "react";
import { Timeline, Avatar } from "flowbite-react";

import GroupDetailsForm from "../GroupDetailsForm/GroupDetailsForm";
import Loader from "../Loader/Loader";

import { useGetArticles } from "../../hooks/Article/useGetArticles";
import { RoomModelType } from "../../hooks/Room/useGetRooms";
import { getCookie } from "../../helpers/cookie";
import { cutText } from "../../helpers/textCutter";

type GroupDetailsType = RoomModelType;

const generateLikersAvatars = (likeLength: []) => {
  const visibleLikes = 3;

  if (!likeLength?.length) {
    return "Likes - " + 0;
  }

  return likeLength?.map((like, idx) => {
    if (idx > visibleLikes) {
      return;
    }
    return (
      <>
        {idx < visibleLikes ? (
          <Avatar
            placeholderInitials={like?.nickname[0]?.toUpperCase()}
            title={like?.nickname}
            size="sm"
            rounded
            bordered
          />
        ) : (
          <Avatar.Counter total={likeLength?.length - visibleLikes} />
        )}
      </>
    );
  });
};

const GroupDetails = ({ roomId }: GroupDetailsType) => {
  const user = getCookie("user");

  const { data: articles, isLoading } = useGetArticles({
    roomId,
    userId: user?.userId,
  });

  return (
    <div className="w-full h-full flex flex-col max-md:h-[100%] max-md:gap-y-7 justify-between">
      <Timeline className="w-full h-[65%]  overflow-auto scrollbar-hide">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {articles?.map(
              ({ date, content, title, owner, articleId, likes }) => {
                return (
                  <Timeline.Item key={articleId}>
                    <Timeline.Point />
                    <Timeline.Content>
                      <Timeline.Time>
                        Written by {owner} / {date}
                      </Timeline.Time>
                      <Timeline.Title>{cutText(title, 20)}</Timeline.Title>
                      <Timeline.Body>{cutText(content, 20)}</Timeline.Body>
                      <Timeline.Body>
                        <div className="w-full flex">
                          <Avatar.Group>
                            {generateLikersAvatars(likes)}
                          </Avatar.Group>
                        </div>
                      </Timeline.Body>
                    </Timeline.Content>
                  </Timeline.Item>
                );
              }
            )}
          </>
        )}
      </Timeline>

      <GroupDetailsForm ownerId={user?.userId} roomId={roomId} />
    </div>
  );
};

export default memo(GroupDetails);
