// Obtenez les éléments de la barre de recherche pour chaque liste déroulante
let searchBarIngredients = document.getElementById('ingredients');
let searchBarAppliances = document.getElementById('appareils');
let searchBarUstensils = document.getElementById('ustensiles');

// Ajoutez un écouteur d'événements 'input' à chaque barre de recherche
searchBarIngredients.addEventListener('input', function() {
    searchTags(this.value, '.list_ingredients', 'ingredients');
    console.log(this.value);
});
searchBarAppliances.addEventListener('input', function() {
    searchTags(this.value, '.list_appareils', 'appareils');
});
searchBarUstensils.addEventListener('input', function() {
    searchTags(this.value, '.list_ustensiles', 'ustensiles');
});

function searchTags(searchInput, tagClass, dropdown) {

    // Si l'entrée de l'utilisateur est inférieure à 3 caractères, retournez de la fonction
    if (searchInput.length < 3) {
        return;
    }

    // Convertissez l'entrée de l'utilisateur en minuscules
    let searchInputLower = searchInput.toLowerCase();

    // Créez un Set pour stocker les tags uniques
    let uniqueTags = new Set();

    // Obtenez tous les tags de la liste déroulante correspondante
    let tags = document.querySelectorAll('.item_name');
    let found = false; // Ajoutez une variable pour suivre si un tag a été trouvé

    // Parcourez chaque tag
    tags.forEach(tag => {
        // Vérifiez si le tag appartient à la liste déroulante correspondante
        if (tag.closest('.list_' + dropdown)) {
            // Obtenez le texte du tag et convertissez-le en minuscules
            let tagTextLower = tag.textContent.toLowerCase();

            // Divisez le texte du tag en mots
            let words = tagTextLower.split(' ');

            // Vérifiez si l'un des mots commence par l'entrée de l'utilisateur
            let match = words.some(word => word.startsWith(searchInputLower));

            if (match) {
                // Si le tag est déjà dans le Set, cachez-le
                if (uniqueTags.has(tagTextLower)) {
                    tag.style.display = 'none';
                } else {
                    // Sinon, ajoutez-le au Set et affichez-le
                    uniqueTags.add(tagTextLower);
                    tag.style.display = 'flex';
                    found = true; // Un tag correspondant a été trouvé

                    // Si un message d'erreur existe, supprimez-le
                    let errorMessage = document.querySelector('.list_' + dropdown + ' .error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            } else {
                // Si le mot ne commence pas par l'entrée de l'utilisateur, cachez le tag
                tag.style.display = 'none';
            }
        }
    });

    // Si aucun tag correspondant n'a été trouvé, affichez un message d'erreur
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
    // Obtenez les éléments de la barre de recherche pour chaque liste déroulante
    let searchBarIngredients = document.getElementById('ingredients');
    let searchBarAppliances = document.getElementById('appareils');
    let searchBarUstensils = document.getElementById('ustensiles');

    // Réinitialisez les barres de recherche
    searchBarIngredients.value = '';
    searchBarAppliances.value = '';
    searchBarUstensils.value = '';

    // Réinitialisez les tags
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