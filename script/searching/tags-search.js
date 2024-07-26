/**
 * Élément de la barre de recherche des ingrédients.
 * @type {HTMLElement}
 */
let searchBarIngredients = document.getElementById('ingredients');

/**
 * Élément de la barre de recherche des appareils.
 * @type {HTMLElement}
 */
let searchBarAppliances = document.getElementById('appareils');

/**
 * Élément de la barre de recherche des ustensiles.
 * @type {HTMLElement}
 */
let searchBarUstensils = document.getElementById('ustensiles');

searchBarIngredients.addEventListener('input', function() {
    searchTags(this.value, '.list_ingredients', 'ingredients');
});
searchBarAppliances.addEventListener('input', function() {
    searchTags(this.value, '.list_appareils', 'appareils');
});
searchBarUstensils.addEventListener('input', function() {
    searchTags(this.value, '.list_ustensiles', 'ustensiles');
});

/**
 * Recherche les tags en fonction de l'input de l'utilisateur.
 * @param {string} searchInput - La valeur de l'input de recherche.
 * @param {string} tagClass - La classe CSS de la liste des tags.
 * @param {string} dropdown - Le type de dropdown (ingrédients, appareils, ustensiles).
 */
function searchTags(searchInput, tagClass, dropdown) {
    if (searchInput.length < 3) {
        let tags = document.querySelectorAll('.item_name');
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].closest('.list_' + dropdown)) {
                tags[i].style.display = 'flex';
            }
        }
        return;
    }

    let searchInputLower = searchInput.toLowerCase();
    let uniqueTags = new Set();
    let tags = document.querySelectorAll('.item_name');
    let found = false;

    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        if (tag.closest('.list_' + dropdown)) {
            let tagTextLower = tag.textContent.toLowerCase();
            let words = tagTextLower.split(' ');

            let match = false;
            for (let j = 0; j < words.length; j++) {
                if (words[j].startsWith(searchInputLower)) {
                    match = true;
                    break;
                }
            }

            if (match) {
                if (uniqueTags.has(tagTextLower)) {
                    tag.style.display = 'none';
                } else {
                    uniqueTags.add(tagTextLower);
                    tag.style.display = 'flex';
                    found = true;

                    let errorMessage = document.querySelector('.list_' + dropdown + ' .error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            } else {
                tag.style.display = 'none';
            }
        }
    }

    if (!found) {
        let errorMessage = document.querySelector('.list_' + dropdown + ' .error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            document.querySelector('.list_' + dropdown).appendChild(errorMessage);
        }
        errorMessage.textContent = `Aucun tag ne correspond à ' ${searchInput} '`;
    }
}

/**
 * Réinitialise les barres de recherche et affiche tous les tags.
 */
function clearSearch() {
    let searchBarIngredients = document.getElementById('ingredients');
    let searchBarAppliances = document.getElementById('appareils');
    let searchBarUstensils = document.getElementById('ustensiles');

    searchBarIngredients.value = '';
    searchBarAppliances.value = '';
    searchBarUstensils.value = '';

    let tags = document.querySelectorAll('.item_name');
    for (let i = 0; i < tags.length; i++) {
        tags[i].style.display = 'flex';
    }

    let errorMessages = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].remove();
    }
}