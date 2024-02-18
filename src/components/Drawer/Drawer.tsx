import { memo, type Dispatch, type SetStateAction } from "react";
import {
  Button,
  Textarea,
  Label,
  Modal,
  TextInput,
  Select,
  Blockquote,
  Spinner,
} from "flowbite-react";
import { useForm } from "react-hook-form";

import { useCreateRoom } from "../../hooks/Room/useCreateRoom";
import { examTypes } from "../../../constants";
import { getCookie } from "../../helpers/cookie";

type DrawerType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

type CreateRoomFields = "name" | "description" | "type" | "ownerId";

const Drawer = ({ openModal, setOpenModal }: DrawerType) => {
  const { data, error, mutateAsync: Create, isPending } = useCreateRoom();
  const user = getCookie("user");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { ownerId: user?.userId },
  });

  const getFields = (field: CreateRoomFields) => ({ ...register(field) });

  const submit = handleSubmit(async (data) => {
    await Create(data);
    reset();
  });

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create a new room
            </h3>

            <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
              Note that the name of the room must be unique
            </Blockquote>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Room name" />
              </div>
              <TextInput
                id="name"
                placeholder="Enter room name"
                {...getFields("name")}
              />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="exam" value="Select exam type" />
              </div>
              <Select id="exam" required {...getFields("type")}>
                {examTypes.map((type) => {
                  return <option key={type}>{type}</option>;
                })}
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Room Description" />
              </div>
              <Textarea
                id="description"
                className="max-h-40 min-h-20"
                placeholder="Enter room description"
                {...getFields("description")}
              />
            </div>

            {error && <p className="text-red-700">{error?.message}</p>}
            {data && <p className="text-green-700">{data?.response}</p>}

            <div className="flex items-center gap-x-5">
              <Button
                className="bg-blue-500 px-3 hover:!bg-blue-700 !ring-0"
                onClick={submit}
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner aria-label="Default status example" size={"sm"} />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                className="bg-blue-500 px-3 hover:!bg-blue-700 !ring-0"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(Drawer);
