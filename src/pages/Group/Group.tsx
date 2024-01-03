import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { RiAddBoxFill } from "react-icons/ri";
import { Toaster } from "sonner";

import {
  ArticleModelType,
  useCreateArticle,
} from "../../hooks/useCreateArticle";
import { useGetArticles } from "../../hooks/useGetArticles";
import { Toast } from "../../helpers/Toast";

import { GroupInput, GroupWrapper } from "./Group.style";
import { Button } from "../Register/Register.style";

type Field = "title" | "content";
type DataType = Record<Field, string>;

const Group = () => {
  const [isInpShow, setIsInpShow] = useState<boolean>(true);

  const location = useLocation();
  const { register, handleSubmit, reset } = useForm<DataType>();
  const { data, error, mutateAsync: CreateArticle } = useCreateArticle();
  const { data: articles } = useGetArticles(location.state?.roomId);

  useEffect(() => {
    if (error?.message || data) {
      Toast(error?.message, data);
    }
  }, [error?.message, data]);

  const handleOpen = () => {
    setIsInpShow((prev) => !prev);
  };

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

  return (
    <GroupWrapper>
      <label>
        <p>Add Something Productive For Group</p>
        <RiAddBoxFill
          color="#3081d0"
          size={30}
          cursor="pointer"
          onClick={handleOpen}
        />
      </label>
      {isInpShow && (
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
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
          </div>
          <Button>Add</Button>
        </form>
      )}
      <div></div>
      <Toaster richColors closeButton />
    </GroupWrapper>
  );
};

export default memo(Group);
