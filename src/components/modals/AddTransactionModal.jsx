import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useState } from "react";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const AddTransactionModal = ({ isOpen, onClose }) => {

    const [inputs, setInputs] = useState({
        date: "",
        category: "",
        content: "",
        amount: ""
    });
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"white"} boxShadow={"x1"} border={"1px solid gray"} mx={3}>
                <ModalHeader>Add Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={"column"}>
                        <Stack spacing={6} w={"full"} maxW={"md"} p={6}>
                            <FormControl>
                                <FormLabel fontSize={"sm"}>Date</FormLabel>
                                <DatePicker selected={selectedDate} onSelect={(date) => setSelectedDate(date)} dateFormat={"yyyy-MM-dd"} style={{ cursor: "pointer" }}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Category</FormLabel>
                                <Input
                                    placeholder="Category"
                                    size={"sm"}
                                    type="text"
                                    value={inputs.category}
                                    onChange={(e) => setInputs({...inputs, category: e.target.value})}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Content</FormLabel>
                                <Input
                                    placeholder="Content"
                                    size={"sm"}
                                    type="text"
                                    value={inputs.content}
                                    onChange={(e) => setInputs({...inputs, content: e.target.value})}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Type</FormLabel>
                                <RadioGroup>
                                    <Stack spacing={5} direction={"row"}>
                                        <Radio colorScheme="blue" value="1">Income</Radio>
                                        <Radio colorScheme="red" value="2">Expense</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Amount</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents={"none"} color={"gray.300"} fontSize={"1em"} w={"10%"} pb={2}>
                                    $
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Amount"
                                        size={"sm"}
                                        type="number"
                                        value={inputs.amount}
                                        onChange={(e) => setInputs({...inputs, amount: e.target.value})}
                                    />
                                </InputGroup>
                            </FormControl>
                        </Stack>

                        <Stack spacing={6} direction={"row"} py={3}>
                            <Button bg={"red.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "red.500" }} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button bg={"blue.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "blue.500" }}>
                                Submit
                            </Button>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddTransactionModal