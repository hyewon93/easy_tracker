import { Button, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Stack, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ColorTemplate from "../templates/ColorTemplate";
import useCurrentCategoryStore from "../../store/currentCategoryStore";
import useUpdateCategories from "../../hooks/useUpdateCategories";
import useShowToast from "../../hooks/useShowToast";
import useCategoryStore from "../../store/categoryStore";
import IconTemplate from "../templates/IconTemplate";

const EditCategoryModal = ({ type, icons, isOpen, onClose }) => {

  const categories = useCategoryStore(state => state.categories);
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

  const handleCancel = () => {
    setCurrentCategories(categories);
    onClose();
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
                    <Td>
                      <Popover styleConfig={{ maxWidth: 'unset', width: 'unset' }}>
                        <PopoverTrigger>
                          <Image width={"25px"} src={category.url} cursor={"pointer"} />
                        </PopoverTrigger>
                        <PopoverContent border="1px solid gray" bg={"white"} p={2} borderRadius={6}>
                          <PopoverArrow bg={"gray"}/>
                          <PopoverBody><IconTemplate categoryIcons={icons} idx={idx} type={type} currentCategories={currentCategories} setCurrentCategories={setCurrentCategories} /></PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Td>
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
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Stack spacing={6} direction={["column", "row"]} mt={10} mb={3}>
            <Button bg={"red.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "red.500" }} onClick={handleCancel}>
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