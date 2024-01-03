import { useQuery } from "@tanstack/react-query";

import networkClient from "../../network";
type ArticleModel = {
  title: string;
  content: string;
  date: string;
  owner: string;
};
type ResponseType = { errorMessage: string } | { response: ArticleModel[] };

const articleDtoMapper = (articles: ArticleModel[]) => {
  return articles?.map((article: ArticleModel) => {
    return {
      title: article.title,
      content: article.content,
      date: article.date.slice(0, 10),
      owner: article.owner,
    };
  });
};

const useGetArticles = (roomId: number) => {
  const getArticles = async () => {
    try {
      const { data } = await networkClient.get<ResponseType>(
        `/Article/room/${roomId}`
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
