/**
 * Tableau des tags choisis par l'utilisateur.
 * @type {Array<string>}
 */
let userChosenTags = [];

/**
 * Tableau des recettes filtrées.
 * @type {Array<Object>}
 */
let filteredRecipes = [];

/**
 * Met à jour les éléments du menu déroulant en fonction des recettes filtrées.
 * @param {Array} filteredRecipes - Le tableau des recettes filtrées.
 */
/**
 * Met à jour les éléments du menu déroulant en fonction des recettes filtrées.
 * @param {Array} filteredRecipes - Le tableau des recettes filtrées.
 */
function updateDropdowns(filteredRecipes) {
    const newIngredients = new Set();
    const newAppliances = new Set();
    const newUstensils = new Set();

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!userChosenTags.includes(ingredient.ingredient)) {
                newIngredients.add(ingredient.ingredient);
            }
        });
        if (!userChosenTags.includes(recipe.appliance)) {
            newAppliances.add(recipe.appliance);
        }
        recipe.ustensils.forEach(ustensile => {
            if (!userChosenTags.includes(ustensile)) {
                newUstensils.add(ustensile);
            }
        });
    });

    dropdownIngredients.updateItems(Array.from(newIngredients));
    dropdownAppliances.updateItems(Array.from(newAppliances));
    dropdownUstensils.updateItems(Array.from(newUstensils));
}

/**
 * Filtre les recettes en fonction des tags choisis par l'utilisateur.
 */
function filterRecipesByTags() {
    let sourceRecipes = (!filteredRecipesByInput || filteredRecipesByInput.length === 0) ? recipes : filteredRecipesByInput;

    resetDisplayProperty();
    filteredRecipes = sourceRecipes.filter(recipe => {
        return userChosenTags.every(tag =>
            recipe.ingredients.some(ingredient => ingredient.ingredient === tag) ||
            recipe.appliance === tag ||
            recipe.ustensils.includes(tag)
        );
    });

    filteredRecipes.forEach(recipe => recipe.isDisplayed = true);
    displayFilteredRecipes(filteredRecipes);

    let errorMessage = document.getElementById('error-message');
    const recipeContainer = document.querySelector('.recipe_container');
    if (filteredRecipes.length === 0) {
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.textContent = 'Aucune recette ne correspond à votre sélection de tags. Veuillez essayer avec d\'autres tags.';
            recipeContainer.appendChild(errorMessage);
        }
    } else if (errorMessage) {
        errorMessage.remove();
        displayFilteredRecipes(filteredRecipes);
    }

    updateRecipeCount();
    updateDropdowns(filteredRecipes);
}

/**
 * Réinitialise la propriété d'affichage de toutes les recettes.
 */
function resetDisplayProperty() {
    recipes.forEach(recipe => recipe.isDisplayed = true);
}