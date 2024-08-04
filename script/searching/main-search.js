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
function searchRecipes() {
    let searchInputWords = escapeHTML(searchBarUserInput.value.toLowerCase()).split(' ');
    filteredRecipesByInput = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let recipeTitleWords = recipe.name.toLowerCase().split(' ');
        let recipeDescriptionWords = recipe.description.toLowerCase().split(' ');
        let titleMatch = false;
        for (let j = 0; j < searchInputWords.length; j++) {
            let inputWord = searchInputWords[j];
            for (let k = 0; k < recipeTitleWords.length; k++) {
                if (recipeTitleWords[k].startsWith(inputWord)) {
                    titleMatch = true;
                    break;
                }
            }
            if (titleMatch) break;
        }
        let descriptionMatch = false;
        if (!titleMatch) {
            for (let j = 0; j < searchInputWords.length; j++) {
                let inputWord = searchInputWords[j];
                for (let k = 0; k < recipeDescriptionWords.length; k++) {
                    if (recipeDescriptionWords[k].startsWith(inputWord)) {
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

    // Mettre à jour les éléments du menu déroulant en fonction des recettes filtrées
    const newIngredients = new Set();
    const newAppliances = new Set();
    const newUstensils = new Set();

    for (let i = 0; i < filteredRecipesByInput.length; i++) {
        let recipe = filteredRecipesByInput[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            newIngredients.add(recipe.ingredients[j].ingredient);
        }
        newAppliances.add(recipe.appliance);
        for (let j = 0; j < recipe.ustensils.length; j++) {
            newUstensils.add(recipe.ustensils[j]);
        }
    }

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
}

/**
 * Affiche les recettes filtrées.
 * @param {Array} filteredRecipes - Le tableau des recettes filtrées.
 */
function displayFilteredRecipes(filteredRecipes) {
    let recipeCards = document.querySelectorAll('.recipe_card');
    for (let i = 0; i < recipeCards.length; i++) {
        recipeCards[i].style.display = 'none';
    }
    for (let i = 0; i < filteredRecipes.length; i++) {
        let recipeElement = document.getElementById(`${filteredRecipes[i].id}`);
        if (recipeElement) recipeElement.style.display = 'flex';
    }
    updateRecipeCount();
}

/**
 * Met �� jour le compteur de recettes affichées.
 */
function updateRecipeCount() {
    let recipeCards = document.querySelectorAll('.recipe_card');
    let count = 0;
    for (let i = 0; i < recipeCards.length; i++) {
        if (recipeCards[i].style.display !== 'none') {
            count++;
        }
    }
    qtyRecipeElement.textContent = `${count} recettes`;
}

/**
 * Affiche toutes les recettes.
 */
function displayAllRecipes() {
    let recipeCards = document.querySelectorAll('.recipe_card');
    for (let i = 0; i < recipeCards.length; i++) {
        recipeCards[i].style.display = 'flex';
    }
    updateRecipeCount();
}