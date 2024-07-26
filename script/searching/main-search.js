/**
 * Élément de la barre de recherche.
 * @type {HTMLElement}
 */
let searchBarUserInput = document.getElementById('search_bar');

/**
 * Bouton de recherche.
 * @type {HTMLElement}
 */
const searchButton = document.getElementById('search-button');

/**
 * Bouton pour effacer la recherche.
 * @type {HTMLElement}
 */
const clearButton = document.getElementById('clear-button');

/**
 * Tableau global pour stocker les recettes filtrées par l'input.
 * @type {Array}
 */
let filteredRecipesByInput = [];

clearButton.addEventListener('click', function() {
    filteredRecipesByInput = [];
    if (userChosenTags.length > 0) {
        filterRecipesByTags();
    } else {
        displayAllRecipes();
    }
});

searchBarUserInput.addEventListener('input', function() {
    let errorMessage = document.getElementById('error-message');
    if (this.value.length >= 3) {
        searchRecipes();
    } else {
        displayAllRecipes(filteredRecipesByInput);
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

/**
 * Recherche les recettes en fonction de l'input de l'utilisateur.
 */
function searchRecipes() {
    let searchInputWords = searchBarUserInput.value.toLowerCase().split(' ');
    filteredRecipesByInput = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let recipeTitleWords = recipe.name.toLowerCase().split(' ');
        let recipeDescriptionWords = recipe.description.toLowerCase().split(' ');
        let titleMatch = false;
        let descriptionMatch = false;

        for (let inputWord of searchInputWords) {
            for (let titleWord of recipeTitleWords) {
                if (titleWord.startsWith(inputWord)) {
                    titleMatch = true;
                    break;
                }
            }
            if (titleMatch) break;
        }

        if (!titleMatch) {
            for (let inputWord of searchInputWords) {
                for (let descriptionWord of recipeDescriptionWords) {
                    if (descriptionWord.startsWith(inputWord)) {
                        descriptionMatch = true;
                        break;
                    }
                }
                if (descriptionMatch) break;
            }
        }

        if (titleMatch || descriptionMatch) {
            filteredRecipesByInput.push(recipe);
        }
    }

    if (userChosenTags.length > 0) {
        filterRecipesByTags();
    } else {
        displayFilteredRecipes(filteredRecipesByInput);
    }

    let errorMessage = document.getElementById('error-message');
    const recipeContainer = document.querySelector('.recipe_container');
    if (filteredRecipesByInput.length === 0) {
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.textContent = `Aucune recette ne contient ' ${searchBarUserInput.value} '. Vous pouvez rechercher ' tarte aux pommes ', ' poisson ', etc.`;
            recipeContainer.appendChild(errorMessage);
        }
    } else if (errorMessage) {
        errorMessage.remove();
        displayFilteredRecipes(filteredRecipesByInput);
    }

    updateRecipeCount();
}

/**
 * Affiche les recettes filtrées.
 * @param {Array} filteredRecipes - Les recettes filtrées à afficher.
 */
function displayFilteredRecipes(filteredRecipes) {
    let allRecipes = document.querySelectorAll('.recipe_card');
    for (let i = 0; i < allRecipes.length; i++) {
        allRecipes[i].style.display = 'none';
    }

    for (let i = 0; i < filteredRecipes.length; i++) {
        let recipe = filteredRecipes[i];
        let recipeElement = document.getElementById(`${recipe.id}`);
        if (recipeElement) {
            recipeElement.style.display = 'flex';
        }
    }
    updateRecipeCount();
}

/**
 * Affiche toutes les recettes.
 */
function displayAllRecipes() {
    let recipes = document.getElementsByClassName('recipe_card');
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].style.display = 'flex';
    }
    updateRecipeCount();
}

/**
 * Met à jour le nombre de recettes affichées.
 */
function updateRecipeCount() {
    let recipes = Array.from(document.querySelectorAll('.recipe_card'));
    let count = 0;
    for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].style.display !== 'none') {
            count++;
        }
    }
    qtyRecipeElement.textContent = `${count} recettes`;
}