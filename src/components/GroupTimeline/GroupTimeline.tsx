import { Avatar, Timeline } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

import LikesAvatar from "../LikesAvatar/LikesAvatar";

import { useLikeArticle } from "../../hooks/Article/useLikeArticle";

import { getCookie } from "../../helpers/cookie";
import { cutText } from "../../helpers/textCutter";

const GroupTimeline = (props) => {
  const user = getCookie("user");
  const userId = user?.userId;

  const { mutateAsync: Like } = useLikeArticle();

  const handleLike = async (articleId: number) => {
    await Like({ articleId, userId });
  };

  return (
    <>
      <Timeline.Item
        key={props?.articleId}
        className="flex w-full pr-20 items-center justify-between"
      >
        <div>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Time>
              Written by {props?.owner} / {props?.date}
            </Timeline.Time>
            <Timeline.Title>{cutText(props?.title, 30)}</Timeline.Title>
            <Timeline.Body>{cutText(props?.content, 35)}</Timeline.Body>
            <Timeline.Body>
              <div className="w-full flex">
                <Avatar.Group>
                  <LikesAvatar likes={props?.likes} />
                </Avatar.Group>
              </div>
            </Timeline.Body>
          </Timeline.Content>
        </div>
        {props?.isLiked ? (
          <FaHeart
            size="15"
            className="cursor-pointer"
            onClick={() => handleLike(props?.articleId)}
          />
        ) : (
          <CiHeart
            size="20"
            className="cursor-pointer"
            onClick={() => handleLike(props?.articleId)}
          />
        )}
      </Timeline.Item>
    </>
  );
};

export default GroupTimeline;
