// Async/Await Pokemon API Assignment
// This file contains functions to fetch Pokemon data from the Pokemon API

// Function to get Pokemon data by ID
// Makes two API calls: one for Pokemon data, one for species data
const getPokemonData = async (pokemonId) => {
  try {
    // First API call: Get Pokemon basic data
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    // Check if first request was successful
    if (!pokemonResponse.ok) {
      throw new Error(
        `Failed to fetch Pokemon data: ${pokemonResponse.status}`
      );
    }

    // Convert response to JSON
    const pokemonData = await pokemonResponse.json();

    // Extract basic Pokemon info
    const name = pokemonData.name;
    const height = pokemonData.height;
    const weight = pokemonData.weight;

    // Extract types array (convert to array of type names)
    const types = pokemonData.types.map((type) => type.type.name);

    // Second API call: Get Pokemon species data for flavor text, habitat, and legendary status
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );

    // Check if second request was successful
    if (!speciesResponse.ok) {
      throw new Error(
        `Failed to fetch Pokemon species data: ${speciesResponse.status}`
      );
    }

    // Convert response to JSON
    const speciesData = await speciesResponse.json();

    // Extract flavor text (find English version)
    const flavorTextEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const flavorText = flavorTextEntry
      ? flavorTextEntry.flavor_text
      : "No flavor text available";

    // Extract habitat
    const habitat = speciesData.habitat ? speciesData.habitat.name : "Unknown";

    // Extract legendary status
    const isLegendary = speciesData.is_legendary;

    // Return compiled Pokemon data object
    // Format must include: name, height, weight, types, flavor text, habitat, isLegendary
    return {
      name,
      height,
      weight,
      types,
      "flavor text": flavorText,
      habitat,
      isLegendary,
    };
  } catch (error) {
    // Handle any errors that occur during API calls
    console.error("Error fetching Pokemon data:", error.message);
    throw error;
  }
};

// Main assignment task function
// Generates random Pokemon ID (1-151) and fetches its data
const assignmentTask = async () => {
  try {
    // Generate random Pokemon ID between 1 and 151 (original 151 Pokemon)
    const randomId = Math.floor(Math.random() * 151) + 1;

    console.log(`Fetching data for Pokemon ID: ${randomId}`);

    // Call getPokemonData with random ID
    const pokemonData = await getPokemonData(randomId);

    // Log the Pokemon data to console
    console.log("\n=== Pokemon Data ===");
    console.log(JSON.stringify(pokemonData, null, 2));

    return pokemonData;
  } catch (error) {
    console.error("Error in assignmentTask:", error.message);
    throw error;
  }
};

// Run the assignment task
assignmentTask();
