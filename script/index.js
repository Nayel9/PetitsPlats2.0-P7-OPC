import { recipes } from '/script/data/recipes.js';

function createRecipeCard(recipe) {
    // Créez un élément de carte
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe_card';

    // Image de la recette
    const cardImg = document.createElement('div');
    cardImg.className = 'recipe_card_img';
    recipeCard.appendChild(cardImg);
    const img = document.createElement('img');
    cardImg.appendChild(img);
    img.src = `/img/recettes/${recipe.image}`;

    // Temps de préparation
    const recipeTime = document.createElement('div');
    recipeTime.className = 'recipe_card_time';
    recipeCard.appendChild(recipeTime);
    recipeTime.textContent = `${recipe.time} min`;

    // Contenu de la recette
    const recipeContent = document.createElement('div');
    recipeContent.className = 'recipe_card_content';
    recipeCard.appendChild(recipeContent);

    // Titre de la recette
    const containTitle = document.createElement('div');
    containTitle.className = 'recipe_card_title';
    recipeContent.appendChild(containTitle);

    const recipeTitle = document.createElement('h2');
    containTitle.appendChild(recipeTitle);
    recipeTitle.textContent = recipe.name;

    // Description de la recette
    const recipeDescription = document.createElement('div');
    recipeDescription.className = 'recipe_card_description';
    recipeContent.appendChild(recipeDescription);

    const recipeDescriptionTitle = document.createElement('h3');
    recipeDescription.appendChild(recipeDescriptionTitle);
    recipeDescriptionTitle.textContent = 'Recette';

    const recipeDescriptionText = document.createElement('p');
    recipeDescription.appendChild(recipeDescriptionText);
    recipeDescriptionText.textContent = recipe.description;

    // Ingrédients de la recette
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

// Trouvez le conteneur où vous voulez ajouter les cartes de recettes
const gridRecipe = document.querySelector('.recipe_container');

// Parcourez les recettes et ajoutez chaque carte de recette au conteneur
recipes.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    gridRecipe.appendChild(recipeCard);
});

const qtyRecipe = document.querySelectorAll('.recipe_card').length;
console.log(qtyRecipe);
const qtyRecipeElement = document.querySelector('.result_counter');
qtyRecipeElement.textContent = `${qtyRecipe} recettes`;
