import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import useAuthStore from "../store/authStore";
import { PieChart } from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";

const Dashboard = () => {

  const authUser = useAuthStore((state) => state.user);

  console.log(authUser);

  return ( 
    <Flex direction={"column"} px={"70px"} py={"40px"}>
      <Flex direction={"column"} w={"full"} mt={10}>
        <Flex direction={"column"} w={"full"}>
          <Text fontSize={"3xl"}>2024.03</Text>
          <Flex direction={"row"} w={"full"} mt={3}>
            <Flex direction={"row"} bg={"white"} borderRadius={10} w={"50%"} mr={5} p={5} boxShadow={"xl"} justifyContent={"space-between"}>
              <VStack>
                <Text fontSize={"xl"}>Total Income</Text>
                <Text fontSize={"3xl"} color={"blue"}>$2,500</Text>
              </VStack>
              <Flex px={2} w={"60%"}>
                <PieChart/>
              </Flex>
            </Flex>
            <Flex direction={"row"} bg={"white"} borderRadius={10} w={"50%"} mr={5} p={5} boxShadow={"xl"} justifyContent={"space-between"}>
              <VStack>
                <Text fontSize={"xl"}>Total Expense</Text>
                <Text fontSize={"3xl"} color={"red"}>$2,500</Text>
              </VStack>
              <Flex px={2} w={"60%"}>
                <PieChart/>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={"column"} w={"50%"}>
          <Text fontSize={"3xl"}>2024</Text>
          <Flex w={"full"} h={"auto"}>
            <BarChart />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Dashboard