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
 * Échappe les caractères spéciaux HTML dans une chaîne de caractères.
 * @param {string} str - La chaîne de caractères à échapper.
 * @returns {string} - La chaîne de caractères échappée.
 */
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

/**
 * Recherche des tags en fonction de l'entrée de l'utilisateur.
 * @param {string} searchInput - L'entrée de recherche de l'utilisateur.
 * @param {string} tagClass - La classe CSS des tags à rechercher.
 * @param {string} dropdown - Le type de dropdown (ingrédients, appareils, ustensiles).
 */
function searchTags(searchInput, tagClass, dropdown) {
    let searchInputLower = escapeHTML(searchInput.toLowerCase());
    let uniqueTags = new Set();
    let tags = document.querySelectorAll('.item_name');
    let found = false;

    if (searchInput.length < 3) {
        tags.forEach(tag => {
            if (tag.closest('.list_' + dropdown)) {
                tag.style.display = 'flex';
            }
        });

        let errorMessage = document.querySelector('.list_' + dropdown + ' .error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        return;
    }

    tags.forEach(tag => {
        if (tag.closest('.list_' + dropdown)) {
            let tagTextLower = tag.textContent.toLowerCase();
            let words = tagTextLower.split(' ');

            let match = words.some(word => word.startsWith(searchInputLower));

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
    });

    if (!found) {
        let errorMessage = document.querySelector('.list_' + dropdown + ' .error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            document.querySelector('.list_' + dropdown).appendChild(errorMessage);
        }
        errorMessage.textContent = `Aucun tag ne correspond à '${escapeHTML(searchInput)}'`;
    }
}

/**
 * Efface la recherche et réinitialise l'affichage des tags.
 */
function clearSearch() {
    let searchBarIngredients = document.getElementById('ingredients');
    let searchBarAppliances = document.getElementById('appareils');
    let searchBarUstensils = document.getElementById('ustensiles');

    searchBarIngredients.value = '';
    searchBarAppliances.value = '';
    searchBarUstensils.value = '';

    let tags = document.querySelectorAll('.item_name');
    tags.forEach(tag => {
        tag.style.display = 'flex';
    });

    // Supprime les messages d'erreur
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => {
        errorMessage.remove();
    });
}