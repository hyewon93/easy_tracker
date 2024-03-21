import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Flex, Stack } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useState } from "react"

const AddTransactionModal = ({ isOpen, onClose }) => {

    const [inputs, setInputs] = useState({
        date: "",
        category: "",
        content: "",
        amount: ""
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"white"} boxShadow={"x1"} border={"1px solid gray"} mx={3}>
                <ModalHeader>Add Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={"column"}>
                        <Stack spacing={4} w={"full"} maxW={"md"} p={6}>
                            <FormControl>
                                <FormLabel fontSize={"sm"}>Date</FormLabel>
                                <Input
                                    placeholder="Date"
                                    size={"sm"}
                                    type="text"
                                    value={inputs.date}
                                    onChange={(e) => setInputs({...inputs, date: e.target.value})}
                                />
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
                                <FormLabel fontSize={"sm"}>Amount</FormLabel>
                                <Input
                                    placeholder="Amount"
                                    size={"sm"}
                                    type="text"
                                    value={inputs.amount}
                                    onChange={(e) => setInputs({...inputs, amount: e.target.value})}
                                />
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