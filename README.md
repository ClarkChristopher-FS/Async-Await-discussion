# Async/Await Pokemon API Assignment

This project demonstrates using async/await with the Pokemon API to fetch and compile Pokemon data.

## What it does

- `assignmentTask()`: Generates a random Pokemon ID (1-151) and fetches its data
- `getPokemonData(id)`: Takes a Pokemon ID, makes two API calls, and returns compiled Pokemon data

## Setup

1. Run the code:

```bash
node index.js
```

## API Endpoints Used

- Pokemon data: `https://pokeapi.co/api/v2/pokemon/{id}`
- Pokemon species: `https://pokeapi.co/api/v2/pokemon-species/{id}`

## Data Returned

The function returns an object with:

- name
- height
- weight
- types
- flavor text
- habitat
- isLegendary
