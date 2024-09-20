import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const extractImageUrl = (apiUrl) => {
  const regex = /url=(.*)/;
  const match = apiUrl.match(regex);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
};

export const RecipeTile = (props) => {
  const { recipe } = props;
  const { title, image } = recipe;
  const imageUrl = extractImageUrl(image);

  return (
    <Box
      as="button"
      position="relative"
      height="300px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      backgroundImage={`url(${imageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
      _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
    >
      <Heading
        as="h2"
        size="lg"
        color="white"
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.7)"
        padding="10px"
        textAlign="center"
      >
        {title}
      </Heading>
    </Box>
  );
};
