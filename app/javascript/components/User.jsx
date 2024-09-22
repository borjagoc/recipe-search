import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
  Text,
  UnorderedList,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientError, setIngredientError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const url = `/api/v1/users/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when fetching the response.");
      })
      .then((response) => {
        console.log("response", response);
        setUser(response.user);
        setIngredients(response.ingredients);
      });
  }, []);

  const handleOnClick = () => {
    if (newIngredient === "") {
      setIngredientError(true);
      setErrorMessage("Name is required.");
      return;
    }
    if (ingredients.map((i) => i.name).includes(newIngredient)) {
      setIngredientError(true);
      setErrorMessage("The ingredient is already on the list.");
      return;
    }
    const url = "/api/v1/ingredients/create";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newIngredient, user_id: user.id }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when creating the ingredient.");
      })
      .then((response) => {
        setIngredients([...ingredients, response]);
        setNewIngredient("");
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteIngredient = (ingredientId) => {
    const url = `/api/v1/ingredients/destroy/${ingredientId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when deleting the ingredient.");
      })
      .then(() => {
        setIngredients(ingredients.filter((i) => i.id !== ingredientId));
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Box p={4} bg="gray.100">
        <Button as={Link} bg="gray.400" to="/">
          Back to main page
        </Button>
      </Box>
      <Box
        p={8}
        maxWidth="1000px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
        mx="auto"
        mt={10}
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="xl">
            Search recipes for <b>{user.name}</b>
          </Text>
          {ingredients?.length > 0 ? (
            <Box p={0}>
              <Text>Ingredients:</Text>
              <UnorderedList>
                {ingredients &&
                  ingredients.map((ingredient) => (
                    <HStack
                      key={ingredient.id}
                      p={1}
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <ListItem>{ingredient.name}</ListItem>
                      <IconButton
                        icon={<CloseIcon />}
                        size="xs"
                        fontSize="5px"
                        colorScheme="red"
                        onClick={() => handleDeleteIngredient(ingredient.id)}
                      />
                    </HStack>
                  ))}
              </UnorderedList>
            </Box>
          ) : (
            <Text>No ingredients found</Text>
          )}

          <FormControl isInvalid={ingredientError}>
            <HStack spacing={6} w="100%">
              <VStack w="100%" align="self-start">
                <Input
                  mt={8}
                  placeholder="Ingredient name"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                />
                <div style={{ minHeight: "24px" }}>
                  {ingredientError && (
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                  )}
                </div>
              </VStack>
              <Button colorScheme="teal" size="lg" onClick={handleOnClick}>
                Add ingredient
              </Button>
            </HStack>
          </FormControl>
          <Button colorScheme="red">Find recipes</Button>
        </VStack>
      </Box>
    </>
  );
};

export default User;
