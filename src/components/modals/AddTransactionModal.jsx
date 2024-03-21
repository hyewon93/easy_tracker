import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex, Stack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useState } from "react";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import useCategoryStore from "../../store/categoryStore";
import { Select } from "@chakra-ui/select";
import useShowToast from "../../hooks/useShowToast";
import useAddTransaction from "../../hooks/useAddTransaction";

const AddTransactionModal = ({ isOpen, onClose }) => {

    const [inputs, setInputs] = useState({
        type: "",
        date: "",
        category: "",
        content: "",
        amount: "",
    });
    const [type, setType] = useState("1");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const categories = useCategoryStore(state => state.categories);
    const {isLoading, addTransaction} = useAddTransaction();
    const showToast = useShowToast();

    const dateFormat = (date) => {
        return date.getFullYear() + 
            "-" + ( (date.getMonth() + 1) < 9 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1)) +
            "-" + ( (date.getDate()) < 9 ? "0"+(date.getDate()) : (date.getDate()));
    }
    
    const validation = () => {
        
        if(inputs.category === "" || inputs.category === undefined) {
            return false;
        }
        if(inputs.content === "") {
            return false;
        }
        if(inputs.amount === "" || inputs.amount <= 0) {
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        inputs.type = type;
        inputs.date = dateFormat(selectedDate);

        if(validation()) {
            try{
                await addTransaction(inputs);
                onClose();
                
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        } else {
            showToast("Error", "Please fill all field with valid values.", "error");
        }

        console.log(inputs);
    };

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
                                <FormLabel fontSize={"sm"}>Type</FormLabel>
                                <RadioGroup onChange={setType} value={type}>
                                    <Stack spacing={5} direction={"row"}>
                                        <Radio colorScheme="blue" value="1">Income</Radio>
                                        <Radio colorScheme="red" value="2">Expense</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Date</FormLabel>
                                <DatePicker selected={selectedDate} onSelect={(date) => setSelectedDate(date)} dateFormat={"yyyy-MM-dd"} style={{ cursor: "pointer" }}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Category</FormLabel>
                                <Select placeholder="Category" onChange={(e) => inputs.category = (type === "1" ? categories.incomes : categories.expenses)[e.target.value]}>
                                    {(type === "1" ? categories.incomes : categories.expenses).map((category, idx) => (
                                        <option value={idx} key={idx}>{category.name}</option>
                                    ))}
                                </Select>
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
                            <Button bg={"blue.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "blue.500" }} isLoading={isLoading} onClick={handleSubmit}>
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