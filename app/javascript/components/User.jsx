import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Box,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    const url = `/api/v1/users/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when fetching the response.");
      })
      .then((response) => setUser(response));
  }, []);
  console.log("user", user.user?.name);
  return (
    <Box
      p={8}
      maxWidth="500px"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      mx="auto"
      mt={10}
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl">Search recipes for {user.user?.name}</Text>

        <Text>Ingredients:</Text>
        <UnorderedList>
          {user.ingredients &&
            user.ingredients.map((ingredient) => (
              <ListItem key={ingredient}>{ingredient.name}</ListItem>
            ))}
        </UnorderedList>

        <FormControl id="ingredients">
          <FormLabel>Ingredients</FormLabel>
          <Input
            placeholder="List your ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </FormControl>

        <Button as={Link} to="/">
          Back to main page
        </Button>
      </VStack>
    </Box>
  );
};

export default User;
