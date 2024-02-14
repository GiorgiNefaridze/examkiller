import { useQuery } from "@tanstack/react-query";

import networkClient from "../../../network";
import { ArticleQueryKeys } from "./queries";

type ArticleModel = {
  articleId: number;
  title: string;
  content: string;
  isLiked: boolean;
  date: string;
  owner: string;
  likes: {
    nickname: string;
    email: string;
  }[];
  isOwner: boolean;
};
type ResponseType = { response: ArticleModel[] };

const articleDtoMapper = (articles: ArticleModel[]) => {
  return articles?.map((article: ArticleModel) => {
    return {
      title: article.title,
      content: article.content,
      date: article.date.slice(0, 10),
      owner: article.owner,
      isLiked: article.isLiked,
      articleId: article.articleId,
      likes: article.likes,
      isOwner: article.isOwner,
    };
  });
};

type GetArticlesType = {
  roomId: number;
  userId: number;
};

const getArticles = async ({ roomId, userId }: GetArticlesType) => {
  const { data } = await networkClient.get<ResponseType>(
    `/Article?roomId=${roomId}&userId=${userId}`
  );

  return articleDtoMapper(data?.response);
};

const useGetArticles = ({ roomId, userId }: GetArticlesType) => {
  return useQuery({
    queryKey: ArticleQueryKeys.all,
    queryFn: () => getArticles({ roomId, userId }),
    enabled: Boolean(userId),
  });
};

export { useGetArticles, type ArticleModel };
