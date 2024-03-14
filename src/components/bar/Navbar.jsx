import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Image, useDisclosure } from '@chakra-ui/react'
import { TiThMenu } from "react-icons/ti";
import SidebarItems from './SidebarItems';
import { useRef } from 'react';
import useLogout from '../../hooks/useLogout';
import { BiLogOut } from 'react-icons/bi';

const Navbar = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const drawerButtonRef = useRef();
    const {handleLogout, isLoggingOut} = useLogout();

    return (
        <>
        <Box
            display={{ base: "block", md: "none"}}
            bg={"#004AAC"}
            color={"white"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={4}
        >
            <Flex direction={"row"} gap={10} w="full">
                <Button ref={drawerButtonRef} bg="transparent" color={"white"} onClick={onOpen} _hover={{ bg: "transparent"}}>
                    <TiThMenu size={40}/>
                </Button>
                <Flex justifyContent={"center"} w={"60%"}>
                    <Avatar name='Easy Tracker' src="/logo_icon.png" bg={"white"} size={"md"}/>
                </Flex>
            </Flex>
        </Box>

        <Drawer isOpen={isOpen} onClose={onClose} size={"sm"} placement="left">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody maxH={"90vh"}>
                    <Flex direction={"column"} gap={10} w="full" height={"full"}>
                        <Image src="/logo_horizontal.png" w={"300px"}/>
                        <Flex direction={"column"} p={2} gap={7} cursor={"pointer"}>
                            <SidebarItems />
                        </Flex>

                        <Flex
                            onClick={handleLogout}
                            alignItems={"center"}
                            gap={4}
                            _hover={{ bg: "blackAlpha.200" }}
                            borderRadius={6}
                            p={2}
                            w={"full"}
                            mt={"auto"}
                            justifyContent={"flex-start"}
                        >
                            <BiLogOut size={25}/>
                            <Button 
                                color={"black"}
                                variant={"ghost"}
                                _hover={{ bg: "transparent" }}
                                isLoading={isLoggingOut}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Flex>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    )
}

export default Navbar