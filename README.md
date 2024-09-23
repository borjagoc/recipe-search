# README

# Rails App: Recipe Search

## Overview

Recipe Search is a web application that allows users to view a list of relevant recipes for a given list of ingredients.

## Features

- **User Management**:

  - Fetch and display a list of users.
  - Add new users to the system.
  - Select a user to search for recipes.

- **Recipe Search**:
  - Search for recipes based on the ingredients of the selected user. When a new ingredient is added the relevant list of recipes is updated.
  - The recipes are sorted in order of relevance (most matched ingredients first)

## Installation

1. Clone the repository.
2. Install dependencies:
   ```sh
   bundle install
   yarn install
   ```

## Start the server

`bin/dev`
