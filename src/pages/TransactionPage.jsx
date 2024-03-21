import { Button, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import AddTransactionModal from "../components/modals/AddTransactionModal";

const TransactionPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex direction={"column"} p={"70px"}>
            <Text fontSize={"4xl"} fontWeight={"bold"} mb={10}>Transactions</Text>
            <Flex justifyContent={"flex-end"} mb={7}>
                <Button colorScheme={"teal"} size='sm' onClick={onOpen}><IoAddOutline size={20} style={{marginRight: "10px"}}/>Add Transaction</Button>
                <AddTransactionModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            <TableContainer bg={"white"}>
                <Table variant={"simple"}>
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Category</Th>
                            <Th>Content</Th>
                            <Th>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>03.01</Td>
                            <Td>
                                <Flex direction={"row"}>
                                    <Image width={"30px"} src="https://firebasestorage.googleapis.com/v0/b/easy-tracker-e2a70.appspot.com/o/icons%2F1_money.png?alt=media&token=4f28204a-b101-4f97-a2ef-8783880e3c62"/>
                                    <Text ml={5}>Household</Text>
                                </Flex>
                            </Td>
                            <Td>
                                Salary
                            </Td>
                            <Td><Text color={"blue"}>$2,000.00</Text></Td>
                        </Tr>
                        <Tr>
                            <Td>03.01</Td>
                            <Td>
                                <Flex direction={"row"}>
                                    <Image width={"30px"} src="https://firebasestorage.googleapis.com/v0/b/easy-tracker-e2a70.appspot.com/o/icons%2F2_home_738873.png?alt=media&token=8448cd6d-2aec-49f8-b9c7-792816f08aa3"/>
                                    <Text ml={5}>Household</Text>
                                </Flex>
                            </Td>
                            <Td>
                                Rent
                            </Td>
                            <Td><Text color={"red"}>$1,500.00</Text></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}

export default TransactionPage