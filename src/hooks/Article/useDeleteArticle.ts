import { useMutation, useQueryClient } from "@tanstack/react-query";

import networkClient from "../../../network";
import { ResponseType } from "../Auth/useRegister";
import { ArticleQueryKeys } from "./queries";

type DeleteArticleType = {
  userId: number;
  articleId: number;
};

const deleteArticle = async ({ userId, articleId }: DeleteArticleType) => {
  const { data } = await networkClient.delete<ResponseType>(
    `Article?userId=${userId}&articleId=${articleId}`
  );

  return data?.response;
};

const useDeleteArticle = ({ userId, articleId }: DeleteArticleType) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["deleteArticle"],
    mutationFn: () => deleteArticle({ userId, articleId }),
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ArticleQueryKeys.all });
    },
  });
};

export { useDeleteArticle };
