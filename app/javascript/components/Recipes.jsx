import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("There was an error when fetching the response.");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
};

export default Recipes;
