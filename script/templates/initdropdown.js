/**
 * Ensemble des ingrédients uniques.
 * @type {Set<string>}
 */
const uniqueIngredients = new Set();

/**
 * Ensemble des appareils uniques.
 * @type {Set<string>}
 */
const uniqueAppliances = new Set();

/**
 * Ensemble des ustensiles uniques.
 * @type {Set<string>}
 */
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


/**
 * Instance de Dropdown pour les ingrédients.
 * @type {Dropdown}
 */
const dropdownIngredients = new Dropdown(
    document.querySelector('.filtre_ingredients'),
    document.querySelector('.option_ingredients'),
    document.querySelector('.list_ingredients'),
    document.querySelector('.dropdown-icon-ingredients'),
    Array.from(uniqueIngredients)
);

/**
 * Instance de Dropdown pour les appareils.
 * @type {Dropdown}
 */
const dropdownAppliances = new Dropdown(
    document.querySelector('.filtre_appareils'),
    document.querySelector('.option_appareils'),
    document.querySelector('.list_appareils'),
    document.querySelector('.dropdown-icon-appareils'),
    Array.from(uniqueAppliances)
);

/**
 * Instance de Dropdown pour les ustensiles.
 * @type {Dropdown}
 */
const dropdownUstensils = new Dropdown(
    document.querySelector('.filtre_ustensiles'),
    document.querySelector('.option_ustensiles'),
    document.querySelector('.list_ustensiles'),
    document.querySelector('.dropdown-icon-ustensiles'),
    Array.from(uniqueUstensils)
);

dropdownIngredients.initDropdown();
dropdownIngredients.createListItem();


dropdownAppliances.initDropdown();
dropdownAppliances.createListItem();

dropdownUstensils.initDropdown();
dropdownUstensils.createListItem();

