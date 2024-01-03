import { ArticleModel } from "../../hooks/useGetArticles";

import { ArticleWrapper } from "./Article.style";

const Article = ({ date, title, content, owner }: ArticleModel) => {
  return (
    <ArticleWrapper>
      <h1>{title}</h1>
      <p>{content}</p>
      <div>
        <p>{owner}</p>
        <p>{date}</p>
      </div>
    </ArticleWrapper>
  );
};

export default Article;
