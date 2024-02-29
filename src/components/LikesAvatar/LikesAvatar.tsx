import { Avatar } from "flowbite-react";

type LikesAvatarType = {
  likes: {
    nickname: string;
    email: string;
  }[];
};

const visibleLikes = 3;

const LikesAvatar = ({ likes }: LikesAvatarType) => {
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

export default LikesAvatar;
