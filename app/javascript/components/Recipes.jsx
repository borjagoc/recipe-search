import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeTile } from "./RecipeTile";
import { SimpleGrid, Text } from "@chakra-ui/react";

const Recipes = (recipes) => {
  const relevantRecipes = recipes.recipes;
  return (
    <div>
      <Text as="h1" px={10} paddingTop={6}>
        Recipes
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={5} p={10}>
        {relevantRecipes.map((recipe) => (
          <RecipeTile key={recipe.id} recipe={recipe.recipe} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Recipes;
