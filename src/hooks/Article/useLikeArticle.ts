import { useMutation, useQueryClient } from "@tanstack/react-query";

import networkClient from "../../../network";
import { ArticleQueryKeys } from "./queries";

type likeArticleModelType = {
  articleId: number;
  userId: number;
};

const likeArticle = async (likeArticleModel: likeArticleModelType) => {
  const { data } = await networkClient.post<boolean>(
    "LikedArticle",
    likeArticleModel
  );

  return data;
};

const useLikeArticle = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["likeArticle"],
    mutationFn: likeArticle,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ArticleQueryKeys.all });
    },
  });
};

export { useLikeArticle };
