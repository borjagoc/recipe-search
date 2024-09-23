import React from "react";
import {
  Box,
  Heading,
  Badge,
  HStack,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";

const Recipe = (props) => {
  const { recipe } = props;
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" maxW="sm" mb={5}>
    <Heading fontSize="xl" mb={2}>
      {recipe.title}
    </Heading>

    <HStack spacing={4} mb={2}>
      <Badge colorScheme="green">Prep Time: {recipe.prepTime} mins</Badge>
      <Badge colorScheme="blue">Servings: {recipe.servings}</Badge>
    </HStack>

    <Text fontWeight="bold" mb={2}>
      Ingredients:
    </Text>
    <UnorderedList>
      {recipe.ingredients.map((ingredient, index) => (
        <ListItem key={index}>{ingredient}</ListItem>
      ))}
    </UnorderedList>

    <Text fontWeight="bold" mt={4}>
      Instructions:
    </Text>
    <Text>{recipe.instructions}</Text>
  </Box>;
};

export default Recipe;
