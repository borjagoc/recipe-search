import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeTile } from "./RecipeTile";
import { SimpleGrid, Text } from "@chakra-ui/react";

const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when fetching the response.");
      })
      .then((response) => setRecipes(response))
      .catch(() => navigate("/"));
  }, []);

  return (
    <div>
      <Text as="h1" px={10} paddingTop={6}>
        Recipes
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={5} p={10}>
        {recipes.map((recipe) => (
          <RecipeTile key={recipe.id} recipe={recipe} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Recipes;
