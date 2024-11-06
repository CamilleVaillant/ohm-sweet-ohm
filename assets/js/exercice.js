 // script pour le text dinamique expiré inspiré

    // Varaible pour l'initialisation du texte pour l'animation de respiration    
    const textElement = document.querySelector('.text');

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



//     function updateBreathingText() {
//       // Vérifie si le texte actuel de `textElement` est "Inspirez"
//       // Si c'est le cas, il changera le texte en "Expirez"
//       // Sinon, il changera le texte en "Inspirez"
//     textElement.textContent = textElement.textContent === 'Inspirez' 
//       ? 'Expirez' // Si le texte est "Inspirez", il le remplace par "Expirez"
//       : 'Inspirez'; // Sinon, il remplace par "Inspirez"
//   }

