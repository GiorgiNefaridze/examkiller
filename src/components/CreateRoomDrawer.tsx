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

type PropType = {
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const typeOptions = ["Quiz", "Midterm"];

const CreateRoomDrawer = ({ setIsDrawerOpen }: PropType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = () => {
    onClose();
    setIsDrawerOpen(false);
  };

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
                />
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Select type</FormLabel>
                <Select id="owner" defaultValue="segun">
                  {typeOptions.map((type) => {
                    return <option value={type}>{type}</option>;
                  })}
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" placeholder="Please enter description" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default memo(CreateRoomDrawer);
