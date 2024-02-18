import { memo } from "react";
import { Timeline, Avatar } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import GroupDetailsForm from "../GroupDetailsForm/GroupDetailsForm";
import NoContent from "../NoContent/NoContent";
import Loader from "../Loader/Loader";

import { useGetArticles } from "../../hooks/Article/useGetArticles";
import { useLikeArticle } from "../../hooks/Article/useLikeArticle";

import { RoomModelType } from "../../hooks/Room/useGetRooms";
import { getCookie } from "../../helpers/cookie";
import { cutText } from "../../helpers/textCutter";

type GroupDetailsType = RoomModelType;
type LikesType = {
  nickname: string;
  email: string;
}[];

const generateLikersAvatars = (likes: LikesType) => {
  const visibleLikes = 3;

  if (!likes?.length) {
    return "Likes - " + 0;
  }

  return likes?.map((like, idx) => {
    if (idx > visibleLikes) {
      return;
    }
    return (
      <>
        {idx < visibleLikes ? (
          <Avatar
            key={idx}
            placeholderInitials={like?.nickname[0]?.toUpperCase()}
            title={like?.nickname}
            className="cursor-pointer"
            size="sm"
            rounded
            bordered
          />
        ) : (
          <Avatar.Counter key={idx} total={likes?.length - visibleLikes} />
        )}
      </>
    );
  });
};

const GroupDetails = ({ roomId }: GroupDetailsType) => {
  const user = getCookie("user");
  const userId = user?.userId;

  const { data: articles, isLoading } = useGetArticles({
    roomId,
    userId,
  });

  const { mutateAsync: Like } = useLikeArticle();

  const handleLike = async (articleId: number) => {
    await Like({ articleId, userId });
  };

  return (
    <div className="w-full h-full flex flex-col max-md:h-[100%] max-md:gap-y-7 justify-between">
      <Timeline className="w-full h-[65%] overflow-auto scrollbar-hide">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {articles?.length ? (
              articles?.map(
                ({
                  date,
                  content,
                  title,
                  owner,
                  articleId,
                  likes,
                  isLiked,
                }) => {
                  return (
                    <Timeline.Item
                      key={articleId}
                      className="flex w-full pr-20 items-center justify-between"
                    >
                      <div>
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
                      </div>
                      {isLiked ? (
                        <FaHeart
                          size="15"
                          className="cursor-pointer"
                          onClick={() => handleLike(articleId)}
                        />
                      ) : (
                        <CiHeart
                          size="20"
                          className="cursor-pointer"
                          onClick={() => handleLike(articleId)}
                        />
                      )}
                    </Timeline.Item>
                  );
                }
              )
            ) : (
              <NoContent />
            )}
          </>
        )}
      </Timeline>

      <GroupDetailsForm ownerId={user?.userId} roomId={roomId} />
    </div>
  );
};

export default memo(GroupDetails);
