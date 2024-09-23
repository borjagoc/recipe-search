import React from "react";
import { SimpleGrid, Text, Box, VStack } from "@chakra-ui/react";
import { RecipeTile } from "./RecipeTile";

const Recipes = ({ recipes }) => {
  const relevantRecipes = recipes;

  return relevantRecipes?.length > 0 ? (
    <div>
      <Text as="h1" px={10} paddingTop={6}>
        Recipes
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={5} p={10}>
        {relevantRecipes?.map((recipe) => {
          const { id, match_count, total_ingredients } = recipe;

          return (
            <Box key={id} borderWidth={1} borderRadius="lg" p={4} shadow="md">
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold">
                  {recipe.title}
                </Text>
                {match_count === total_ingredients ? (
                  <Box p={2} mb={4} borderRadius="8px" bg="green.500" size="sm">
                    Total Match
                  </Box>
                ) : (
                  <Box p={2} mb={4} borderRadius="8px" bg="lightgray" size="sm">
                    Ingredients Match: {match_count} / {total_ingredients}
                  </Box>
                )}
              </VStack>
              <RecipeTile recipe={recipe.recipe} />
            </Box>
          );
        })}
      </SimpleGrid>
    </div>
  ) : null;
};

export default Recipes;
