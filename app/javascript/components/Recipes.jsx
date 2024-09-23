import React, { useState } from "react";
import { SimpleGrid, Text, Box, Box, Button, VStack } from "@chakra-ui/react";
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
                  <Text color="green.500">Total Match</Text>
                ) : (
                  <Box bg="grey" size="sm">
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
