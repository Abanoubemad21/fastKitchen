const API_KEY1 = "1ba52f8de94245caa2d3ff3fc4d68def";
const BASE_URL1 = "https://api.spoonacular.com/recipes";

// get id from url
function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// fetch the details of the recipe from api
async function fetchRecipeDetails(id) {
  try {
    const response = await fetch(`${BASE_URL1}/${id}/information?apiKey=${API_KEY1}`);
    if (!response.ok) throw new Error("Failed to fetch recipe details");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchSimilarRecipesWithDetails(recipeId, count = 4) {
  try {
    const response = await fetch(
      `${BASE_URL1}/${recipeId}/similar?number=${count}&apiKey=${API_KEY1}`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const similarBasic = await response.json();

    // Fetch full details of each similar recipe
    const detailedRecipes = await Promise.all(
      similarBasic.map(recipe => fetchRecipeDetails(recipe.id))
    );

    return detailedRecipes;
  } catch (error) {
    console.error("Error fetching similar recipe details:", error);
    return [];
  }
}


//show the data
function displayRecipe(recipe) {
  document.getElementById("recipe-title").textContent = recipe.title;
  document.getElementById("recipe-image").src = recipe.image || "imgs/background.jpg";
  document.getElementById("recipe-summary").innerHTML = recipe.summary || "No summary available";

  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.innerHTML = "";
  if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
    recipe.extendedIngredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = ingredient.original;
      ingredientsList.appendChild(li);
    });
  } else {
    ingredientsList.innerHTML = "<li>No ingredients available</li>";
  }

  document.getElementById("recipe-instructions").innerHTML = recipe.instructions || "No instructions available.";
}
function displaySimilarRecipes(recipes) {
  const container = document.getElementById("similar-recipes");
  if (!container) return;

  container.innerHTML = recipes.map(recipe => `
    <div class="col-md-3 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${recipe.title}</h6>
          <a href="detail.html?id=${recipe.id}" class="btn btn-outline-primary mt-auto">View</a>
        </div>
      </div>
    </div>
  `).join("");
}


// loading
document.addEventListener("DOMContentLoaded", async () => {
  const id = getRecipeIdFromURL();
  if (!id) {
    alert("No recipe ID found in URL!");
    return;
  }

  const recipe = await fetchRecipeDetails(id);
  if (recipe) {
  displayRecipe(recipe);
  const similar = await fetchSimilarRecipesWithDetails(id);
  displaySimilarRecipes(similar);
} else {
  document.body.innerHTML = "<p>Failed to load recipe details.</p>";
}
function displaySimilarRecipes(recipes) {
  const container = document.getElementById("similar-recipes");
  if (!container) return;

  container.innerHTML = recipes.map(recipe => `
    <div class="col-md-3 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${recipe.title}</h6>
          <a href="detail.html?id=${recipe.id}" class="btn btn-outline-primary mt-auto">View</a>
        </div>
      </div>
    </div>
  `).join("");
}

});
