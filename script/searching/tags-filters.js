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
 * Filtre les recettes en fonction des tags choisis par l'utilisateur.
 */
function filterRecipesByTags() {
    filteredRecipes = [];
    resetDisplayProperty();

    let dataSource;
    if (filteredRecipesByInput.length > 0) {
        dataSource = filteredRecipesByInput;
    } else {
        dataSource = recipes;
    }

    // Parcourir toutes les recettes de la source de données sélectionnée
    for (let i = 0; i < dataSource.length; i++) {
        let recipe = dataSource[i];
        let hasAllTags = true;

        // Parcourir tous les tags choisis par l'utilisateur
        for (let j = 0; j < userChosenTags.length; j++) {
            let userChosenTag = userChosenTags[j];
            let tagFound = false;

            // Vérifier si le tag choisi par l'utilisateur est dans les ingrédients, l'appareil ou les ustensiles de la recette
            for (let k = 0; k < recipe.ingredients.length; k++) {
                let recipeIngredient = recipe.ingredients[k];
                if (recipeIngredient.ingredient === userChosenTag) {
                    tagFound = true;
                    break;
                }
            }

            if (recipe.appliance === userChosenTag) {
                tagFound = true;
            }

            for (let k = 0; k < recipe.ustensils.length; k++) {
                let recipeUstensil = recipe.ustensils[k];
                if (recipeUstensil === userChosenTag) {
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
            recipe.isDisplayed = false; // Marquer la recette comme cachée
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
}

/**
 * Réinitialise la propriété d'affichage de toutes les recettes.
 */
function resetDisplayProperty() {
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].isDisplayed = true;
    }
}