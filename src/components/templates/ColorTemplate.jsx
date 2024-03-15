
import { Flex, HStack } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"

const ColorTemplate = ({idx, type, currentCategories, setCurrentCategories}) => {

    const changeColor = (color) => {
        const tempCategories = {...currentCategories};
        (type === "income" ? tempCategories.incomes : tempCategories.expenses)[idx].color = color;
        setCurrentCategories(tempCategories);
    }

  return (
    <Flex direction={"column"} w={"full"} justifyContent={"center"} alignItems={"center"} gap={4} py={3}>
        <HStack spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#b93b4f"} cursor={"pointer"} onClick={()=>{changeColor("#b93b4f")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#e4617a"} cursor={"pointer"} onClick={()=>{changeColor("#e4617a")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#fe90a9"} cursor={"pointer"} onClick={()=>{changeColor("#fe90a9")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#fdd6de"} cursor={"pointer"} onClick={()=>{changeColor("#fdd6de")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#ffecf1"} cursor={"pointer"} onClick={()=>{changeColor("#ffecf1")}} />
        </HStack>
        <HStack  spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#af5131"} cursor={"pointer"} onClick={()=>{changeColor("#af5131")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#e0744e"} cursor={"pointer"} onClick={()=>{changeColor("#e0744e")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#fa9a7a"} cursor={"pointer"} onClick={()=>{changeColor("#fa9a7a")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#fedac9"} cursor={"pointer"} onClick={()=>{changeColor("#fedac9")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#ffefe1"} cursor={"pointer"} onClick={()=>{changeColor("#ffefe1")}} />
        </HStack>
        <HStack  spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#a7741c"} cursor={"pointer"} onClick={()=>{changeColor("#a7741c")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#daa12b"} cursor={"pointer"} onClick={()=>{changeColor("#daa12b")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#f5d064"} cursor={"pointer"} onClick={()=>{changeColor("#f5d064")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#f9eeac"} cursor={"pointer"} onClick={()=>{changeColor("#f9eeac")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#fcf8cf"} cursor={"pointer"} onClick={()=>{changeColor("#fcf8cf")}} />
        </HStack>
        <HStack  spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#167364"} cursor={"pointer"} onClick={()=>{changeColor("#167364")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#26aa85"} cursor={"pointer"} onClick={()=>{changeColor("#26aa85")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#69d4a5"} cursor={"pointer"} onClick={()=>{changeColor("#69d4a5")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#cdf4d4"} cursor={"pointer"} onClick={()=>{changeColor("#cdf4d4")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#ebfae3"} cursor={"pointer"} onClick={()=>{changeColor("#ebfae3")}} />
        </HStack>
        <HStack  spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#343fa6"} cursor={"pointer"} onClick={()=>{changeColor("#343fa6")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#506ee2"} cursor={"pointer"} onClick={()=>{changeColor("#506ee2")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#7fa9fd"} cursor={"pointer"} onClick={()=>{changeColor("#7fa9fd")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#cce2ff"} cursor={"pointer"} onClick={()=>{changeColor("#cce2ff")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#e8f4ff"} cursor={"pointer"} onClick={()=>{changeColor("#e8f4ff")}} />
        </HStack>
        <HStack  spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#6024b0"} cursor={"pointer"} onClick={()=>{changeColor("#6024b0")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#8d4de2"} cursor={"pointer"} onClick={()=>{changeColor("#8d4de2")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#ba8ef4"} cursor={"pointer"} onClick={()=>{changeColor("#ba8ef4")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#e3d1fa"} cursor={"pointer"} onClick={()=>{changeColor("#e3d1fa")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#f8eaff"} cursor={"pointer"} onClick={()=>{changeColor("#f8eaff")}} />
        </HStack>
        <HStack  spacing={5}>
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#5e6068"} cursor={"pointer"} onClick={()=>{changeColor("#5e6068")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#777d85"} cursor={"pointer"} onClick={()=>{changeColor("#777d85")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#a8aeb2"} cursor={"pointer"} onClick={()=>{changeColor("#a8aeb2")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#d9dbdb"} cursor={"pointer"} onClick={()=>{changeColor("#d9dbdb")}} />
            <Tag size={"lg"} borderRadius={"full"} variant={"solid"} bg={"#efefef"} cursor={"pointer"} onClick={()=>{changeColor("#efefef")}} />
        </HStack>
    </Flex>
  )
}

export default ColorTemplate