/// <reference lib="es2015" />

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions?: string;
  extendedIngredients?: {
    original: string;
  }[];
}

interface SearchResult {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

const API_KEY = "000cde4cbec3435b88e4913b6245d93e";
const BASE_URL = "https://api.spoonacular.com/recipes";
(window as any).allRecipes = [];

async function fetchRandomRecipes(count: number = 12): Promise<Recipe[]> {
  try {
    const response = await fetch(`${BASE_URL}/random?number=${count}&apiKey=${API_KEY}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

async function searchRecipes(query: string, count: number = 12): Promise<Recipe[]> {
  try {
    const response = await fetch(`${BASE_URL}/complexSearch?query=${query}&number=${count}&apiKey=${API_KEY}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: SearchResult = await response.json();
    return await Promise.all(data.results.map((recipe) => getRecipeDetails(recipe.id)));
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
}

async function getRecipeDetails(id: number): Promise<Recipe> {
  try {
    const response = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return {} as Recipe;
  }
}

async function searchRecipesByIngredients(ingredients: string[], count: number = 12): Promise<Recipe[]> {
  try {
    const ingredientsString = ingredients.join(',+');
    const response = await fetch(`${BASE_URL}/findByIngredients?ingredients=${ingredientsString}&number=${count}&apiKey=${API_KEY}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return await Promise.all(data.map((recipe: { id: number }) => getRecipeDetails(recipe.id)));
  } catch (error) {
    console.error("Error searching recipes by ingredients:", error);
    return [];
  }
}

function handleIngredientSearch(ingredients: string[]) {
  searchRecipesByIngredients(ingredients, 12).then(displayRecipes);
}

function displayRecipes(recipes: Recipe[]): void {
  (window as any).allRecipes = recipes;
  const favourites = getFavourites();
  let recipeList = "";

  for (let recipe of recipes) {
    const shortSummary = recipe.summary ? recipe.summary.split(".")[0] : "No description available";
    const isFavourite = favourites.some((r) => r.id === recipe.id);
    const heartIcon = isFavourite ? "fa-heart-circle-minus" : "fa-heart-circle-plus";

    recipeList += `
      <div class="col-md-3 col-sm-6 rounded-5">
        <div class="card mb-4 shadow-sm position-relative">
          <img src='${recipe.image}' class="card-img-top" alt="${recipe.title}">
          <div class="icon position-absolute top-0 end-0 p-2">
            <i class="fa-solid ${heartIcon} heart-icon" data-id="${recipe.id}"></i>
          </div>
          <div class="card-body">
            <h6 class="card-title">${recipe.title}</h6>
            <p class="card-text">${shortSummary}</p>
            <a href="detail.html?id=${recipe.id}" class="btn p-2">View Details</a>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("recipe-cards")!.innerHTML = recipeList;
  setupHeartIcons();
}


function loadAndDisplayRecipes() {
  fetchRandomRecipes(12).then((recipes) => {
    displayRecipes(recipes);
  }).catch((error) => {
    console.error("Failed to load recipes:", error);
    document.getElementById("recipe-cards")!.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
  });
}

function handleSearch(query: string) {
  searchRecipes(query, 12).then(displayRecipes).catch((error) => {
    console.error("Failed to search recipes:", error);
    document.getElementById("recipe-cards")!.innerHTML = "<p>Failed to search recipes. Please try again later.</p>";
  });
}

function setupSearchForm() {
  const form = document.getElementById("search-form") as HTMLFormElement;
  const input = document.getElementById("search-input") as HTMLInputElement;
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (query) handleSearch(query);
    });
  }
}

function setupIngredientSearchForm() {
  const form = document.getElementById("ingredient-search-form") as HTMLFormElement;
  const input = document.getElementById("ingredient-input") as HTMLInputElement;
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ingredients = input.value.trim().split(',').map(i => i.trim()).filter(i => i.length > 0);
      if (ingredients.length > 0) handleIngredientSearch(ingredients);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAndDisplayRecipes();
  setupSearchForm();
  setupIngredientSearchForm();
});

(window as any).handleSearch = handleSearch;

function getFavourites(): Recipe[] {
  const fav = localStorage.getItem("favourites");
  return fav ? JSON.parse(fav) : [];
}

function saveFavourites(favourites: Recipe[]) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

function setupHeartIcons() {
  document.querySelectorAll(".heart-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const id = parseInt((icon as HTMLElement).dataset.id!);
      let favourites = getFavourites();
      const index = favourites.findIndex((r) => r.id === id);

      if (index === -1) {
        const recipe = (window as any).allRecipes.find((r: Recipe) => r.id === id);
        if (recipe) {
          favourites.push(recipe);
          (icon as HTMLElement).classList.remove("fa-heart-circle-plus");
          (icon as HTMLElement).classList.add("fa-heart-circle-minus");
        }
      } else {
        favourites.splice(index, 1);
        (icon as HTMLElement).classList.remove("fa-heart-circle-minus");
        (icon as HTMLElement).classList.add("fa-heart-circle-plus");

        if (window.location.pathname.includes("favorites.html")) {
          icon.closest(".col-md-3")?.remove();
        }
      }

      saveFavourites(favourites);
    });
  });
}
