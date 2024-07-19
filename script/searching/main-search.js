let searchBarUserInput = document.getElementById('search_bar');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', function() {
    displayAllRecipes();
});
searchBarUserInput.addEventListener('input', function() {
    let errorMessage = document.getElementById('error-message');
    if (this.value.length >= 3) {
        searchRecipes();
        if (errorMessage) {
            errorMessage.remove();
        }
    } else {
        displayAllRecipes();
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});

searchButton.addEventListener('click', function() {
    if (searchBarUserInput.value.length >= 3) {
        searchRecipes();
    } else {
        displayAllRecipes();
    }
});

function searchRecipes() {
    let searchInput = searchBarUserInput.value.toLowerCase();
    let recipes = document.querySelectorAll('.recipe_card');
    let found = false;
    recipes.forEach(recipe => {
        let recipeTitle = recipe.querySelector('.recipe_card_title').textContent.toLowerCase();
        let recipeDescription = recipe.querySelector('.recipe_card_description p').textContent.toLowerCase();
        let titleWords = recipeTitle.split(' ');
        let descriptionWords = recipeDescription.split(' ');
        let allWords = titleWords.concat(descriptionWords);
        for (let word of allWords) {
            if (word.startsWith(searchInput)) {
                recipe.style.display = 'flex';
                found = true;
                break;
            } else {
                recipe.style.display = 'none';
            }
        }
    });

    let errorMessage = document.getElementById('error-message');
    const recipeContainer = document.querySelector('.recipe_container');
    if (!found) {
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.textContent = `Aucune recette ne commence par ' ${searchInput} '. Vous pouvez rechercher ' tarte aux pommes ', ' poisson ', etc.`;
            recipeContainer.appendChild(errorMessage);
        }
    } else if (errorMessage) {
        errorMessage.remove();
    }

    updateRecipeCount();
}


function displayAllRecipes() {
    let recipes = document.querySelectorAll('.recipe_card');
    recipes.forEach(recipe => {
        recipe.style.display = 'flex';
    });
    updateRecipeCount();
}

function updateRecipeCount() {
    let visibleRecipes = Array.from(document.querySelectorAll('.recipe_card')).filter(recipe => recipe.style.display !== 'none');
    qtyRecipeElement.textContent = `${visibleRecipes.length} recettes`;
}
