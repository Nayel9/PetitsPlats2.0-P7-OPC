let searchBarUserInput = document.getElementById('search_bar');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
let filteredRecipesByInput = []; // Variable globale pour stocker les recettes filtrées par l'input


clearButton.addEventListener('click', function() {
    if (userChosenTags.length !== 0) {
        displayFilteredRecipes(filteredRecipesByInput);
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

function searchRecipes() {
    let searchInputWords = searchBarUserInput.value.toLowerCase().split(' ');
    filteredRecipesByInput = recipes.filter(recipe => {
        let recipeTitleWords = recipe.name.toLowerCase().split(' ');
        let recipeDescriptionWords = recipe.description.toLowerCase().split(' ');
        let titleMatch = searchInputWords.some(inputWord => recipeTitleWords.some(titleWord => titleWord.startsWith(inputWord)));
        let descriptionMatch = !titleMatch && searchInputWords.some(inputWord => recipeDescriptionWords.some(descriptionWord => descriptionWord.startsWith(inputWord)));
        return titleMatch || descriptionMatch;
    });

    if (userChosenTags.length > 0) {
        filterRecipesByTags(); // Utiliser `filteredRecipesByInput` comme base pour le filtrage par tags
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

function displayFilteredRecipes(filteredRecipes) {
    let allRecipes = document.querySelectorAll('.recipe_card');
    allRecipes.forEach(recipe => {
        recipe.style.display = 'none';
    });

    filteredRecipes.forEach(recipe => {
        let recipeElement = document.getElementById(`${recipe.id}`);
        if (recipeElement) {
            recipeElement.style.display = 'flex';
        }
    });
    updateRecipeCount();
}

function updateRecipeCount() {
    let recipes = Array.from(document.querySelectorAll('.recipe_card'));
    let count = recipes.filter(recipe => recipe.style.display !== 'none').length;
    qtyRecipeElement.textContent = `${count} recettes`;
}

function displayAllRecipes() {
    let recipes = document.querySelectorAll('.recipe_card');
    recipes.forEach(recipe => {
        recipe.style.display = 'flex';
    });
    updateRecipeCount();
}