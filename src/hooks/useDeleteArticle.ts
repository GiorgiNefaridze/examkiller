import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { ResponseType } from "./useRegister";
import { client } from "../../QueryClientWrapper";

const useDeleteArticle = (userId: number, articleId: number) => {
  const deleteArticle = async () => {
    try {
      const { data } = await networkClient.delete<ResponseType>(
        `Article?userId=${userId}&articleId=${articleId}`
      );

      return data?.response;
    } catch (error) {
      throw new Error(error.response.data.errorMessage);
    }
  };

  return useMutation({
    mutationKey: ["deleteArticle"],
    mutationFn: deleteArticle,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });
};

export { useDeleteArticle };
