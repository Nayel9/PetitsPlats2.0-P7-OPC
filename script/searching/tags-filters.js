/**
 * Tableau global pour stocker les tags choisis par l'utilisateur.
 * @type {Array}
 */
let userChosenTags = [];

/**
 * Tableau global pour stocker les recettes filtrées par tags.
 * @type {Array}
 */
let filteredRecipes = [];

/**
 * Met à jour les éléments du menu déroulant en fonction des recettes filtrées.
 * @param {Array} filteredRecipes - Le tableau des recettes filtrées.
 */
function updateDropdowns(filteredRecipes) {
    const newIngredients = new Set();
    const newAppliances = new Set();
    const newUstensils = new Set();

    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient;
            if (!userChosenTags.includes(ingredient)) {
                newIngredients.add(ingredient);
            }
        }
        if (!userChosenTags.includes(recipe.appliance)) {
            newAppliances.add(recipe.appliance);
        }
        for (let j = 0; j < recipe.ustensils.length; j++) {
            const ustensil = recipe.ustensils[j];
            if (!userChosenTags.includes(ustensil)) {
                newUstensils.add(ustensil);
            }
        }
    }

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
    filteredRecipes = [];

    for (let i = 0; i < sourceRecipes.length; i++) {
        const recipe = sourceRecipes[i];
        let hasAllTags = true;

        for (let j = 0; j < userChosenTags.length; j++) {
            const userChosenTag = userChosenTags[j];
            let tagFound = false;

            for (let k = 0; k < recipe.ingredients.length; k++) {
                if (recipe.ingredients[k].ingredient === userChosenTag) {
                    tagFound = true;
                    break;
                }
            }

            if (recipe.appliance === userChosenTag) {
                tagFound = true;
            }

            for (let k = 0; k < recipe.ustensils.length; k++) {
                if (recipe.ustensils[k] === userChosenTag) {
                    tagFound = true;
                    break;
                }
            }

            if (!tagFound) {
                hasAllTags = false;
                break;
            }
        }

        if (hasAllTags) {
            filteredRecipes.push(recipe);
            recipe.isDisplayed = true;
        } else {
            recipe.isDisplayed = false;
        }
    }

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
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].isDisplayed = true;
    }
}