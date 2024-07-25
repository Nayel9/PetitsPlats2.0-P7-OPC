let userChosenTags = [];
let filteredRecipes = [];
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
}

function resetDisplayProperty() {
    recipes.forEach(recipe => recipe.isDisplayed = true);
}