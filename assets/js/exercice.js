
// Activation de la popup
const stoneBtn = document.getElementById('stone_btn');
const game = document.getElementById('breath_game');
const gameClose = document.getElementById('gameClose');
const popupClose = document.getElementsByClassName('popupClose');
const sideMenu = document.getElementById('sideMenu');
const validBtn = document.getElementById('setupValidBtn');


// click bouton pour ouverture breath Game
stoneBtn.addEventListener('click', function(event) {
    event.preventDefault();
    game.style.display = "block"
});

// fermeture du setup breath game avec submit ou bouton close
function closeSetup(event) {
    event.preventDefault();
    sideMenu.classList.toggle('.collapsed');
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
});


// PARTIE EXERCICES 


// 3D rotation des card exercices
const card = document.querySelectorAll('.exercice_card');

card.forEach(card => {
    let boundingRef = null;

    // Entrée de la souris
    card.addEventListener('mouseenter',function (ev) {
        // stockage position card
        boundingRef = ev.currentTarget.getBoundingClientRect();
    });

    // Sortie de la souris
    card.addEventListener('mouseleave',function() {
        boundingRef = null;
        // 
        card.style.setProperty('--x-rotation', '0deg');
        card.style.setProperty('--y-rotation', '0deg');
    });

    card.addEventListener('mousemove', function(ev) {
        if (boundingRef) {
            const x = ev.clientX - boundingRef.left;
            const y = ev.clientY - boundingRef.top;
            const xPercentage = x / boundingRef.width;
            const yPercentage = y / boundingRef.height;
            const xRotation = (xPercentage - 0.5) * 10; // vérifier si degrés ok 
            const yRotation = (0.5 - yPercentage) * 10; // Inversion pour avoir une homogénéité d'angle

            // inversion des axes pour la 3D. Inverser permet de conserver l'effet voulu
            // Ici, on permet l'appel via des variables CSS au hover
            ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
            ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
        }
    });
});
