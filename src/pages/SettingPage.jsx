import { Avatar, AvatarGroup, Button, Container, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { MdModeEdit } from "react-icons/md";
import EditProfileModal from '../components/settings/EditProfileModal';

const SettingPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = JSON.parse(localStorage.getItem("user-info"));

    return (
        <Container maxW={"container.lg"} py={5}>
            <Flex pb={10} pl={10} w={"full"} mx={"auto"} flexDirection={"column"} bg={"white"} borderRadius={10}>
                <Flex justifyContent={"flex-end"} w={"full"} pt={3} pr={3}>
                    <Button 
                        bg={"transparent"} 
                        onClick={onOpen}
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

                    {isOpen && <EditProfileModal isOpen={isOpen} onClose={onClose} /> }
                </Flex>
            </Flex>
        </Container>
    )
}

export default SettingPage