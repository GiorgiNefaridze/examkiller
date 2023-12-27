import {
  useRef,
  type Dispatch,
  type SetStateAction,
  useEffect,
  memo,
} from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useCreateRoom } from "../hooks/useCreateRoom";
import { type RoomModelType } from "../hooks/useCreateRoom";
import { getCookie } from "../helpers/cookie";

type PropType = {
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const typeOptions = ["Quiz", "Midterm"];

const CreateRoomDrawer = ({ setIsDrawerOpen }: PropType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const user = getCookie("user");

  const { register, handleSubmit } = useForm<RoomModelType>({
    defaultValues: { ownerId: user?.userId },
  });
  const { data, error, mutateAsync } = useCreateRoom();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = () => {
    onClose();
    setIsDrawerOpen(false);
  };

  const submitForm = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={handleClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new room</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Room name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter room name"
                  {...register("name")}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Select type</FormLabel>
                <Select id="owner" defaultValue="segun" {...register("type")}>
                  {typeOptions.map((type) => {
                    return <option value={type}>{type}</option>;
                  })}
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  placeholder="Please enter description"
                  {...register("description")}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={submitForm}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default memo(CreateRoomDrawer);
