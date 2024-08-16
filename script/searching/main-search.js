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
    dropdownIngredients.updateItems(Array.from(uniqueIngredients));
    dropdownAppliances.updateItems(Array.from(uniqueAppliances));
    dropdownUstensils.updateItems(Array.from(uniqueUstensils));
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

const searchRecipes = () => {
    const searchInputPhrases = escapeHTML(searchBarUserInput.value.toLowerCase());
    const filteredRecipesByInput = recipes.filter(recipe => {
        const recipeTitle = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');

        return recipeTitle.includes(searchInputPhrases) ||
               recipeDescription.includes(searchInputPhrases) ||
               recipeIngredients.includes(searchInputPhrases);
    });

    userChosenTags.length > 0 ? filterRecipesByTags() : displayFilteredRecipes(filteredRecipesByInput);

    const errorMessage = document.getElementById('error-message');
    const recipeContainer = document.querySelector('.recipe_container');
    if (filteredRecipesByInput.length === 0) {
        if (!errorMessage) {
            const newErrorMessage = document.createElement('p');
            newErrorMessage.id = 'error-message';
            newErrorMessage.textContent = `Aucune recette ne contient ' ${escapeHTML(searchBarUserInput.value)} '. Vous pouvez rechercher ' tarte aux pommes ', ' poisson ', etc.`;
            recipeContainer.appendChild(newErrorMessage);
        }
    } else if (errorMessage) {
        errorMessage.remove();
        displayFilteredRecipes(filteredRecipesByInput);
    }

    const newIngredients = new Set();
    const newAppliances = new Set();
    const newUstensils = new Set();

    filteredRecipesByInput.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => newIngredients.add(ingredient.ingredient));
        newAppliances.add(recipe.appliance);
        recipe.ustensils.forEach(ustensile => newUstensils.add(ustensile));
    });

    if (filteredRecipesByInput.length === 0) {
        dropdownIngredients.updateItems(Array.from(uniqueIngredients));
        dropdownAppliances.updateItems(Array.from(uniqueAppliances));
        dropdownUstensils.updateItems(Array.from(uniqueUstensils));
    } else {
        dropdownIngredients.updateItems(Array.from(newIngredients));
        dropdownAppliances.updateItems(Array.from(newAppliances));
        dropdownUstensils.updateItems(Array.from(newUstensils));
    }

    updateRecipeCount();
};
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