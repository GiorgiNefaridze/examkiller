import { memo } from "react";

import { type ArticleModel } from "../../hooks/useGetArticles";
import { getCookie } from "../../helpers/cookie";
import { useLikeArticle } from "../../hooks/useLikeArticle";

import { ArticleWrapper, Like } from "./Article.style";

const shortContentForArticle = (content: string, cutIdx: number) => {
  return content?.length > cutIdx ? content.slice(0, cutIdx) + "..." : content;
};

const contentSize = 30;

const Article = ({
  date,
  title,
  content,
  owner,
  articleId,
  isLiked,
}: ArticleModel) => {
  const { mutateAsync: LikeArticle } = useLikeArticle();
  const user = getCookie("user");

  const handleLike = async () => {
    const LikeArticleDto = {
      articleId,
      userId: user?.userId ?? 43,
    };
    await LikeArticle(LikeArticleDto);
  };

  return (
    <ArticleWrapper>
      <h1>{shortContentForArticle(title, contentSize)}</h1>
      <p>{shortContentForArticle(content, contentSize)}</p>
      <div>
        <p>{owner}</p>
        <p>{date}</p>
      </div>
      <Like onClick={handleLike} isLiked={isLiked} />
    </ArticleWrapper>
  );
};

export default memo(Article);
