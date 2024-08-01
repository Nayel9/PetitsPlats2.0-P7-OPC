/**
 * Classe représentant un menu déroulant.
 */
class Dropdown {
    /**
     * Crée une instance de Dropdown.
     * @param {HTMLElement} filter - L'élément HTML du filtre.
     * @param {HTMLElement} option - L'élément HTML des options.
     * @param {HTMLElement} list - L'élément HTML de la liste.
     * @param {HTMLElement} dropdownIcon - L'élément HTML de l'icône du menu déroulant.
     * @param {Array} items - La liste des éléments du menu déroulant.
     */
    constructor(filter, option, list, dropdownIcon, items) {
        this.filter = filter;
        this.option = option;
        this.list = list;
        this.dropdownIcon = dropdownIcon;
        this.items = items;
        this.selectedFilters = new Set();
        this.list.style.display = 'none';
        this.option.style.display = 'none';
        this.isOpen = false;
        this.initSearchBarOptions();
        this.initBlur();
    }

    /**
     * Initialise l'événement de perte de focus pour fermer le menu déroulant.
     */
    initBlur() {
        this.list.addEventListener('blur', (event) => {
            if (this.list.contains(event.relatedTarget)) {
                return;
            }
            this.closeDropdown();
        });
    }

    /**
     * Ouvre le menu déroulant.
     */
    openDropdown() {
        this.option.style.display = 'flex';
        this.list.style.display = 'flex';
        this.dropdownIcon.classList.add('open-rotate');
        this.dropdownIcon.classList.remove('close-rotate');
        this.list.setAttribute('tabindex', '0');
        this.list.focus();
        this.isOpen = true;
    }

    /**
     * Ferme le menu déroulant.
     */
    closeDropdown() {
        this.option.style.display = 'none';
        this.list.style.display = 'none';
        this.dropdownIcon.classList.remove('open-rotate');
        this.dropdownIcon.classList.add('close-rotate');
        this.list.blur();
        this.isOpen = false;
    }

    /**
     * Bascule l'état du menu déroulant entre ouvert et fermé.
     */
    toggleDropdown() {
        this.isOpen ? this.closeDropdown() : this.openDropdown();
    }

    /**
     * Initialise le menu déroulant avec les événements de la souris.
     */
    initDropdown() {
        let isMouseDown = false;

        this.filter.addEventListener('mousedown', (event) => {
            event.preventDefault();
            isMouseDown = true;
        });

        this.filter.addEventListener('mouseup', (event) => {
            event.preventDefault();
            if (isMouseDown) {
                this.toggleDropdown();
                isMouseDown = false;
            }
        });
    }

    /**
     * Met à jour les éléments du menu déroulant en fonction des recettes filtrées.
     * @param {Array} newItems - La nouvelle liste des éléments.
     */
    updateItems(newItems) {
        this.items = newItems;
        this.createListItem();
    }

    /**
     * Crée les éléments de la liste du menu déroulant.
     */
    createListItem() {
        // Supprimer les éléments existants
        this.option.parentNode.querySelectorAll('.item_name').forEach(item => item.remove());
        console.log(this.items);
        // Ajouter les nouveaux éléments
        this.items.forEach(item => {
            const name = document.createElement('div');
            name.className = 'item_name';
            name.textContent = item;

            this.option.parentNode.appendChild(name);

            name.addEventListener('click', (event) => {
                event.stopPropagation();
                this.createSelectedOption(item, name);
                this.createListedOption(item, name);
            });
        });
    }

    /**
     * Crée une option listée dans le menu déroulant.
     * @param {string} item - L'élément à ajouter.
     * @param {HTMLElement} name - L'élément HTML du nom.
     */
    createListedOption(item, name) {
        name.className = 'item_name_selected';

        let circleCloseIcon = name.querySelector('.circle_close_icon');
        if (!circleCloseIcon) {
            circleCloseIcon = document.createElement('div');
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-xmark';
            circleCloseIcon.appendChild(icon);
            circleCloseIcon.className = 'circle_close_icon';
            name.appendChild(circleCloseIcon);
        }

        circleCloseIcon.addEventListener('click', (event) => {
            event.stopPropagation();

            const selectedOption = Array.from(document.querySelectorAll('.selected_option')).find(option => option.textContent === item);
            if (selectedOption) {
                selectedOption.remove();
            }
            name.className = 'item_name';
            circleCloseIcon.remove();

            this.selectedFilters.delete(item);

            const index = userChosenTags.indexOf(item);
            if (index !== -1) {
                userChosenTags.splice(index, 1);
            }

            userChosenTags.length > 0 ? filterRecipesByTags() : searchRecipes();
        });

        if (!userChosenTags.includes(item)) {
            userChosenTags.push(item);
            filterRecipesByTags();
        }
    }

    /**
     * Crée une option sélectionnée dans le menu déroulant.
     * @param {string} item - L'élément à ajouter.
     * @param {HTMLElement} name - L'élément HTML du nom.
     */
    createSelectedOption(item, name) {
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
        closeIcon.className = 'fa-solid fa-xmark close_icon';
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
                const index = userChosenTags.indexOf(item);
                if (index !== -1) {
                    userChosenTags.splice(index, 1);
                }

                userChosenTags.length > 0 ? filterRecipesByTags() : searchRecipes();
            }

        });

        this.selectedFilters.add(item);
    }

    /**
     * Initialise les options de la barre de recherche.
     */
    initSearchBarOptions() {
        const inputElements = this.option.querySelectorAll('input');
        inputElements.forEach(input => {
            input.addEventListener('click', function(event) {
                event.stopPropagation();
            });

            input.addEventListener('blur', (event) => {
                if (this.list.contains(event.relatedTarget)) {
                    return;
                }
                this.closeDropdown();
            });
        });

        const searchBarOptions = this.option.querySelectorAll('input');

        searchBarOptions.forEach(searchBarOption => {
            const clearOption = document.createElement('span');
            clearOption.className = 'fa-solid fa-xmark clear-button';

            searchBarOption.parentNode.appendChild(clearOption);

            clearOption.style.display = 'none';

            searchBarOption.addEventListener('input', function() {
                clearOption.style.display = searchBarOption.value ? 'block' : 'none';
            });

            clearOption.addEventListener('click', function(event) {
                event.stopPropagation();
                clearSearch();
                searchBarOption.value = '';
                clearOption.style.display = 'none';
            });
        });
    }
}