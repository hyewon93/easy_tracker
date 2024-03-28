import { Flex, Text, VStack } from "@chakra-ui/layout";
import BarChart from "../components/charts/BarChart";
import { useState } from "react";
import useGetDashabordData from "../hooks/useGetDashabordData";
import { Tag } from "@chakra-ui/tag";
import { Doughnut } from "react-chartjs-2";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import useAuthStore from "../store/authStore";
import { Skeleton } from "@chakra-ui/skeleton";

const Dashboard = () => {

  const authUser = useAuthStore((state) => state.user);
  const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
  const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth()+1);
  const {isLoading, totalExpense, totalIncome, categoryTransactions, last6Months} = useGetDashabordData(currentYear, currentMonth);

  return ( 
    <>
    {isLoading && (
      <DashboardSkeleton />
    )}
    {!isLoading && (
      <Flex direction={"row"} w={"full"} mt={10} px={10} gap={5}>
        <Flex direction={"column"} w={"50%"} gap={10} h={"90vh"}>
          <Flex direction={"row"} alignItems={"center"} w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} gap={2} p={10}>
            <AvatarGroup size={{ base: "xl", md: "2x1" }} justifyContent={"center"} alignSelf={"flex-start"} mx={"auto"}>
              <Avatar w={"100px"} src={authUser.profilePicURL} alt={authUser.fullName} />
            </AvatarGroup>
            <VStack alignItems={"start"} gap={3} mx={"auto"} flex={1} ml={10}>
              <Text fontSize={"lg"} fontWeight={"bold"}>Welcome, {authUser.fullName}!</Text>
              <Text fontSize={"sm"}>{authUser.email}</Text>
            </VStack>
          </Flex>
          <Flex direction={"row"} justifyContent={"space-between"} gap={5}>
            <Flex w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} p={5} justifyContent={"center"}>
              <VStack>
                <Text fontSize={"lg"}>Income</Text>
                <Text fontSize={"2xl"} color={"blue"}>${(totalIncome.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </VStack>
            </Flex>
            <Flex w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} p={5} justifyContent={"center"}>
              <VStack>
                <Text fontSize={"lg"}>Expense</Text>
                <Text fontSize={"2xl"} color={"red"}>${(totalExpense.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </VStack>
            </Flex>
          </Flex>
          <Flex direction={"column"} w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} h={"100%"} justifyContent={"center"}>
            {Object.keys(last6Months).length === 0 && (
              <Flex direction={"column"} textAlign={"center"}>
                <Text>No data available.</Text>
              </Flex>
            )}
            {Object.keys(last6Months).length > 0 && (
              <Flex w={"full"} minH={"300px"}>
                <BarChart data={setDataForBarChart(last6Months)} />
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex direction={"column"} w={"50%"} bg={"white"} borderRadius={10} boxShadow={"xl"} h={"90vh"} px={20} justifyContent={"center"}>
          {categoryTransactions.length == 0 && (
            <Flex direction={"column"} textAlign={"center"}>
              <Text>No data available.</Text>
            </Flex>
          )}
          {categoryTransactions.length > 0 && (
            <>
            <Flex h={"50%"} py={5} justifyContent={"center"}>
              <Doughnut data={setDataForDoughnutChart(categoryTransactions)}/>
            </Flex>
            <Flex direction={"column"} h={"50%"} w={"full"} px={5} my={5} gap={4} overflowY={"scroll"}>
              
              {categoryTransactions?.map((category, idx) => (
                <Flex direction={"row"} key={idx} w={"full"}>
                  <Flex direction={"row"} w={"50%"}>
                    <Tag size={"sm"} borderRadius={"full"} variant={"solid"} bg={category.color} mr={3}/>
                    <Text fontSize={"sm"}>{category.category}</Text>
                  </Flex>
                  <Text fontSize={"sm"} w={"25%"} textAlign={"right"}>$ {(category.totalAmount.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  <Text fontSize={"sm"} w={"25%"} textAlign={"right"}>{category.percentage} %</Text>
                </Flex>
              ))}
            </Flex>
            </>
          )}
          
        </Flex>
      </Flex>
    )}
    </>
  )
}

const DashboardSkeleton = () => {
  return (
    <Flex direction={"row"} w={"full"} h={"90vh"} mt={10} px={10} gap={5}>
      <Flex direction={"column"} w={"full"} gap={10}>
        <Skeleton w={"full"} h={"25%"} borderRadius={10}/>
        <Flex direction={"row"} w={"full"} h={"20%"} gap={5}>
          <Skeleton w={"50%"} h={"100%"} borderRadius={10}/>
          <Skeleton w={"50%"} h={"100%"} borderRadius={10}/>
        </Flex>
        <Skeleton w={"full"} h={"55%"} borderRadius={10}/>
      </Flex>
      <Skeleton w={"full"} borderRadius={10}/>
    </Flex>
  );
}

const setDataForBarChart = (last6Months) => {
  let labels = [];
  let incomeData = [];
  let expenseData = [];
  
  last6Months?.years?.forEach(year => {
    labels.push(year);
  });

  last6Months?.income?.forEach(income => {
    incomeData.push(income);
  });

  last6Months?.expense?.forEach(expense => {
    expenseData.push(expense);
  });

  const result = {
    labels: labels,
    datasets: [
      {
          label: 'Income',
          data: incomeData,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
      },
      {
          label: 'Expense',
          data: expenseData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
      }
    ]
  };

  return result;
}

const setDataForDoughnutChart = (categoryTransactions) => {
  let labels = [];
  let data = [];
  let backgroundColors = [];

  categoryTransactions.map((category) => {
    labels.push(category.category);
    data.push(category.totalAmount);
    backgroundColors.push(category.color);
  });

  const result = {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: backgroundColors,
      hoverOffset: 4
    }]
  };

  return result;
}

export default Dashboard