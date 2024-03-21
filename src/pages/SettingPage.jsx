import { Avatar, AvatarGroup, Button, Container, Flex, Image, Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react';
import { MdModeEdit } from "react-icons/md";
import EditProfileModal from '../components/modals/EditProfileModal';
import useCategoryStore from '../store/categoryStore';
import EditCategoryModal from '../components/modals/EditCategoryModal';
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase/firebase';

const SettingPage = () => {

    const { 
        isOpen: isOpenProfile, 
        onOpen: onOpenProfile, 
        onClose: onCloseProfile 
    } = useDisclosure();
    const { 
        isOpen: isOpenIncomeCategory, 
        onOpen: onOpenIncomeCategory, 
        onClose: onCloseIncomeCategory 
    } = useDisclosure();
    const { 
        isOpen: isOpenExpensesCategory, 
        onOpen: onOpenExpensesCategory, 
        onClose: onCloseExpensesCategory 
    } = useDisclosure();

    const authUser = JSON.parse(localStorage.getItem("user-info"));
    const categories = useCategoryStore(state => state.categories);
    const [categoryIcons, setCategoryIcons] = useState([]);

    useEffect(() => {
        setCategoryIcons([]);

        const icons = [];
        const iconsRef = ref(storage, 'icons');

        listAll(iconsRef)
        .then((res) => {
            res.items.forEach(async (iconRef) => {
                const URL = await getDownloadURL(iconRef);
                icons.push(URL);
            });
        });

        setCategoryIcons(icons);
    }, []);

    return (
        <Container maxW={"container.lg"} py={5}>
            <Flex pb={10} pl={10} w={"full"} mx={"auto"} flexDirection={"column"} bg={"white"} borderRadius={10}>
                <Flex justifyContent={"flex-end"} w={"full"} pt={3} pr={3}>
                    <Button 
                        bg={"transparent"} 
                        onClick={onOpenProfile}
                    >
                        <MdModeEdit />
                    </Button>
                </Flex>
                <Flex direction={{ base: "column", sm: "row"}} alignItems={"center"}>
                    <AvatarGroup size={{ base: "xl", md: "2x1" }} justifyContent={"center"} alignSelf={"flex-start"} mx={"auto"}>
                        <Avatar w={"120px"} src={authUser.profilePicURL} alt={authUser.fullName} />
                    </AvatarGroup>
                    <VStack alignItems={"start"} gap={3} mx={"auto"} flex={1} ml={10}>
                        <Text fontSize={"lg"} fontWeight={"bold"}>{authUser.fullName}</Text>
                        <Text fontSize={"sm"}>{authUser.email}</Text>
                    </VStack>

                    {isOpenProfile && <EditProfileModal isOpen={isOpenProfile} onClose={onCloseProfile} /> }
                </Flex>
            </Flex>

            <Flex pb={10} pl={10} mt={5} w={"full"} mx={"auto"} flexDirection={"column"} bg={"white"} borderRadius={10}>
                <Flex justifyContent={"flex-end"} w={"full"} pt={3} pr={3}>
                    <Button 
                        bg={"transparent"} 
                        onClick={onOpenIncomeCategory}
                    >
                        <MdModeEdit />
                    </Button>
                </Flex>
                <Flex direction={"column"} mr={10}>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Income Category</Text>
                    <TableContainer mt={10}>
                        <Table variant={"simple"}>
                            <Thead>
                                <Tr>
                                    <Th w={"25%"}>Icon</Th>
                                    <Th w={"25%"}>Color</Th>
                                    <Th>Category</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {categories?.incomes?.map((category, idx) => (
                                    <Tr key={idx}>
                                        <Td><Image width={"25px"} src={category.url} /></Td>
                                        <Td justifyContent={"center"}><Tag size={"md"} variant={"solid"} bg={category.color}/></Td>
                                        <Td><Text>{category.name}</Text></Td>
                                    </Tr>
                                ))}
                                
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {isOpenIncomeCategory && <EditCategoryModal type={"income"} icons={categoryIcons} isOpen={isOpenIncomeCategory} onClose={onCloseIncomeCategory} /> }
                </Flex>
            </Flex>
            <Flex pb={10} pl={10} mt={5} w={"full"} mx={"auto"} flexDirection={"column"} bg={"white"} borderRadius={10}>
                <Flex justifyContent={"flex-end"} w={"full"} pt={3} pr={3}>
                    <Button 
                        bg={"transparent"} 
                        onClick={onOpenExpensesCategory}
                    >
                        <MdModeEdit />
                    </Button>
                </Flex>
                <Flex direction={"column"} mr={10}>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Expenses Category</Text>
                    <TableContainer mt={10} w={"full"}>
                        <Table variant={"simple"}>
                            <Thead>
                                <Tr>
                                    <Th w={"25%"}>Icon</Th>
                                    <Th w={"25%"}>Color</Th>
                                    <Th>Category</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {categories?.expenses?.map((category, idx) => (
                                    <Tr key={idx}>
                                        <Td><Image width={"25px"} src={category.url} /></Td>
                                        <Td justifyContent={"center"}><Tag size={"md"} variant={"solid"} bg={category.color}/></Td>
                                        <Td><Text>{category.name}</Text></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {isOpenExpensesCategory && <EditCategoryModal type={"expenses"} icons={categoryIcons} isOpen={isOpenExpensesCategory} onClose={onCloseExpensesCategory} /> }
                </Flex>
            </Flex>
        </Container>
    )
}

export default SettingPage