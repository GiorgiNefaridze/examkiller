import { Dispatch, SetStateAction, memo } from "react";

import { type ArticleModel } from "../../hooks/useGetArticles";
import { type articleLikesDataType } from "../../pages/Group/Group";
import { getCookie } from "../../helpers/cookie";
import { useLikeArticle } from "../../hooks/useLikeArticle";

import { ArticleWrapper, IconsWrapper, Like, See } from "./Article.style";

const shortContentForArticle = (content: string, cutIdx: number) => {
  return content?.length > cutIdx ? content.slice(0, cutIdx) + "..." : content;
};

const contentSize = 30;

type ArticleModelType = ArticleModel & {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setArticleLikesData: Dispatch<SetStateAction<articleLikesDataType[]>>;
};

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
}: ArticleModelType) => {
  const { mutateAsync: LikeArticle } = useLikeArticle();
  const user = getCookie("user");

  const handleLike = async () => {
    const LikeArticleDto = {
      articleId,
      userId: user?.userId,
    };
    await LikeArticle(LikeArticleDto);
  };

  const handleSeeLikes = () => {
    setIsShow(true);
    setArticleLikesData(likes);
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
        <See onClick={handleSeeLikes} />
      </IconsWrapper>
    </ArticleWrapper>
  );
};

export default memo(Article);
