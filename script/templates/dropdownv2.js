class Dropdown {
    constructor(filter, option, list, dropdownIcon, items, className) {
        this.filter = filter;
        this.option = option;
        this.list = list;
        this.dropdownIcon = dropdownIcon;
        this.items = items;
        this.className = className;
        this.selectedFilters = new Set();
        this.option.style.display = 'none';
        this.initSearchBarOptions();
    }

    openDropdown() {
        this.option.style.display = 'flex';
        this.list.style.display = 'flex';
        this.dropdownIcon.classList.add('open-rotate');
        this.dropdownIcon.classList.remove('close-rotate');
    }

    closeDropdown() {
        this.option.style.display = 'none';
        this.list.style.display = 'none';
        this.dropdownIcon.classList.remove('open-rotate');
        this.dropdownIcon.classList.add('close-rotate');
    }

    quitDropdown() {
        document.addEventListener('click', (event) => {
            // Vérifiez si l'événement de clic provient d'un élément de la liste
            if (this.list.contains(event.target)) {
                // Si c'est le cas, arrêtez la propagation de l'événement
                event.stopPropagation();
            } else if (!this.filter.contains(event.target)) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        if (this.option.style.display === 'none') {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }

    initDropdown() {
        this.filter.addEventListener('click', () => this.toggleDropdown());
    }

    createListItem() {
        let listName = document.querySelector('.' + this.className);
        if (!listName) {
            listName = document.createElement('div');
            listName.className = this.className;
            this.list.appendChild(listName);
        } else {
            listName.innerHTML = '';
        }

        this.items.forEach(item => {
            const name = document.createElement('div');
            name.className = 'item_name';
            name.textContent = item;
            listName.appendChild(name);

            name.addEventListener('click', () => {
                this.createSelectedOption(item, name);
                this.createListedOption(item, name); // Passez name ici
            });

        });

    }

    createListedOption(item, name) { // Ajoutez name comme paramètre ici
        name.className = 'item_name_selected';

        // Vérifiez si un circleCloseIcon existe déjà
        let circleCloseIcon = name.querySelector('.circle_close_icon');
        if (!circleCloseIcon) {
            // S'il n'existe pas, créez-en un nouveau
            circleCloseIcon = document.createElement('div');
            const icon = document.createElement('i')
            icon.className = 'fa-solid fa-xmark';
            circleCloseIcon.appendChild(icon);
            circleCloseIcon.className = 'circle_close_icon';
            name.appendChild(circleCloseIcon);
        }

        circleCloseIcon.addEventListener('click', (event) => {
            event.stopPropagation()

            const selectedOption = Array.from(document.querySelectorAll('.selected_option')).find(option => option.textContent === item);
            if (selectedOption) {
                selectedOption.remove();
            }
            name.className = 'item_name';
            circleCloseIcon.remove();
        });
    }

    createSelectedOption(item, name) {
        // Si l'él��ment est déjà sélectionné, ne faites rien
        if (this.selectedFilters.has(item)) {
            return;
        }

        const sortOption = document.querySelector('.sort_options');
        if (!sortOption) {
            console.error('sortOption not found');
            return;
        }

        const selectedOption = document.createElement('div');
        selectedOption.className = 'selected_option';
        sortOption.appendChild(selectedOption);
        selectedOption.textContent = item;
        const closeIcon = document.createElement('i');
        closeIcon.className = 'fa-solid fa-xmark';
        closeIcon.style.cursor = 'pointer';
        selectedOption.appendChild(closeIcon);

        closeIcon.addEventListener('click', () => {
            selectedOption.remove();
            this.selectedFilters.delete(item);
            if (name) {
                name.className = 'item_name';
                let circleCloseIcon = name.querySelector('.circle_close_icon');
                if (circleCloseIcon) {
                    circleCloseIcon.remove();
                }
            }
        });

        // Ajoutez l'élément à this.selectedFilters
        this.selectedFilters.add(item);
    }

    initSearchBarOptions() {
        const inputElements = this.option.querySelectorAll('input');
        inputElements.forEach(input => {
            input.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        });

        const searchBarOptions = this.option.querySelectorAll('input');

        searchBarOptions.forEach(searchBarOption => {
            const clearOption = document.createElement('span');
            clearOption.className = 'fa-solid fa-xmark';

            searchBarOption.parentNode.appendChild(clearOption);

            clearOption.style.display = 'none';

            searchBarOption.addEventListener('input', function() {
                if (searchBarOption.value) {
                    clearOption.style.display = 'block';
                } else {
                    clearOption.style.display = 'none';
                }
            });

            clearOption.addEventListener('click', function(event) {
                event.stopPropagation()
                searchBarOption.value = '';
                clearOption.style.display = 'none';
            });
        });
    }

}

// Remplissez d'abord les ensembles
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

// Ensuite, créez vos instances de Dropdown
const dropdownIngredients = new Dropdown(
    document.querySelector('.filtre_ingredients'),
    document.querySelector('.option_ingredients'),
    document.querySelector('.list_ingredients'),
    document.querySelector('.dropdown-icon-ingredients'),
    Array.from(uniqueIngredients), // Convertissez l'ensemble en tableau
    'list_name_ingredient'
);

const dropdownAppliances = new Dropdown(
    document.querySelector('.filtre_appareils'),
    document.querySelector('.option_appareils'),
    document.querySelector('.list_appareils'),
    document.querySelector('.dropdown-icon-appareils'),
    Array.from(uniqueAppliances), // Convertissez l'ensemble en tableau
    'list_name_appareils'
);

const dropdownUstensils = new Dropdown(
    document.querySelector('.filtre_ustensiles'),
    document.querySelector('.option_ustensiles'),
    document.querySelector('.list_ustensiles'),
    document.querySelector('.dropdown-icon-ustensiles'),
    Array.from(uniqueUstensils), // Convertissez l'ensemble en tableau
    'list_name_ustensiles'
);

// Enfin, appelez initDropdown et createListItem
dropdownIngredients.initDropdown();
dropdownIngredients.createListItem();
dropdownIngredients.quitDropdown();

dropdownAppliances.initDropdown();
dropdownAppliances.createListItem();
dropdownAppliances.quitDropdown();

dropdownUstensils.initDropdown();
dropdownUstensils.createListItem();
dropdownUstensils.quitDropdown();
