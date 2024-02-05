import {
  Dispatch,
  SetStateAction,
  memo,
  useState,
  useRef,
  ElementRef,
} from "react";

import { type ArticleModel } from "../../hooks/useGetArticles";
import { type articleLikesDataType } from "../../pages/Group/Group";
import { getCookie } from "../../helpers/cookie";
import { useLikeArticle } from "../../hooks/useLikeArticle";
import SeeMore from "../SeeMore/SeeMore";

import { ArticleWrapper, IconsWrapper, Like, More } from "./Article.style";

const shortContentForArticle = (content: string, cutIdx: number) => {
  return content?.length > cutIdx ? content.slice(0, cutIdx) + "..." : content;
};

const contentSize = 30;

type ArticleModelType = ArticleModel & {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setArticleLikesData: Dispatch<SetStateAction<articleLikesDataType[]>>;
};

export type PositionType = Record<"x" | "y", number>;

const Article = ({
  date,
  title,
  content,
  owner,
  isLiked,
  articleId,
  setIsShow,
  setArticleLikesData,
  likes,
  isOwner,
}: ArticleModelType) => {
  const [isSeeMoreShow, setIsSeeMoreShow] = useState(false);

  const { mutateAsync: LikeArticle } = useLikeArticle();
  const user = getCookie("user");
  const seeMoreDotsRef = useRef<ElementRef<"div">>(null);

  const handleLike = async () => {
    const userId = user?.userId;
    if (!userId) return;

    const LikeArticleDto = {
      articleId,
      userId,
    };
    await LikeArticle(LikeArticleDto);
  };

  const handleSeeMore = () => {
    setIsSeeMoreShow((prev) => !prev);
  };

  return (
    <ArticleWrapper>
      <h1>{shortContentForArticle(title, contentSize)}</h1>
      <p>{shortContentForArticle(content, contentSize)}</p>
      <div>
        <p>{owner}</p>
        <p>{date}</p>
      </div>
      <IconsWrapper>
        <Like onClick={handleLike} isLiked={isLiked} />
        {isOwner && (
          <div ref={seeMoreDotsRef}>
            <More onClick={handleSeeMore} />
          </div>
        )}
        {isSeeMoreShow && (
          <SeeMore
            setIsShow={setIsShow}
            likes={likes}
            setArticleLikesData={setArticleLikesData}
            setIsSeeMoreShow={setIsSeeMoreShow}
            ref={seeMoreDotsRef}
          />
        )}
      </IconsWrapper>
    </ArticleWrapper>
  );
};

export default memo(Article);
