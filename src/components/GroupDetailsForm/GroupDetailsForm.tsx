import { memo, useEffect } from "react";
import { TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";

import { useCreateArticle } from "../../hooks/Article/useCreateArticle";

type FormFields = "title" | "content" | "ownerId" | "roomId";
type FormType = {
  title: string;
  content: string;
  ownerId: number;
  roomId: number;
};
type GroupDetailsFormType = {
  ownerId: number | undefined;
  roomId: number;
};

const GroupDetailsForm = ({ ownerId, roomId }: GroupDetailsFormType) => {
  const { register, handleSubmit, setValue, reset } = useForm<FormType>({
    defaultValues: {
      ownerId,
      roomId,
    },
  });

  useEffect(() => {
    if (roomId) {
      setValue("roomId", roomId);
    }
  }, [roomId]);

  const { mutateAsync: CreateArticle } = useCreateArticle();

  const submitForm = handleSubmit(async (data) => {
    await CreateArticle(data);
    reset();
  });

  const getFormFields = (field: FormFields) => ({
    ...register(field),
  });

  return (
    <div className="w-full h-[30%] max-md:h-[40%] flex flex-col gap-y-5 overflow-hidden">
      <form
        className="w-full bg-white h-full rounded-lg px-4 pt-2"
        onSubmit={submitForm}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <TextInput
              type="text"
              placeholder="Title..."
              {...getFormFields("title")}
              required
            />
          </div>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <Textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white"
              placeholder="Content..."
              {...getFormFields("content")}
              required
            />
          </div>
          <div className="w-full flex items-start justify-between md:w-full px-3">
            <div></div>
            <input
              type="submit"
              className="bg-white cursor-pointer text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide hover:bg-gray-100"
              value="Post"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(GroupDetailsForm);
