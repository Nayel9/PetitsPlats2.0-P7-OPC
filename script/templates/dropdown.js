const ingredientFilter = document.querySelector('.filtre_ingredients');
const appareilFilter = document.querySelector('.filtre_appareils');
const ustensileFilter = document.querySelector('.filtre_ustensiles');

const selectedFilters = new Set();

function handleFilterClick(filter, option, list, dropdownIcon, items, className) {
    filter.addEventListener('click', function(event) {
        event.stopPropagation();
        if (option.style.display === 'none') {
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
                // const name = document.querySelectorAll('.item_name');

                const name = document.createElement('div');
                // Vérifiez si l'élément est dans selectedFilters
                if (selectedFilters.has(item)) {
                    updateListItem(name, item);
                } else {
                    name.className = 'item_name';
                }
                listName.appendChild(name);
                name.textContent = item;

                // Vérifiez si un écouteur d'événement a déjà été ajouté
                if (!name.hasClickListener) {
                    name.addEventListener('click', function(event) {
                        event.stopPropagation();
                        const clickedItem = event.target.textContent;
                        console.log(clickedItem);
                        if (!selectedFilters.has(clickedItem)) {
                            updateListItem(name, clickedItem);
                            selectedFilters.add(clickedItem);
                            updateSelectedOption(clickedItem);
                        } else {
                            name.className = 'item_name'; // Réinitialise la classe CSS de name
                            selectedFilters.delete(clickedItem); // Supprime l'élément de selectedFilters
                            const circleCloseIcon = name.querySelector('.circle_close_icon');
                            if (circleCloseIcon) {
                                circleCloseIcon.remove(); // Supprime circleCloseIcon
                            }
                            const selectedOption = document.querySelector('.selected_option');
                            if (selectedOption) {
                                selectedOption.remove(); // Supprime selectedOption
                            }
                        }
                    });

                    // Marquez l'élément comme ayant un écouteur d'événement
                    name.hasClickListener = true;
                }
            });
        } else {
            option.style.display = 'none';
            list.style.display = 'none';
            dropdownIcon.classList.remove('open-rotate')
            dropdownIcon.classList.add('close-rotate')
        }
    });
}
function updateListItem(name, item) {
    const circleCloseIcon = document.createElement('div');
    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark';
    circleCloseIcon.appendChild(icon);
    circleCloseIcon.className = 'circle_close_icon';
    name.appendChild(circleCloseIcon);
    name.className = 'item_name_selected';

    circleCloseIcon.addEventListener('click', function(event) {
        event.stopPropagation()
        if (name.className === 'item_name_selected') {
            name.className = 'item_name';
            selectedFilters.delete(item);
            circleCloseIcon.remove();
        }

        const selectedOption = document.querySelector('.selected_option');
        if (selectedOption) {
            selectedOption.remove();
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

// Sélectionnez toutes les barres de recherche
const searchBarOptions = document.querySelectorAll('.option input');

searchBarOptions.forEach(searchBarOption => {
    const clearOption = document.createElement('span');
    clearOption.className = 'fa-solid fa-xmark';

    // Ajoutez l'icône de croix à la barre de recherche
    searchBarOption.parentNode.appendChild(clearOption);

    // Cachez l'icône de croix par défaut
    clearOption.style.display = 'none';

    // Ajoutez un écouteur d'événements 'input' à la barre de recherche
    searchBarOption.addEventListener('input', function() {
        // Si la barre de recherche contient du texte, affichez l'icône de croix
        if (searchBarOption.value) {
            clearOption.style.display = 'block';
        } else {
            clearOption.style.display = 'none';
        }
    });

    // Ajoutez un écouteur d'événements 'click' à l'icône de croix
    clearOption.addEventListener('click', function(event) {
        event.stopPropagation()
        // Effacez le contenu de la barre de recherche
        searchBarOption.value = '';

        // Cachez l'icône de croix
        clearOption.style.display = 'none';
    });
});
