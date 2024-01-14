import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { client } from "../../QueryClientWrapper";

type likeArticleModelType = {
  articleId: number;
  userId: number;
};

const useLikeArticle = () => {
  const likeArticle = async (likeArticleModel: likeArticleModelType) => {
    try {
      const { data } = await networkClient.post<boolean>(
        "LikedArticle",
        likeArticleModel
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  return useMutation({
    mutationKey: ["likeArticle"],
    mutationFn: likeArticle,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });
};

export { useLikeArticle };
