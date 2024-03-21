import { Avatar, Button, Center, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useShowToast from '../../hooks/useShowToast';

const EditProfileModal = ({ isOpen, onClose }) => {

    const authUser = JSON.parse(localStorage.getItem("user-info"));
    const [inputs, setInputs] = useState({
        fullName: '',
    });
    const fileRef = useRef(null);
    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
    const { isUpdating, editProfile } = useEditProfile();
    const showToast = useShowToast();

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            onClose();

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"white"} boxShadow={"x1"} border={"1px solid gray"} mx={3}>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Stack spacing={4} w={"full"} maxW={"md"} p={6}>
                            <FormControl>
                                <Stack direction={["column", "row"]} spacing={6}>
                                    <Center>
                                        <Avatar size="xl" src={selectedFile || authUser.profilePicURL} border={"2px solid white"} />
                                    </Center>
                                    <Center w={"full"}>
                                        <Button w={"full"} onClick={() => fileRef.current.click()}>
                                            Edit Profile Picture
                                        </Button>
                                    </Center>
                                    <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                                </Stack>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                                <Input 
                                    placeholder="Full Name" 
                                    size={"sm"} 
                                    type="text" 
                                    value={inputs.fullName || authUser.fullName} 
                                    onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={"sm"}>Email</FormLabel>
                                <Input 
                                    placeholder="Email" 
                                    size={"sm"} 
                                    type="text" 
                                    value={authUser.email} 
                                    disabled
                                />
                            </FormControl>

                            <Stack spacing={6} direction={["column", "row"]}>
                                <Button bg={"red.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "red.500" }} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button bg={"blue.400"} color={"white"} w={"full"} size={"sm"} _hover={{ bg: "blue.500" }} isLoading={isUpdating} onClick={handleEditProfile}>
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EditProfileModal