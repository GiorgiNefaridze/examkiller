import { Dispatch, SetStateAction, memo, useRef, ElementRef } from "react";
import { IoCloseCircle } from "react-icons/io5";

import { type articleLikesDataType } from "../../pages/Group/Group";
import { NoContentCMP } from "../../pages/Dashboard/Dashboard";

import {
  LikesPopUpWrapper,
  LikesPopUpHeader,
  LikesPopUpContent,
  Likes,
} from "./LikesPopUp.style";

type LikesPopUpType = {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  articleLikesData: articleLikesDataType[];
};

const LikesPopUp = ({ setIsShow, articleLikesData }: LikesPopUpType) => {
  const LikesPopUpContainerRef = useRef<ElementRef<"div">>(null);

  return (
    <LikesPopUpWrapper ref={LikesPopUpContainerRef}>
      <LikesPopUpHeader>
        <div></div>
        <IoCloseCircle
          onClick={() => setIsShow(false)}
          color="#3081d0"
          cursor="pointer"
          size="30"
        />
      </LikesPopUpHeader>
      <LikesPopUpContent>
        {articleLikesData?.length ? (
          articleLikesData?.map(({ nickname, email }, idx) => {
            return (
              <Likes key={idx}>
                <p>{nickname}</p>
                <p>{email}</p>
              </Likes>
            );
          })
        ) : (
          <NoContentCMP />
        )}
      </LikesPopUpContent>
    </LikesPopUpWrapper>
  );
};

export default memo(LikesPopUp);
