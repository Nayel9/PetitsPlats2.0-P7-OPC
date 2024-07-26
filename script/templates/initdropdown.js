/**
 * Initialise les ensembles uniques pour les ingrédients, appareils et ustensiles.
 * @param {Array} recipes - La liste des recettes.
 */
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

/**
 * Initialise les menus déroulants pour les ingrédients, appareils et ustensiles.
 * @param {HTMLElement} ingredientFilter - L'élément HTML du filtre des ingrédients.
 * @param {HTMLElement} ingredientOption - L'élément HTML des options des ingrédients.
 * @param {HTMLElement} ingredientList - L'élément HTML de la liste des ingrédients.
 * @param {HTMLElement} ingredientIcon - L'élément HTML de l'icône du menu déroulant des ingrédients.
 * @param {Array} ingredients - La liste des ingrédients uniques.
 */
const dropdownIngredients = new Dropdown(
    document.querySelector('.filtre_ingredients'),
    document.querySelector('.option_ingredients'),
    document.querySelector('.list_ingredients'),
    document.querySelector('.dropdown-icon-ingredients'),
    Array.from(uniqueIngredients)
);

/**
 * Initialise le menu déroulant pour les appareils.
 * @param {HTMLElement} applianceFilter - L'élément HTML du filtre des appareils.
 * @param {HTMLElement} applianceOption - L'élément HTML des options des appareils.
 * @param {HTMLElement} applianceList - L'élément HTML de la liste des appareils.
 * @param {HTMLElement} applianceIcon - L'élément HTML de l'icône du menu déroulant des appareils.
 * @param {Array} appliances - La liste des appareils uniques.
 */
const dropdownAppliances = new Dropdown(
    document.querySelector('.filtre_appareils'),
    document.querySelector('.option_appareils'),
    document.querySelector('.list_appareils'),
    document.querySelector('.dropdown-icon-appareils'),
    Array.from(uniqueAppliances)
);

/**
 * Initialise le menu déroulant pour les ustensiles.
 * @param {HTMLElement} ustensilFilter - L'élément HTML du filtre des ustensiles.
 * @param {HTMLElement} ustensilOption - L'élément HTML des options des ustensiles.
 * @param {HTMLElement} ustensilList - L'élément HTML de la liste des ustensiles.
 * @param {HTMLElement} ustensilIcon - L'élément HTML de l'icône du menu déroulant des ustensiles.
 * @param {Array} ustensils - La liste des ustensiles uniques.
 */
const dropdownUstensils = new Dropdown(
    document.querySelector('.filtre_ustensiles'),
    document.querySelector('.option_ustensiles'),
    document.querySelector('.list_ustensiles'),
    document.querySelector('.dropdown-icon-ustensiles'),
    Array.from(uniqueUstensils)
);

/**
 * Initialise et crée les éléments de la liste des ingrédients.
 */
dropdownIngredients.initDropdown();
dropdownIngredients.createListItem();

/**
 * Initialise et crée les éléments de la liste des appareils.
 */
dropdownAppliances.initDropdown();
dropdownAppliances.createListItem();

/**
 * Initialise et crée les éléments de la liste des ustensiles.
 */
dropdownUstensils.initDropdown();
dropdownUstensils.createListItem();

