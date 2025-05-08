// favourites.ts

interface Recipe {
    id: number;
    title: string;
    image: string;
    summary: string;
}

function getFavourites(): Recipe[] {
    const data = localStorage.getItem("favourites");
    return data ? JSON.parse(data) : [];
}

function removeFavourite(id: number): void {
    let favs = getFavourites();
    favs = favs.filter(recipe => recipe.id !== id);
    localStorage.setItem("favourites", JSON.stringify(favs));
    displayFavourites(); // Refresh the list
}

function displayFavourites(): void {
    const favourites = getFavourites();
    const container = document.getElementById("favorites-container");

    if (!container) return;

    if (favourites.length === 0) {
        container.innerHTML = "<p>No favourites yet.</p>";
        return;
    }

    container.innerHTML = favourites.map(recipe => `
      <div class="col-md-3 col-sm-6 rounded-5" id="card-${recipe.id}">
        <div class="card mb-4 shadow-sm position-relative">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          <div class="icon position-absolute top-5 end-0 p-2" onclick="removeFavourite(${recipe.id})">
            <i class="fa-solid fa-heart-circle-minus"></i>
          </div>
          <div class="card-body">
            <h6 class="card-title">${recipe.title}</h6>
            <p class="card-text">${recipe.summary.split('.')[0]}</p>
            <a href="detail.html?id=${recipe.id}" class="btn p-2">View Details</a>
          </div>
        </div>
      </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", displayFavourites);

// Expose remove function
(window as any).removeFavourite = removeFavourite;
