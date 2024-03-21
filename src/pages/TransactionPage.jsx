import { Box, Button, Flex, Image, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import useGetTransactions from "../hooks/useGetTransactions";
import { MdDelete } from "react-icons/md";

const TransactionPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isLoading, transactions} = useGetTransactions();

    return (
        <Flex direction={"column"} p={"70px"}>
            <Text fontSize={"4xl"} fontWeight={"bold"} mb={10}>Transactions</Text>
            <Flex justifyContent={"flex-end"} mb={7}>
                <Button colorScheme={"teal"} size='sm' onClick={onOpen}><IoAddOutline size={20} style={{marginRight: "10px"}}/>Add Transaction</Button>
                <AddTransactionModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            {isLoading && (
            <Skeleton w={"full"}>
                <Box h={"500px"}>Contents Wrapped</Box>
            </Skeleton>
            )}
            {!isLoading && (
            <TableContainer bg={"white"}>
                <Table variant={"simple"}>
                    <Thead>
                        <Tr>
                            <Th w={"20%"}>Date</Th>
                            <Th w={"25%"}>Category</Th>
                            <Th>Content</Th>
                            <Th textAlign={"right"} w={"20%"}>Amount</Th>
                            <Th w={"10%"}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactions.map((transaction, idx) => (
                            <Tr key={idx}>
                                <Td>{transaction.date}</Td>
                                <Td>
                                    <Flex direction={"row"}>
                                        <Image width={"25px"} src={transaction.categoryIcon}/>
                                        <Text ml={5}>{transaction.categoryName}</Text>
                                    </Flex>
                                </Td>
                                <Td>{transaction.content}</Td>
                                <Td textAlign={"right"}><Text color={transaction.type === "1" ? "blue" : "red"}>${((Number(transaction.amount)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Td>
                                <Td>
                                    <Button color={"red.400"} bg={"transparent"} _hover={{ bg: "transparent" }}><MdDelete/></Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            )}
        </Flex>
    )
}

export default TransactionPage