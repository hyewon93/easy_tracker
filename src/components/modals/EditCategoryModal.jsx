import { Button, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Stack, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ColorTemplate from "../templates/ColorTemplate";
import useCurrentCategoryStore from "../../store/currentCategoryStore";
import useUpdateCategories from "../../hooks/useUpdateCategories";
import useShowToast from "../../hooks/useShowToast";
import useCategoryStore from "../../store/categoryStore";
import IconTemplate from "../templates/IconTemplate";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";

const EditCategoryModal = ({ type, icons, isOpen, onClose }) => {

  const authUser = useAuthStore((state) => state.user);
  const categories = useCategoryStore(state => state.categories);
  const currentCategories = useCurrentCategoryStore(state => state.currentCategories);
  const setCurrentCategories = useCurrentCategoryStore(state => state.setCurrentCategories);
  const {isUpdating, updateCategories} = useUpdateCategories();
    
  const showToast = useShowToast();

  useEffect(() => {    
    async function fetchData() {
      const categoryDocRef = doc(firestore, "categories", authUser?.uid);
      const categoryDocSnap = await getDoc(categoryDocRef);
      setCurrentCategories(categoryDocSnap.data());
    }
    fetchData();
  }, []);

  const handleNewCategory =  () => {
    const tempCategories = {...currentCategories};
    const newIdx = (type === "income" ? tempCategories.incomes : tempCategories.expenses).length;
    (type === "income" ? tempCategories.incomes : tempCategories.expenses)[newIdx] = {
      name: "New Category",
      color: "#a8aeb2",
      url: "https://firebasestorage.googleapis.com/v0/b/easy-tracker-e2a70.appspot.com/o/icons%2F1_save-instagram.png?alt=media&token=dc8dae88-01f3-4961-849d-25fff970d800", 
    };
    setCurrentCategories(tempCategories);
  }

  const handleDeleteCategory = (idx) => {
    const tempCategories = {...currentCategories};
    const removed = (type === "income" ? tempCategories.incomes : tempCategories.expenses).splice(idx, 1);
    setCurrentCategories(tempCategories);
  }

  const handleEditCategory = async () => {
    try {
        await updateCategories();
        onClose();

    } catch (error) {
        showToast("Error", error.message, "error");
    }
  }

  const handleChangeCategory = (idx, e) => {
    const tempCategories = {...currentCategories};
    (type === "income" ? tempCategories.incomes : tempCategories.expenses)[idx].name = e.target.value;
    setCurrentCategories(tempCategories);
  }

  const handleCancel = () => {

    onClose();
    
  }

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"white"} boxShadow={"x1"} border={"1px solid gray"} mx={3}>
        <ModalHeader>Edit Categories</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={"flex-end"}>
            <Button colorScheme={"teal"} size='sm' onClick={handleNewCategory}><IoAddOutline size={20} style={{marginRight: "10px"}}/> New Category</Button>
          </Flex>
          <TableContainer>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th w={"15%"}>Icon</Th>
                  <Th w={"15%"}>Color</Th>
                  <Th w={"65"}>Category</Th>
                  <Th w={"5%"}></Th>
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
                        defaultValue={category.name}
                        onChange={(e) => handleChangeCategory(idx, e)}
                      />
                    </Td>
                    <Td>
                      <Button bg={"transparent"} color={"red"} size='sm' onClick={() => handleDeleteCategory(idx)}><MdDelete size={20}/></Button>
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