
const uniqueIngredients = new Set();
const uniqueAppliances = new Set();
const uniqueUstensils = new Set();

recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        uniqueIngredients.add(ingredient.ingredient);
    });
    uniqueAppliances.add(recipe.appliance);
    recipe.ustensils.forEach(ustensile => {
        uniqueUstensils.add(ustensile);
    });
});


const dropdownIngredients = new Dropdown(
    document.querySelector('.filtre_ingredients'),
    document.querySelector('.option_ingredients'),
    document.querySelector('.list_ingredients'),
    document.querySelector('.dropdown-icon-ingredients'),
    Array.from(uniqueIngredients),
    'list_ingredient'
);

const dropdownAppliances = new Dropdown(
    document.querySelector('.filtre_appareils'),
    document.querySelector('.option_appareils'),
    document.querySelector('.list_appareils'),
    document.querySelector('.dropdown-icon-appareils'),
    Array.from(uniqueAppliances),
    'list_appareils'
);

const dropdownUstensils = new Dropdown(
    document.querySelector('.filtre_ustensiles'),
    document.querySelector('.option_ustensiles'),
    document.querySelector('.list_ustensiles'),
    document.querySelector('.dropdown-icon-ustensiles'),
    Array.from(uniqueUstensils),
    'list_ustensiles'
);


dropdownIngredients.initDropdown();
dropdownIngredients.createListItem();

dropdownAppliances.initDropdown();
dropdownAppliances.createListItem();

dropdownUstensils.initDropdown();
dropdownUstensils.createListItem();
