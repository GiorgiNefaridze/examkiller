import { useQuery } from "@tanstack/react-query";

import networkClient from "../../network";

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
};
type ResponseType = { errorMessage: string } | { response: ArticleModel[] };

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
    };
  });
};

const useGetArticles = (roomId: number, userId: number) => {
  const getArticles = async () => {
    try {
      const { data } = await networkClient.get<ResponseType>(
        `/Article?roomId=${roomId}&userId=${userId}`
      );

      return articleDtoMapper(data?.response);
    } catch (error) {
      throw new Error(error.response.data.errorMessage);
    }
  };

  return useQuery({
    queryKey: ["getArticles"],
    queryFn: getArticles,
  });
};

export { useGetArticles, type ArticleModel };
