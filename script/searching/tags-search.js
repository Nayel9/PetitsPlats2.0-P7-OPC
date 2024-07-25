let searchBarIngredients = document.getElementById('ingredients');
let searchBarAppliances = document.getElementById('appareils');
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

function searchTags(searchInput, tagClass, dropdown) {
    if (searchInput.length < 3) {
        return;
    }

    let searchInputLower = searchInput.toLowerCase();
    let uniqueTags = new Set();
    let tags = document.querySelectorAll('.item_name');
    let found = false;

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
        errorMessage.textContent = `Aucun tag ne correspond à ' ${searchInput} '`;
    }
}
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

    // Supprimez les messages d'erreur
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => {
        errorMessage.remove();
    });
}