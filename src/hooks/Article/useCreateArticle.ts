import { useMutation, useQueryClient } from "@tanstack/react-query";

import networkClient from "../../../network";
import { ResponseType } from "../Auth/useRegister";
import { ArticleQueryKeys } from "./queries";

type ArticleModelType = {
  title: string;
  content: string;
  ownerId: number;
  roomId: number;
};

const createArticle = async (articleModel: ArticleModelType) => {
  const { data } = await networkClient.post<ResponseType>(
    "/Article",
    articleModel
  );

  return data?.response;
};

const useCreateArticle = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["createArticle"],
    mutationFn: createArticle,
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ArticleQueryKeys.all });
    },
  });
};

export { useCreateArticle, type ArticleModelType };
