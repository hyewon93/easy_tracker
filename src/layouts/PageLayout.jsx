import { Box, Flex, Spinner } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Sidebar from "../components/bar/Sidebar";
import Navbar from "../components/bar/Navbar";

const PageLayout = ({ children }) => {
    const {pathname} = useLocation();
    const [user, loading] = useAuthState(auth);
    const canRenderBar = user && !loading && pathname !== "/auth";
    const checkingUserIsAuth = !user && loading;

    if(checkingUserIsAuth) {
        return <PageLayoutSpinner />
    }

    return (
        <Flex flexDir="column">

            {canRenderBar ? (
                <>
                <Box w={"240px"}>
                    <Sidebar />
                </Box>
                <Box w={"full"}>
                    <Navbar />
                </Box>
                </>
            ) : null}

            <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={"auto"}>
                {children}
            </Box>
        </Flex>
    )
}

export default PageLayout;

const PageLayoutSpinner = () => {
    return (
        <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Spinner size={"x1"} />
        </Flex>
    );
};