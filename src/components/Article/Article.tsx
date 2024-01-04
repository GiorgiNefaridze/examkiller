import { ArticleModel } from "../../hooks/useGetArticles";

import { ArticleWrapper } from "./Article.style";

const shortContentForArticle = (content: string, cutIdx: number) => {
  return content?.length > cutIdx ? content.slice(0, cutIdx) + "..." : content;
};

const Article = ({ date, title, content, owner }: ArticleModel) => {
  return (
    <ArticleWrapper>
      <h1>{shortContentForArticle(title, 30)}</h1>
      <p>{shortContentForArticle(content, 30)}</p>
      <div>
        <p>{owner}</p>
        <p>{date}</p>
      </div>
    </ArticleWrapper>
  );
};

export default Article;
