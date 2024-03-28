import { Flex, Text, VStack } from "@chakra-ui/layout";
import BarChart from "../components/charts/BarChart";
import { useState } from "react";
import useGetDashabordData from "../hooks/useGetDashabordData";
import { Tag } from "@chakra-ui/tag";
import { Doughnut } from "react-chartjs-2";

const Dashboard = () => {

  const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
  const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth()+1);
  const {isLoading, totalExpense, totalIncome, categoryTransactions, last6Months} = useGetDashabordData(currentYear, currentMonth);

  return ( 
    <>
    {!isLoading && (
      <Flex direction={"row"} w={"full"} mt={10} px={10} gap={5}>
        <Flex direction={"column"} w={"full"} >
          <Flex direction={"row"} justifyContent={"space-between"} gap={5}>
            <Flex w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} p={5} justifyContent={"center"}>
              <VStack>
                <Text fontSize={"xl"}>Income</Text>
                <Text fontSize={"2xl"} color={"blue"}>${totalIncome}</Text>
              </VStack>
            </Flex>
            <Flex w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} p={5} justifyContent={"center"}>
              <VStack>
                <Text fontSize={"xl"}>Expense</Text>
                <Text fontSize={"2xl"} color={"red"}>${totalExpense}</Text>
              </VStack>
            </Flex>
          </Flex>
          <Flex direction={"column"} w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} mt={10}>
            <Flex w={"full"}>
              <BarChart data={setDataForBarChart(last6Months)} />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={"column"} w={"full"} bg={"white"} borderRadius={10} boxShadow={"xl"} h={"90vh"} px={20}>
          <Flex h={"50%"} py={5} justifyContent={"center"}>
            <Doughnut data={setDataForDoughnutChart(categoryTransactions)}/>
          </Flex>
          <Flex direction={"column"} h={"50%"} w={"full"} px={5} my={5} gap={4} overflowY={"scroll"}>
            {categoryTransactions?.map((category, idx) => (
              <Flex direction={"row"} key={idx} w={"full"}>
                <Flex direction={"row"} w={"50%"}>
                  <Tag size={"md"} borderRadius={"full"} variant={"solid"} bg={category.color} mr={3}/>
                  <Text>{category.category}</Text>
                </Flex>
                <Text w={"25%"} textAlign={"right"}>${category.totalAmount}</Text>
                <Text w={"25%"} textAlign={"right"}>{category.percentage}%</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    )}
    </>
  )
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