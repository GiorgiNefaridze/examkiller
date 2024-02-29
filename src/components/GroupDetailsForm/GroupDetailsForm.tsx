import { memo, useEffect } from "react";
import { Button, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";

import { useCreateArticle } from "../../hooks/Article/useCreateArticle";
import { useLeaveFromGroup } from "../../hooks/Room/useLeaveGroup";

type FormFields = "title" | "content" | "ownerId" | "roomId";
type FormType = {
  title: string;
  content: string;
  ownerId: number;
  roomId: number;
};

type GroupDetailsFormType = {
  ownerId: number | undefined;
  userId: number | undefined;
  roomId: number;
};

const GroupDetailsForm = ({
  ownerId,
  roomId,
  userId,
}: GroupDetailsFormType) => {
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
  const { mutateAsync: LeaveRoom } = useLeaveFromGroup();

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
        className="w-full bg-white max-md:flex max-md:items-center max-md:justify-center h-full rounded-lg px-4 pt-2"
        onSubmit={submitForm}
      >
        <div className="flex flex-col max-md:w-full -mx-3 mb-6">
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
            <Button
              color="failure"
              className="!p-0"
              onClick={async () => {
                await LeaveRoom({ roomId, userId });
              }}
            >
              Leave group
            </Button>
            <Button color="light" className="!p-0" type="submit">
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(GroupDetailsForm);
