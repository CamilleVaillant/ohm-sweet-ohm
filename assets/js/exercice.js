

    // Varaible pour l'initialisation du texte pour l'animation de respiration    
    const textElement = document.querySelector('.text');


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

// Gestion de la popup

const popup = document.getElementById('popup');



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
            const xRotation = (xPercentage - 0.5) * 20;
            const yRotation = (0.5 - yPercentage) * 20; // Inverstion pour avoir une homogénéité d'angle

            // inversion des axes pour la 3D. Inverser permet de conserver l'effet voulu
            // Ici, on permet l'appel via des variables CSS au hover
            ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
            ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
        }
    });
});




// script pour le text dinamique expiré inspiré

//     function updateBreathingText() {
//       // Vérifie si le texte actuel de `textElement` est "Inspirez"
//       // Si c'est le cas, il changera le texte en "Expirez"
//       // Sinon, il changera le texte en "Inspirez"
//     textElement.textContent = textElement.textContent === 'Inspirez' 
//       ? 'Expirez' // Si le texte est "Inspirez", il le remplace par "Expirez"
//       : 'Inspirez'; // Sinon, il remplace par "Inspirez"
//   }

