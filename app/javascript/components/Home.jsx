import {
  HStack,
  Input,
  Button,
  FormErrorMessage,
  FormControl,
  VStack,
  Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when fetching the response.");
      })
      .then((response) => setUsers(response));
  }, []);

  const isButtonDisabled = selectedUser === "";

  const handleOnClick = () => {
    if (userName === "") {
      setUserError(true);
      return;
    }
    const url = "/api/v1/users/create";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error when creating the user.");
      })
      .then((response) => setUsers([...users, response]))
      .catch((error) => console.error(error));
  };

  const handleButtonClick = (e) => {
    if (isButtonDisabled) {
      e.preventDefault();
    }
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Dinner Time</h1>
          <p className="lead">
            Add a new user or select an existing one to find the relevant
            results.
          </p>
          <hr className="my-4" />
          <FormControl isInvalid={userError}>
            <HStack spacing={6} w="100%">
              <VStack w="100%" align="self-start">
                <Input
                  mt={8}
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div style={{ minHeight: "24px" }}>
                  {userError && (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                  )}
                </div>
              </VStack>
              <Button colorScheme="teal" size="lg" onClick={handleOnClick}>
                Add new user
              </Button>
            </HStack>
          </FormControl>

          <FormControl isInvalid={userError}>
            <HStack spacing={6} w="100%">
              <VStack w="100%" align="self-start">
                <Select
                  placeholder="Select user"
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </VStack>
            </HStack>
          </FormControl>
          <hr className="my-4" />
          <Button
            as={Link}
            to={`user/${selectedUser}`}
            colorScheme="red"
            isDisabled={isButtonDisabled}
            onClick={handleButtonClick}
          >
            Search recipes by user
          </Button>
        </div>
      </div>
    </div>
  );
};
