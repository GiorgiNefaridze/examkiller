import { Dispatch, SetStateAction } from "react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import { type articleLikesDataType } from "../../pages/Group/Group";

import { SeeMoreWrapper, Option } from "./SeeMore.style";

type SeeMoreType = {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  likes: {
    nickname: string;
    email: string;
  }[];
  setArticleLikesData: Dispatch<SetStateAction<articleLikesDataType[]>>;
  setIsSeeMoreShow: Dispatch<SetStateAction<boolean>>;
};

const SeeMore = (props: SeeMoreType) => {
  const { likes, setArticleLikesData, setIsSeeMoreShow, setIsShow } = props;

  const handleSeeLikes = () => {
    setIsShow(true);
    setIsSeeMoreShow(false);
  };

  const handleDelete = () => {
    setArticleLikesData(likes);
    setIsSeeMoreShow(false);
  };

  return (
    <SeeMoreWrapper>
      <Option onClick={handleDelete}>
        <MdDelete />
        <p>Delete</p>
      </Option>
      <Option onClick={handleSeeLikes}>
        <FaEye />
        <p>Likes</p>
      </Option>
    </SeeMoreWrapper>
  );
};

export default SeeMore;
