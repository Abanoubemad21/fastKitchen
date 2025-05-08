const API_KEY1 = "000cde4cbec3435b88e4913b6245d93e";
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
  } else {
    document.body.innerHTML = "<p>Failed to load recipe details.</p>";
  }
});
