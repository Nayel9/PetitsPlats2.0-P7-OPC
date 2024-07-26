/**
 * Échappe les caractères spéciaux HTML dans une chaîne de caractères.
 * @param {string} str - La chaîne de caractères à échapper.
 * @returns {string} - La chaîne de caractères échappée.
 */
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

/**
 * Élément de la barre de recherche utilisateur.
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

/**
 * Ajoute un événement de clic pour effacer la recherche.
 */
clearButton.addEventListener('click', () => {
    userChosenTags.length !== 0 ? displayFilteredRecipes(filteredRecipesByInput) : displayAllRecipes();
});

/**
 * Ajoute un événement d'entrée pour rechercher des recettes.
 */
searchBarUserInput.addEventListener('input', function() {
    let errorMessage = document.getElementById('error-message');
    this.value.length >= 3 ? searchRecipes() : displayAllRecipes(filteredRecipesByInput);
    if (errorMessage) errorMessage.remove();
});

/**
 * Ajoute un événement de clic pour rechercher des recettes.
 */
searchButton.addEventListener('click', () => {
    searchBarUserInput.value.length >= 3 ? searchRecipes() : displayAllRecipes();
});

/**
 * Recherche des recettes en fonction de l'entrée de l'utilisateur.
 */
function searchRecipes() {
    let searchInputWords = escapeHTML(searchBarUserInput.value.toLowerCase()).split(' ');
    filteredRecipesByInput = recipes.filter(recipe => {
        let recipeTitleWords = recipe.name.toLowerCase().split(' ');
        let recipeDescriptionWords = recipe.description.toLowerCase().split(' ');
        let titleMatch = searchInputWords.some(inputWord => recipeTitleWords.some(titleWord => titleWord.startsWith(inputWord)));
        let descriptionMatch = !titleMatch && searchInputWords.some(inputWord => recipeDescriptionWords.some(descriptionWord => descriptionWord.startsWith(inputWord)));
        return titleMatch || descriptionMatch;
    });

    userChosenTags.length > 0 ? filterRecipesByTags() : displayFilteredRecipes(filteredRecipesByInput);

    let errorMessage = document.getElementById('error-message');
    const recipeContainer = document.querySelector('.recipe_container');
    if (filteredRecipesByInput.length === 0) {
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.textContent = `Aucune recette ne contient ' ${escapeHTML(searchBarUserInput.value)} '. Vous pouvez rechercher ' tarte aux pommes ', ' poisson ', etc.`;
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
 * @param {Array} filteredRecipes - Le tableau des recettes filtrées.
 */
function displayFilteredRecipes(filteredRecipes) {
    document.querySelectorAll('.recipe_card').forEach(recipe => recipe.style.display = 'none');
    filteredRecipes.forEach(recipe => {
        let recipeElement = document.getElementById(`${recipe.id}`);
        if (recipeElement) recipeElement.style.display = 'flex';
    });
    updateRecipeCount();
}

/**
 * Met à jour le compteur de recettes affichées.
 */
function updateRecipeCount() {
    let count = Array.from(document.querySelectorAll('.recipe_card')).filter(recipe => recipe.style.display !== 'none').length;
    qtyRecipeElement.textContent = `${count} recettes`;
}

/**
 * Affiche toutes les recettes.
 */
function displayAllRecipes() {
    document.querySelectorAll('.recipe_card').forEach(recipe => recipe.style.display = 'flex');
    updateRecipeCount();
}