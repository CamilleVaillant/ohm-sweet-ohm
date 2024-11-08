document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const images = Array.from(carouselTrack.children);
    
    images.forEach(img => {
        const clone = img.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    let offset = 0;
    const imageWidth = images[0].getBoundingClientRect().width + 20; 

    function scrollCarousel() {
        offset -= 1; 

        if (offset <= -imageWidth * images.length) {
            offset = 0; 
        }
        
        carouselTrack.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(scrollCarousel); 
    }

    scrollCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
    const marqueeTexts = document.querySelectorAll('.marquee-text');

    function setRandomHeights() {
        marqueeTexts.forEach((text, index) => {
            const randomHeight = Math.floor(Math.random() * 200);
            text.style.top = `${randomHeight}px`;

            const delay = index * 1.5 + Math.random() * 2; 
            text.style.animationDelay = `${delay}s`;
        });
    }

    setRandomHeights();
});

// menu burgeur

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        burger.classList.toggle("toggle");
    });
});

// section article

// Charger les données JSON
fetch('json/article.json')
    .then(response => response.json())
    .then(data => {
        displayCards(data);
        
        const searchInput = document.getElementById('search-bar');
        const filterInputs = document.querySelectorAll('.filters input[type="checkbox"]');
        
        // Gestion de la recherche par nom
        searchInput.addEventListener('input', () => {
            filterAndDisplayCards(data);
        });
        
        // Gestion des filtres
        filterInputs.forEach(input => {
            input.addEventListener('change', () => {
                filterAndDisplayCards(data);
            });
        });
        
        // Gestion de la fermeture du popup
        document.getElementById('close-popup').addEventListener('click', closePopupFunction);

        // Fermer le popup en cliquant en dehors de la fenêtre
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('popup')) {
                closePopupFunction();
            }
        });
    });

// Filtrer et afficher les cartes
function filterAndDisplayCards(data) {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const activeFilters = Array.from(document.querySelectorAll('.filters input[type="checkbox"]:checked'))
                               .map(input => input.value);

    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        const matchesFilters = activeFilters.every(filter => item.tags.includes(filter));
        return matchesSearch && matchesFilters;
    });

    displayCards(filteredData);
}

// Afficher les cartes
function displayCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <button class="show-popup-btn" data-title="${item.name}" data-description="${item.description}">
                En savoir plus
            </button>
        `;
        
        container.appendChild(card);
    });

    // Ajouter un écouteur de clic sur tous les boutons "En savoir plus" après les avoir créés
    document.querySelectorAll('.show-popup-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const title = event.currentTarget.getAttribute('data-title');
            const description = event.currentTarget.getAttribute('data-description');
            showPopup(title, description);
        });
    });
}

// Fonction pour afficher le popup
window.showPopup = function (title, description) {
    const popup = document.getElementById('popup');
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-description').innerText = description;
    popup.style.display = 'flex';

    // Ajouter la classe 'blurred' à la section principale
    document.querySelector('.section-article').classList.add('blurred');
};

window.closePopupFunction = function () {
    document.getElementById('popup').style.display = 'none';

    // Retirer la classe 'blurred' de la section principale
    document.querySelector('.section-article').classList.remove('blurred');
};