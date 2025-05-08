/// <reference lib="es2015" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_KEY = "000cde4cbec3435b88e4913b6245d93e";
var BASE_URL = "https://api.spoonacular.com/recipes";
window.allRecipes = [];
function fetchRandomRecipes() {
    return __awaiter(this, arguments, void 0, function (count) {
        var response, data, error_1;
        if (count === void 0) { count = 12; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(BASE_URL, "/random?number=").concat(count, "&apiKey=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("HTTP error! status: ".concat(response.status));
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.recipes];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching recipes:", error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function searchRecipes(query_1) {
    return __awaiter(this, arguments, void 0, function (query, count) {
        var response, data, error_2;
        if (count === void 0) { count = 12; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(BASE_URL, "/complexSearch?query=").concat(query, "&number=").concat(count, "&apiKey=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("HTTP error! status: ".concat(response.status));
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, Promise.all(data.results.map(function (recipe) { return getRecipeDetails(recipe.id); }))];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error searching recipes:", error_2);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getRecipeDetails(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(BASE_URL, "/").concat(id, "/information?apiKey=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("HTTP error! status: ".concat(response.status));
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error fetching recipe details:", error_3);
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function searchRecipesByIngredients(ingredients_1) {
    return __awaiter(this, arguments, void 0, function (ingredients, count) {
        var ingredientsString, response, data, error_4;
        if (count === void 0) { count = 12; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    ingredientsString = ingredients.join(',+');
                    return [4 /*yield*/, fetch("".concat(BASE_URL, "/findByIngredients?ingredients=").concat(ingredientsString, "&number=").concat(count, "&apiKey=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("HTTP error! status: ".concat(response.status));
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, Promise.all(data.map(function (recipe) { return getRecipeDetails(recipe.id); }))];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_4 = _a.sent();
                    console.error("Error searching recipes by ingredients:", error_4);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function handleIngredientSearch(ingredients) {
    searchRecipesByIngredients(ingredients, 12).then(displayRecipes);
}
function displayRecipes(recipes) {
    window.allRecipes = recipes;
    var favourites = getFavourites();
    var recipeList = "";
    var _loop_1 = function (recipe) {
        var shortSummary = recipe.summary ? recipe.summary.split(".")[0] : "No description available";
        var isFavourite = favourites.some(function (r) { return r.id === recipe.id; });
        var heartIcon = isFavourite ? "fa-heart-circle-minus" : "fa-heart-circle-plus";
        recipeList += "\n      <div class=\"col-md-3 col-sm-6 rounded-5\">\n        <div class=\"card mb-4 shadow-sm position-relative\">\n          <img src='".concat(recipe.image, "' class=\"card-img-top\" alt=\"").concat(recipe.title, "\">\n          <div class=\"icon position-absolute top-0 end-0 p-2\">\n            <i class=\"fa-solid ").concat(heartIcon, " heart-icon\" data-id=\"").concat(recipe.id, "\"></i>\n          </div>\n          <div class=\"card-body\">\n            <h6 class=\"card-title\">").concat(recipe.title, "</h6>\n            <p class=\"card-text\">").concat(shortSummary, "</p>\n            <a href=\"detail.html?id=").concat(recipe.id, "\" class=\"btn p-2\">View Details</a>\n          </div>\n        </div>\n      </div>");
    };
    for (var _i = 0, recipes_1 = recipes; _i < recipes_1.length; _i++) {
        var recipe = recipes_1[_i];
        _loop_1(recipe);
    }
    document.getElementById("recipe-cards").innerHTML = recipeList;
    setupHeartIcons();
}
function loadAndDisplayRecipes() {
    fetchRandomRecipes(12).then(function (recipes) {
        displayRecipes(recipes);
    }).catch(function (error) {
        console.error("Failed to load recipes:", error);
        document.getElementById("recipe-cards").innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
    });
}
function handleSearch(query) {
    searchRecipes(query, 12).then(displayRecipes).catch(function (error) {
        console.error("Failed to search recipes:", error);
        document.getElementById("recipe-cards").innerHTML = "<p>Failed to search recipes. Please try again later.</p>";
    });
}
function setupSearchForm() {
    var form = document.getElementById("search-form");
    var input = document.getElementById("search-input");
    if (form && input) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var query = input.value.trim();
            if (query)
                handleSearch(query);
        });
    }
}
function setupIngredientSearchForm() {
    var form = document.getElementById("ingredient-search-form");
    var input = document.getElementById("ingredient-input");
    if (form && input) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var ingredients = input.value.trim().split(',').map(function (i) { return i.trim(); }).filter(function (i) { return i.length > 0; });
            if (ingredients.length > 0)
                handleIngredientSearch(ingredients);
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    loadAndDisplayRecipes();
    setupSearchForm();
    setupIngredientSearchForm();
});
window.handleSearch = handleSearch;
function getFavourites() {
    var fav = localStorage.getItem("favourites");
    return fav ? JSON.parse(fav) : [];
}
function saveFavourites(favourites) {
    localStorage.setItem("favourites", JSON.stringify(favourites));
}
function setupHeartIcons() {
    document.querySelectorAll(".heart-icon").forEach(function (icon) {
        icon.addEventListener("click", function () {
            var _a;
            var id = parseInt(icon.dataset.id);
            var favourites = getFavourites();
            var index = favourites.findIndex(function (r) { return r.id === id; });
            if (index === -1) {
                var recipe = window.allRecipes.find(function (r) { return r.id === id; });
                if (recipe) {
                    favourites.push(recipe);
                    icon.classList.remove("fa-heart-circle-plus");
                    icon.classList.add("fa-heart-circle-minus");
                }
            }
            else {
                favourites.splice(index, 1);
                icon.classList.remove("fa-heart-circle-minus");
                icon.classList.add("fa-heart-circle-plus");
                if (window.location.pathname.includes("favorites.html")) {
                    (_a = icon.closest(".col-md-3")) === null || _a === void 0 ? void 0 : _a.remove();
                }
            }
            saveFavourites(favourites);
        });
    });
}
