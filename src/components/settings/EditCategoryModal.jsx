import { Button, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Stack, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ColorTemplate from "../templates/ColorTemplate";
import useCurrentCategoryStore from "../../store/currentCategoryStore";
import useUpdateCategories from "../../hooks/useUpdateCategories";
import useShowToast from "../../hooks/useShowToast";

const EditCategoryModal = ({ type, isOpen, onClose }) => {

  const currentCategories = useCurrentCategoryStore(state => state.currentCategories);
  const setCurrentCategories = useCurrentCategoryStore(state => state.setCurrentCategories);
  const {isUpdating, updateCategories} = useUpdateCategories();
  const showToast = useShowToast();

  const handleEditCategory = async () => {
    try {
        await updateCategories();
        onClose();

    } catch (error) {
        showToast("Error", error.message, "error");
    }
  }

  const handleChangeCategory = () => {
    console.log("change");
  }

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"white"} boxShadow={"x1"} border={"1px solid gray"} mx={3}>
        <ModalHeader>Edit Categories</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th w={"25%"}>Icon</Th>
                  <Th w={"25%"}>Color</Th>
                  <Th>Category</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(type === "income" ? currentCategories.incomes : currentCategories.expenses)?.map((category, idx) => (
                  <Tr key={idx}>
                    <Td><Image width={"25px"} src={category.url} cursor={"pointer"} /></Td>
                    <Td justifyContent={"center"}>
                      
                      <Popover>
                        <PopoverTrigger>
                          <Tag size={"md"} variant={"solid"} bg={category.color} cursor={"pointer"}/>
                        </PopoverTrigger>
                        <PopoverContent border="1px solid gray">
                          <PopoverArrow bg={"gray"}/>
                          <PopoverBody><ColorTemplate idx={idx} type={type} currentCategories={currentCategories} setCurrentCategories={setCurrentCategories} /></PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Td>
                    <Td>
                      <Input 
                        placeholder="Category"
                        value={category.name}
                        onChange={handleChangeCategory}
                      />
                    </Td>
                  </Tr>
                ))};
              </Tbody>
            </Table>
          </TableContainer>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button bg={"red.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "red.500" }} onClick={onClose}>
                Cancel
            </Button>
            <Button bg={"blue.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "blue.500" }} isLoading={isUpdating} onClick={handleEditCategory}>
                Submit
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditCategoryModal