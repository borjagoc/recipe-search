import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Badge,
  HStack,
  UnorderedList,
  ListItem,
  Text,
  Flex,
  Button,
  VStack,
} from "@chakra-ui/react";

const Recipe = () => {
  const recipeID = useParams().id;
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const url = `/api/v1/recipes/show/${recipeID}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when fetching the response.");
      })
      .then((response) => {
        setRecipe(response);
      });
  }, []);

  return (
    <>
      {recipe ? (
        <Flex justify="center" align="center" h="100vh" p={4} bg="gray.50">
          <VStack>
            <Box p={4} bg="gray.100">
              <Button bg="gray.400" onClick={() => navigate(-1)}>
                Back to user page
              </Button>
            </Box>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              maxW="sm"
              mb={5}
            >
              <Heading fontSize="xl" mb={2}>
                {recipe.title}
              </Heading>

              <HStack spacing={4} mb={2}>
                <Badge colorScheme="green">
                  Prep Time: {recipe.prep_time} mins
                </Badge>
                <Badge colorScheme="blue">Cook Time: {recipe.cook_time}</Badge>
              </HStack>

              <Text>Rating: {recipe.ratings}</Text>

              <Text fontWeight="bold" mb={2}>
                Ingredients:
              </Text>
              <UnorderedList>
                {recipe.ingredients?.map((ingredient, index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </VStack>
        </Flex>
      ) : null}
    </>
  );
};

export default Recipe;
