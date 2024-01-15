import { Dispatch, SetStateAction, memo, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

import { type articleLikesDataType } from "../../pages/Group/Group";

import {
  LikesPopUpWrapper,
  LikesPopUpHeader,
  LikesPopUpContent,
  Likes,
} from "./LikesPopUp.style";
import { NoContentCMP } from "../../pages/Dashboard/Dashboard";

type LikesPopUpType = {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  articleLikesData: articleLikesDataType[];
};

const LikesPopUp = ({ setIsShow, articleLikesData }: LikesPopUpType) => {
  return (
    <LikesPopUpWrapper>
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
