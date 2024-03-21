import { Box, Button, Flex, Image, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import useGetTransactions from "../hooks/useGetTransactions";
import { MdDelete } from "react-icons/md";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import { useState } from "react";

const TransactionPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
    const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth()+1);
    const {isLoading, transactions, years} = useGetTransactions(currentYear, currentMonth);
    const {isDeleting, delete_transaction} = useDeleteTransaction();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const handleChangeDate = (type, value) => {
        if(type === "year") {
            setCurrentYear(value);
        } else {
            setCurrentMonth(value);
        }
    }

    const handleDelete = (transaction) => {
        delete_transaction(transaction);
    }

    return (
        <Flex direction={"column"} p={"70px"}>
            <Text fontSize={"4xl"} fontWeight={"bold"} mb={10}>Transactions</Text>
            <Flex direction={"row"} justifyContent={"space-between"} mb={7}>
                <Flex direction={"row"} justifyContent={"flex-start"} gap={4}>
                    <Select w={"150px"} maxW={"300px"} bg={"white"} defaultValue={currentYear} onChange={(e) => handleChangeDate("year", e.target.value)}>
                        {years.map((year,idx) => (
                            <option value={year} key={idx}>{year}</option>
                        ))}
                    </Select>
                    <Select w={"100px"} maxW={"100px"} bg={"white"} defaultValue={currentMonth} onChange={(e) => handleChangeDate("month", e.target.value)}>
                        {months.map((month, idx) => (
                            <option value={idx+1} key={idx}>{month}</option>
                        ))}
                    </Select>
                </Flex>
                <Button colorScheme={"teal"} size='sm' onClick={onOpen}><IoAddOutline size={20} style={{marginRight: "10px"}}/>Add Transaction</Button>
                <AddTransactionModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            
            {(isLoading || isDeleting) && (
            <Skeleton w={"full"}>
                <Box h={"500px"}>Contents Wrapped</Box>
            </Skeleton>
            )}
            {(!isLoading && !isDeleting) && (
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
                                    <Button color={"red.400"} bg={"transparent"} _hover={{ bg: "transparent" }} onClick={() => handleDelete(transaction)}><MdDelete/></Button>
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