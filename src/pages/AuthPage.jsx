import { Container, Flex } from "@chakra-ui/react"
import AuthForm from "../components/auth/AuthForm"

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"md"} padding={0} alignItems={"center"} gap={10}>
            <AuthForm />
        </Container>
    </Flex>
  )
}

export default AuthPage