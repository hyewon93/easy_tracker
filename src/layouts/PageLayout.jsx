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
        <Flex flexDir={{ base: "column", md: "row"}}>

            {canRenderBar ? (
                <>
                <Sidebar />
                <Navbar />
                </>
            ) : null}

            <Box flex={1} w={"calc(100% - 250px)"} mx={"auto"}>
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