import { useMutation } from "@tanstack/react-query";

import networkClient from "../../network";
import { ResponseType } from "./useRegister";

type ArticleModelType = {
  title: string;
  content: string;
  ownerId: number;
  roomId: number;
};

const useCreateArticle = () => {
  const createArticle = async (articleModel: ArticleModelType) => {
    try {
      const { data } = await networkClient.post<ResponseType>(
        "/Article",
        articleModel
      );
      return data?.response;
    } catch (error) {
      throw new Error(error.response.data.errorMessage);
    }
  };

  return useMutation({
    mutationKey: ["createArticle"],
    mutationFn: createArticle,
  });
};

export { useCreateArticle, type ArticleModelType };
