// favourites.ts
function getFavourites() {
    var data = localStorage.getItem("favourites");
    return data ? JSON.parse(data) : [];
}
function removeFavourite(id) {
    var favs = getFavourites();
    favs = favs.filter(function (recipe) { return recipe.id !== id; });
    localStorage.setItem("favourites", JSON.stringify(favs));
    displayFavourites(); // Refresh the list
}
function displayFavourites() {
    var favourites = getFavourites();
    var container = document.getElementById("favorites-container");
    if (!container)
        return;
    if (favourites.length === 0) {
        container.innerHTML = "<p>No favourites yet.</p>";
        return;
    }
    container.innerHTML = favourites.map(function (recipe) { return "\n      <div class=\"col-md-3 col-sm-6 rounded-5\" id=\"card-".concat(recipe.id, "\">\n        <div class=\"card mb-4 shadow-sm position-relative\">\n          <img src=\"").concat(recipe.image, "\" class=\"card-img-top\" alt=\"").concat(recipe.title, "\">\n          <div class=\"icon position-absolute top-5 end-0 p-2\" onclick=\"removeFavourite(").concat(recipe.id, ")\">\n            <i class=\"fa-solid fa-heart-circle-minus\"></i>\n          </div>\n          <div class=\"card-body\">\n            <h6 class=\"card-title\">").concat(recipe.title, "</h6>\n            <p class=\"card-text\">").concat(recipe.summary.split('.')[0], "</p>\n            <a href=\"detail.html?id=").concat(recipe.id, "\" class=\"btn p-2\">View Details</a>\n          </div>\n        </div>\n      </div>\n    "); }).join('');
}
document.addEventListener("DOMContentLoaded", displayFavourites);
// Expose remove function
window.removeFavourite = removeFavourite;
