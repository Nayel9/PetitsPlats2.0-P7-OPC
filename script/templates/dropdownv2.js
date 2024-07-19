class Dropdown {
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


    initBlur() {
    this.list.addEventListener('blur', (event) => {
        // Si l'élément qui reçoit le focus est l'input, ne fermez pas la liste
        if (this.list.contains(event.relatedTarget)) {
            return;
        }
        this.closeDropdown();
    });
}

    openDropdown() {
        this.option.style.display = 'flex';
        this.list.style.display = 'flex';
        this.dropdownIcon.classList.add('open-rotate');
        this.dropdownIcon.classList.remove('close-rotate');
        this.list.setAttribute('tabindex', '0');
        this.list.focus();
        this.isOpen = true;
    }

    closeDropdown() {
        this.option.style.display = 'none';
        this.list.style.display = 'none';
        this.dropdownIcon.classList.remove('open-rotate');
        this.dropdownIcon.classList.add('close-rotate');
        this.list.blur();
        this.isOpen = false;
    }


    toggleDropdown() {
        if (this.isOpen) { // Modifiez cette ligne
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }


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

    // createListItem() {
    //     let listName = document.querySelector('.' + this.className);
    //     if (!listName) {
    //         listName = document.createElement('div');
    //         listName.className = this.className;
    //         this.list.appendChild(listName);
    //     } else {
    //         listName.innerHTML = '';
    //     }
    //
    //     this.items.forEach(item => {
    //         const name = document.createElement('div');
    //         name.className = 'item_name';
    //         name.textContent = item;
    //         listName.appendChild(name);
    //
    //         name.addEventListener('click', (event) => {
    //             event.stopPropagation();
    //             this.createSelectedOption(item, name);
    //             this.createListedOption(item, name); // Passez name ici
    //         });
    //
    //     });
    //
    // }

    createListItem() {
    this.items.forEach(item => {
        const name = document.createElement('div');
        name.className = 'item_name';
        name.textContent = item;

        // Insérez name après this.option
        this.option.parentNode.appendChild(name);

        name.addEventListener('click', (event) => {
            event.stopPropagation();
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

            // Ajoutez un gestionnaire d'événements blur ou focusout
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
                if (searchBarOption.value) {
                    clearOption.style.display = 'block';
                } else {
                    clearOption.style.display = 'none';
                }
            });

            clearOption.addEventListener('click', function(event) {
                event.stopPropagation()
                clearSearch();
                searchBarOption.value = '';
                clearOption.style.display = 'none';
            });
        });
    }

}

