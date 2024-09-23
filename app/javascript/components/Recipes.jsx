import React, { useState } from "react";
import {
  SimpleGrid,
  Text,
  Box,
  Collapse,
  Button,
  VStack,
} from "@chakra-ui/react";
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
          const [isOpen, setIsOpen] = useState(false);

          const toggleCollapse = () => {
            setIsOpen(!isOpen);
          };

          return (
            <Box key={id} borderWidth={1} borderRadius="lg" p={4} shadow="md">
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold">
                  {recipe.title}
                </Text>
                {match_count === total_ingredients ? (
                  <Text color="green.500">Total Match</Text>
                ) : (
                  <Button onClick={toggleCollapse} size="sm">
                    Ingredients Match: {match_count} / {total_ingredients}
                  </Button>
                )}
                <Collapse in={isOpen}>
                  <Box>
                    <Text>Matched Ingredients:</Text>
                    {/* Assuming matchedIngredients is available */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                      {recipe?.matchedIngredients?.map((ingredient) => (
                        <Text key={ingredient}>{ingredient}</Text>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Collapse>
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
