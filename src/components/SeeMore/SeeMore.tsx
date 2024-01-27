import {
  Dispatch,
  ElementRef,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import { type articleLikesDataType } from "../../pages/Group/Group";
import { useOutsideClick } from "../../hooks/useOutsideClick";

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

const SeeMore = forwardRef<HTMLDivElement, SeeMoreType>((props, ref) => {
  const { likes, setArticleLikesData, setIsSeeMoreShow, setIsShow } = props;

  const seeMoreRef = useRef<ElementRef<"div">>(null);

  const { outsideClick } = useOutsideClick(seeMoreRef, ref, setIsSeeMoreShow);

  useEffect(() => {
    addEventListener("click", outsideClick);

    return () => {
      removeEventListener("click", outsideClick);
    };
  }, []);

  const handleSeeLikes = () => {
    setIsShow(true);
    setArticleLikesData(likes);
    setIsSeeMoreShow(false);
  };

  const handleDelete = () => {
    setIsSeeMoreShow(false);
  };

  return (
    <SeeMoreWrapper ref={seeMoreRef}>
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
});

export default SeeMore;
