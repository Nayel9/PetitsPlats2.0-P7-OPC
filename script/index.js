/**
 * Crée une carte de recette.
 * @param {Object} recipe - L'objet recette contenant les informations de la recette.
 * @param {string} recipe.id - L'identifiant de la recette.
 * @param {string} recipe.image - Le chemin de l'image de la recette.
 * @param {number} recipe.time - Le temps de préparation de la recette.
 * @param {string} recipe.name - Le nom de la recette.
 * @param {string} recipe.description - La description de la recette.
 * @param {Array} recipe.ingredients - La liste des ingrédients de la recette.
 * @returns {HTMLElement} - L'élément HTML de la carte de recette.
 */
function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe_card';
    recipeCard.id = recipe.id;

    const cardImg = document.createElement('div');
    cardImg.className = 'recipe_card_img';
    recipeCard.appendChild(cardImg);
    const img = document.createElement('img');
    cardImg.appendChild(img);
    img.src = `img/recettes/${recipe.image}`;

    const recipeTime = document.createElement('div');
    recipeTime.className = 'recipe_card_time';
    recipeCard.appendChild(recipeTime);
    recipeTime.textContent = `${recipe.time} min`;

    const recipeContent = document.createElement('div');
    recipeContent.className = 'recipe_card_content';
    recipeCard.appendChild(recipeContent);

    const containTitle = document.createElement('div');
    containTitle.className = 'recipe_card_title';
    recipeContent.appendChild(containTitle);

    const recipeTitle = document.createElement('h2');
    containTitle.appendChild(recipeTitle);
    recipeTitle.textContent = recipe.name;

    const recipeDescription = document.createElement('div');
    recipeDescription.className = 'recipe_card_description';
    recipeContent.appendChild(recipeDescription);

    const recipeDescriptionTitle = document.createElement('h3');
    recipeDescription.appendChild(recipeDescriptionTitle);
    recipeDescriptionTitle.textContent = 'Recette';

    const recipeDescriptionText = document.createElement('p');
    recipeDescription.appendChild(recipeDescriptionText);
    recipeDescriptionText.textContent = recipe.description;

    const recipeIngredients = document.createElement('div');
    recipeIngredients.className = 'recipe_card_ingredients';
    recipeContent.appendChild(recipeIngredients);

    const recipeIngredientsTitle = document.createElement('h3');
    recipeIngredients.appendChild(recipeIngredientsTitle);
    recipeIngredientsTitle.textContent = 'Ingrédients';

    const recipeIngredientsList = document.createElement('div');
    recipeIngredientsList.className = 'list_group_ingredients';
    recipeIngredients.appendChild(recipeIngredientsList);

    recipe.ingredients.forEach(ingredient => {
        const groupIngredients = document.createElement('div');
        groupIngredients.className = 'group_ingredients';
        recipeIngredientsList.appendChild(groupIngredients);


        const nomIngredients = document.createElement('div');
        nomIngredients.className = 'nom_ingredient';
        groupIngredients.appendChild(nomIngredients);
        nomIngredients.textContent = ingredient.ingredient;


        const groupQteIngredients = document.createElement('div');
        groupQteIngredients.className = 'group_qte_ingredient';
        groupIngredients.appendChild(groupQteIngredients);


        const qteIngredients = document.createElement('div');
        qteIngredients.className = 'qte_ingredient';
        groupQteIngredients.appendChild(qteIngredients);
        qteIngredients.textContent = ingredient.quantity;



        const uniteIngredients = document.createElement('div');
        uniteIngredients.className = 'unite_ingredient';
        groupQteIngredients.appendChild(uniteIngredients);
        uniteIngredients.textContent = ingredient.unit;

    });


    return recipeCard;
}


/**
 * Initialise les cartes de recettes et les ajoute au conteneur de recettes.
 */
const gridRecipe = document.querySelector('.recipe_container');

recipes.forEach(recipe => {
    recipe.isDisplayed = true;
    const recipeCard = createRecipeCard(recipe);
    gridRecipe.appendChild(recipeCard);
});

const qtyRecipe = document.querySelectorAll('.recipe_card').length;
console.log(qtyRecipe);
const qtyRecipeElement = document.querySelector('.result_counter');
qtyRecipeElement.textContent = `${qtyRecipe} recettes`;

const searchBar = document.querySelector('.header_container-search-bar input');
const clearIcon = document.createElement('span');
clearIcon.className = 'fa-solid fa-xmark';
clearIcon.id = 'clear-button';

searchBar.parentNode.appendChild(clearIcon);

clearIcon.style.display = 'none';

searchBar.addEventListener('input', function() {
    if (searchBar.value) {
        clearIcon.style.display = 'block';
    } else {
        clearIcon.style.display = 'none';
    }
});

clearIcon.addEventListener('click', function() {
    searchBar.value = '';

    clearIcon.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const inputElements = document.querySelectorAll('input');

    inputElements.forEach(input => {
        input.value = '';
    });
});

