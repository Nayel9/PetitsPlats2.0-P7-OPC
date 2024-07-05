const ingredientFilter = document.querySelector('.filtre_ingredients');
const appareilFilter = document.querySelector('.filtre_appareils');
const ustensileFilter = document.querySelector('.filtre_ustensiles');

const selectedFilters = new Set();

function handleFilterClick(filter, option, list, dropdownIcon, items, className) {
    filter.addEventListener('click', function(event) {
        event.stopPropagation();
        if (option.style.display === 'none') {
            setTimeout(function() {
                option.style.display = 'flex';
                list.style.display = 'flex';
                dropdownIcon.classList.add('open-rotate')
                dropdownIcon.classList.remove('close-rotate')

                let listName = document.querySelector('.' + className);
                if (!listName) {
                    listName = document.createElement('div');
                    listName.className = className;
                    list.appendChild(listName);
                } else {

                    listName.innerHTML = '';
                }

                items.forEach(item => {
                    const name = document.createElement('p');
                    listName.appendChild(name);
                    name.textContent = item;

                    name.addEventListener('click', function(event) {
                        const clickedItem = event.target.textContent;
                        if (!selectedFilters.has(clickedItem)) {
                            selectedFilters.add(clickedItem);
                            updateSelectedOption(clickedItem);
                        }
                    });
                });
            }, 0);
        } else {
            setTimeout(function() {
                option.style.display = 'none';
                list.style.display = 'none';
                dropdownIcon.classList.remove('open-rotate')
                dropdownIcon.classList.add('close-rotate')
            }, 0);
        }
    });
}

function updateSelectedOption(item) {
    const sortOption = document.querySelector('.sort_options');
    const selectedOption = document.createElement('div');
    selectedOption.className = 'selected_option';
    sortOption.appendChild(selectedOption);
    selectedOption.textContent = item;
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fa-solid fa-xmark';
    closeIcon.style.cursor = 'pointer';
    selectedOption.appendChild(closeIcon);

    closeIcon.addEventListener('click', function() {
        selectedOption.remove();
        selectedFilters.delete(item);
    });
}

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

handleFilterClick(ingredientFilter, document.querySelector('.option_ingredients'), document.querySelector('.list_ingredients'), document.querySelector('.dropdown-icon-ingredients'), uniqueIngredients, 'list_name_ingredient');
handleFilterClick(appareilFilter, document.querySelector('.option_appareils'), document.querySelector('.list_appareils'), document.querySelector('.dropdown-icon-appareils'), uniqueAppliances, 'list_name_appareils');
handleFilterClick(ustensileFilter, document.querySelector('.option_ustensiles'), document.querySelector('.list_ustensiles'), document.querySelector('.dropdown-icon-ustensiles'), uniqueUstensils, 'list_name_ustensiles');

document.addEventListener('click', function(event) {
    if (!ingredientFilter.contains(event.target)) {
        document.querySelector('.option_ingredients').style.display = 'none';
        document.querySelector('.list_ingredients').style.display = 'none';
        document.querySelector('.dropdown-icon-ingredients').classList.add('close-rotate');
    }

    if (!appareilFilter.contains(event.target)) {
        document.querySelector('.option_appareils').style.display = 'none';
        document.querySelector('.list_appareils').style.display = 'none';
        document.querySelector('.dropdown-icon-appareils').classList.add('close-rotate');
    }

    if (!ustensileFilter.contains(event.target)) {
        document.querySelector('.option_ustensiles').style.display = 'none';
        document.querySelector('.list_ustensiles').style.display = 'none';
        document.querySelector('.dropdown-icon-ustensiles').classList.add('close-rotate');
    }
});

window.onload = function() {
    document.querySelector('.option_ingredients').style.display = 'none';
    document.querySelector('.list_ingredients').style.display = 'none';
    document.querySelector('.dropdown-icon-ingredients').classList.add('close-rotate');

    document.querySelector('.option_appareils').style.display = 'none';
    document.querySelector('.list_appareils').style.display = 'none';
    document.querySelector('.dropdown-icon-appareils').classList.add('close-rotate');

    document.querySelector('.option_ustensiles').style.display = 'none';
    document.querySelector('.list_ustensiles').style.display = 'none';
    document.querySelector('.dropdown-icon-ustensiles').classList.add('close-rotate');
}

const inputElements = document.querySelectorAll('.option input');
inputElements.forEach(input => {
    input.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});