import { Flex, Grid, GridItem, Image, VStack } from "@chakra-ui/react";

const IconTemplate = ({ categoryIcons, idx, type, currentCategories, setCurrentCategories }) => {

  const changeIcon = (icon) => {
    const tempCategories = {...currentCategories};
    (type === "income" ? tempCategories.incomes : tempCategories.expenses)[idx].url = icon;
    setCurrentCategories(tempCategories);
  }

  return (
    <>
      <Flex direction={"column"} w={"full"} justifyContent={"center"} alignItems={"center"} gap={4} py={3}>
        <VStack spacing={2}>
          <Grid templateColumns='repeat(10, 1fr)' gap={6}>
            {categoryIcons.map((icon, idx) => (
              <GridItem key={idx} onClick={()=>{changeIcon(icon)}} cursor={"pointer"}><Image src={icon} width={"30px"}/></GridItem> 
            ))}
          </Grid>
        </VStack>
      </Flex>
    </>
    
  )
}

export default IconTemplate