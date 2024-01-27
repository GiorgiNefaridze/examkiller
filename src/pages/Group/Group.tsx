import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Article from "../../components/Article/Article";
import Loader from "../../components/Loader/Loader";
import LikesPopUp from "../../components/LikesPopUp/LikesPopUp";
import {
  ArticleModelType,
  useCreateArticle,
} from "../../hooks/useCreateArticle";
import { type ArticleModel, useGetArticles } from "../../hooks/useGetArticles";
import {
  leaveGroupDtoType,
  useLeaveFromGroup,
} from "../../hooks/useLeaveFromGroup";
import { Toast } from "../../helpers/Toast";
import { NoContentCMP } from "../Dashboard/Dashboard";
import { getCookie } from "../../helpers/cookie";

import { Button } from "../Register/Register.style";
import { Articles, GroupInput, GroupWrapper } from "./Group.style";
import {
  GroupInfo,
  GroupContent,
  GroupInfoDetailsContainer,
} from "../../components/Article/Article.style";

type Field = "title" | "content";
type DataType = Record<Field, string>;

export type articleLikesDataType = {
  nickname: string;
  email: string;
};

const Group = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [articleLikesData, setArticleLikesData] = useState<
    articleLikesDataType[]
  >([]);

  const location = useLocation();
  const user = getCookie("user");
  const { register, handleSubmit, reset } = useForm<DataType>();
  const { data, error, mutateAsync: CreateArticle } = useCreateArticle();
  const { data: articles, isLoading } = useGetArticles(
    location.state?.roomId,
    user?.userId
  );
  const { mutateAsync: LeaveGroup } = useLeaveFromGroup();

  useEffect(() => {
    if (error?.message || data) {
      Toast(error?.message, data);
    }
  }, [error?.message, data]);

  const getFormFields = (field: Field) => ({
    ...register(field),
  });

  const submitForm = async (data: DataType) => {
    const articleDto = {
      title: data.title,
      content: data.content,
      ownerId: location.state?.userId,
      roomId: location.state?.roomId,
    } as ArticleModelType;

    await CreateArticle(articleDto);
    reset();
  };

  const GroupInforDetails = {
    Title: location?.state?.name,
    Type: location?.state?.type,
    Description: location?.state?.description,
    Creator: location?.state?.owner?.nickname?.toUpperCase(),
  };

  const leaveGroupDto = {
    roomId: location?.state?.roomId,
    userId: user?.userId,
  } as leaveGroupDtoType;

  return (
    <GroupWrapper>
      {isShow && (
        <LikesPopUp setIsShow={setIsShow} articleLikesData={articleLikesData} />
      )}
      <GroupContent>
        <GroupInfo>
          {Object.entries(GroupInforDetails).map(([key, val], idx: number) => {
            return (
              <GroupInfoDetailsContainer key={idx}>
                <p>{key}</p>
                <p>{val}</p>
              </GroupInfoDetailsContainer>
            );
          })}
          <form onSubmit={handleSubmit(submitForm)}>
            <GroupInput
              type="text"
              placeholder="Content title..."
              {...getFormFields("title")}
            />
            <GroupInput
              type="text"
              placeholder="Type content here..."
              {...getFormFields("content")}
            />
            <Button type="submit">Add</Button>
            <Button
              type="button"
              id="leave"
              onClick={async () => await LeaveGroup(leaveGroupDto)}
            >
              Leave
            </Button>
          </form>
        </GroupInfo>
        <Articles>
          {isLoading ? (
            <Loader />
          ) : articles?.length ? (
            articles?.map((articles: ArticleModel) => {
              return (
                <Article
                  key={articles.title}
                  setIsShow={setIsShow}
                  setArticleLikesData={setArticleLikesData}
                  {...articles}
                />
              );
            })
          ) : (
            <NoContentCMP />
          )}
        </Articles>
        <Toaster richColors closeButton />
      </GroupContent>
    </GroupWrapper>
  );
};

export default memo(Group);
