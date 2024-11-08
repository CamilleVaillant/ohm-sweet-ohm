// menu burgeur

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        burger.classList.toggle("toggle");
    });
});

// Activation de la popup
const stoneBtn = document.getElementById('stone_btn');
const game = document.getElementById('breath_game');
const gameClose = document.getElementById('gameClose');
const popupClose = document.getElementsByClassName('popupClose');
const sideMenu = document.getElementById('sideMenu');
const validBtn = document.getElementById('setupValidBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicCheckbox = document.getElementById('music');
const vocalCheckbox = document.getElementById('vocal');
const backgroundChoice = document.getElementById('backgroundChoice');
const musicChoice = document.getElementById('musicChoice');


stoneBtn.addEventListener('click', function(event) {
    event.preventDefault();
    game.style.display = "block"
});

// Gestion du choix de l'arrière-plan
backgroundChoice.addEventListener('change', function() {
    const selectedBackground = backgroundChoice.value;
    game.style.backgroundImage = `url('assets/img/${selectedBackground}')`;
});

// Gestion du choix de la musique
musicChoice.addEventListener('change', function() {
    const selectedMusic = musicChoice.value;
    backgroundMusic.src = `assets/audio/${selectedMusic}`;
    backgroundMusic.play();
    if (selectedMusic === 'rouge.mp3') {
        game.style.opacity = 0;
        game.style.backgroundImage = "url('assets/img/woman.jpg')";
        
        requestAnimationFrame(() => {
            game.style.transition = 'opacity 10s ease-in-out';
            game.style.opacity = 1;
        });
    } else {
        // Pour les autres cas, l'image de fond change directement
        game.style.backgroundImage = `url('assets/img/${selectedBackground}')`;
    }
});

// fermeture du setup breath game avec submit ou bouton close
function closeSetup(event) {
    event.preventDefault();
    sideMenu.classList.toggle('collapsed');
}
for (let closePopupBtn of popupClose) {
    closePopupBtn.onclick = closeSetup;
}

// popupClose.addEventListener('click', function(event) {
//     event.preventDefault();
//     sideMenu.classList.toggle('collapsed');
// });

// Validation formulaire pour valider les paramètres du breath game
document.getElementById('setupBreath').addEventListener('submit', function(event) {
    const timeInput = document.getElementById('time');
        const timeError = document.getElementById('timeError');

    if(!timeInput.value || timeInput.value <=0) {
        // ou alors placeholder.textContent ?????
        timeError.textContent = "Veuillez entrer un temps valide en minutes";
        timeError.style.display = "block";

        event.preventDefault();
    } else {
        timeError.style.display = "none";
    }

});


// script pour le text dynamique expirer inspirer
// Varaible pour l'initialisation du texte pour l'animation de respiration    
const textElement = document.querySelector('.text');

    function updateBreathingText() {
      // Vérifie si le texte actuel de `textElement` est "Inspirez"
      // Si c'est le cas, il changera le texte en "Expirez"
      // Sinon, il changera le texte en "Inspirez"
    textElement.textContent = textElement.textContent === 'Inspirez' 
      ? 'Expirez' // Si le texte est "Inspirez", il le remplace par "Expirez"
      : 'Inspirez'; // Sinon, il remplace par "Inspirez"
  }


  // Fermeture du breath game 

gameClose.addEventListener('click', function(event) {
    event.preventDefault();
    game.style.display = "none";
    // stop musique et voix + reset
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    voiceOver.pause();
    voiceOver.currentTime = 0;
});



// PARTIE EXERCICES 

// Fonction pour récupérer le jour actuel en français
function getCurrentDay() {
    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const today = new Date().getDay();
    return days[today];
}

// Fonction pour afficher les exercices pour un jour donné
function loadExercices(day, exercicesData) {
    const exercices = exercicesData[day];
    const cards = document.querySelectorAll(".exercice_card");

    if (!exercices) {
        console.error(`Aucun exercice trouvé pour le jour : ${day}`);
        return;
    }

    cards.forEach((card, index) => {
        if (exercices[index]) {
            const video = exercices[index].youtube;
            const title = exercices[index].title;
            const description = exercices[index].description;

            card.querySelector("iframe").src = video + "?autoplay=0";
            card.querySelector(".EC_title").textContent = title;
            card.querySelector(".EC_text_content").textContent = description;
        }
    });
}

// Fonction pour charger les données JSON
function fetchExercicesData(day) {
    fetch('json/exercice.json')  
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loadExercices(day, data);

            // Ajout de l'événement de clic pour chaque jour du calendrier
            document.querySelectorAll("#calendar li a").forEach(link => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const selectedDay = link.getAttribute("data-day");
                    if (data[selectedDay]) {
                        loadExercices(selectedDay, data);
                    }
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement des exercices:', error));
}

// Initialisation : charger les exercices du jour actuel
document.addEventListener("DOMContentLoaded", () => {
    const today = getCurrentDay();
    fetchExercicesData(today);
});

// Script de rotation 3D des cartes
const cards = document.querySelectorAll('.exercice_card');

cards.forEach(card => {
    let boundingRef = null;

    // Entrée de la souris
    card.addEventListener('mouseenter', function (ev) {
        boundingRef = ev.currentTarget.getBoundingClientRect();
    });

    // Sortie de la souris
    card.addEventListener('mouseleave', function () {
        boundingRef = null;
        card.style.setProperty('--x-rotation', '0deg');
        card.style.setProperty('--y-rotation', '0deg');
    });

    // Mouvement de la souris
    card.addEventListener('mousemove', function (ev) {
        if (boundingRef) {
            const x = ev.clientX - boundingRef.left;
            const y = ev.clientY - boundingRef.top;
            const xPercentage = x / boundingRef.width;
            const yPercentage = y / boundingRef.height;
            const xRotation = (xPercentage - 0.5) * 10;
            const yRotation = (0.5 - yPercentage) * 10;

            ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
            ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
        }
    });
});
