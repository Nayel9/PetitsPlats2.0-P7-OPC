let searchBarUserInput = document.getElementById('search_bar');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
let filteredRecipesByInput = []; // Variable globale pour stocker les recettes filtrées par l'input


clearButton.addEventListener('click', function() {
    displayAllRecipes();
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
    filteredRecipesByInput = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let recipeTitleWords = recipe.name.toLowerCase().split(' ');
        let recipeDescriptionWords = recipe.description.toLowerCase().split(' ');
        let titleMatch = false;
        let descriptionMatch = false;

        // Vérifier chaque mot de l'input dans le titre de la recette
        for (let inputWord of searchInputWords) {
            for (let titleWord of recipeTitleWords) {
                if (titleWord.startsWith(inputWord)) {
                    titleMatch = true;
                    break; // Sortir dès qu'une correspondance est trouvée
                }
            }
            if (titleMatch) break; // Sortir si une correspondance est trouvée dans le titre
        }

        // Vérifier chaque mot de l'input dans la description de la recette
        if (!titleMatch) { // Continuer seulement si aucune correspondance n'a été trouvée dans le titre
            for (let inputWord of searchInputWords) {
                for (let descriptionWord of recipeDescriptionWords) {
                    if (descriptionWord.startsWith(inputWord)) {
                        descriptionMatch = true;
                        break; // Sortir dès qu'une correspondance est trouvée
                    }
                }
                if (descriptionMatch) break; // Sortir si une correspondance est trouvée dans la description
            }
        }

        if (titleMatch || descriptionMatch) {
            filteredRecipesByInput.push(recipe);
        }
    }

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
function displayAllRecipes() {
    let recipes = document.getElementsByClassName('recipe_card');
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].style.display = 'flex';
    }
    updateRecipeCount();
}

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
