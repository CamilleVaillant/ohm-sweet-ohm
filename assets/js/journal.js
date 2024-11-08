document.addEventListener("DOMContentLoaded", function() {
    // Récupérer les données au chargement de la page
    loadJournalData();

    // Sauvegarder les données au clic
    document.querySelectorAll("textarea, input[type='checkbox']").forEach(input => {
        input.addEventListener("change", saveJournalData);
    });
});

function saveJournalData() {
    const journalData = {
        date: document.getElementById("Date").value,
        happyTime: document.getElementById("happy-time-content").value,
        dayWord: document.getElementById("day-word-content").value,
        morningThink: document.getElementById("morning-think-content").value,
        grateful: document.getElementById("grateful-content").value,
        problem: document.getElementById("problem-content").value,
        resolve: document.getElementById("resolve-content").value,
        personalImprovement: document.getElementById("personal-improvement-content").value,
        tomorrow: document.getElementById("tomorrow-content").value,
        eveningThink: document.getElementById("evening-think-content").value,
        feelings: {
            calm: document.getElementById("calm").checked,
            triste: document.getElementById("triste").checked,
            apaisé: document.getElementById("apaisé").checked,
            enColere: document.getElementById("en colere").checked,
            soulagé: document.getElementById("soulagé").checked,
            stressé: document.getElementById("stressé").checked,
            heureux: document.getElementById("heureux").checked,
            fatigué: document.getElementById("fatigué").checked,
            détendue: document.getElementById("détendue").checked,
            anxieu: document.getElementById("anxieu").checked
        }
    };

    // Enregistrer dans le Local Storage
    localStorage.setItem("journalData", JSON.stringify(journalData));
}

function loadJournalData() {
    const savedData = JSON.parse(localStorage.getItem("journalData"));
    if (!savedData) return;

    document.getElementById("Date").value = savedData.date || "";
    document.getElementById("happy-time-content").value = savedData.happyTime || "";
    document.getElementById("day-word-content").value = savedData.dayWord || "";
    document.getElementById("morning-think-content").value = savedData.morningThink || "";
    document.getElementById("grateful-content").value = savedData.grateful || "";
    document.getElementById("problem-content").value = savedData.problem || "";
    document.getElementById("resolve-content").value = savedData.resolve || "";
    document.getElementById("personal-improvement-content").value = savedData.personalImprovement || "";
    document.getElementById("tomorrow-content").value = savedData.tomorrow || "";
    document.getElementById("evening-think-content").value = savedData.eveningThink || "";

    // Charger l'état des cases à cocher
    document.getElementById("calm").checked = savedData.feelings.calm || false;
    document.getElementById("triste").checked = savedData.feelings.triste || false;
    document.getElementById("apaisé").checked = savedData.feelings.apaisé || false;
    document.getElementById("en colere").checked = savedData.feelings.enColere || false;
    document.getElementById("soulagé").checked = savedData.feelings.soulagé || false;
    document.getElementById("stressé").checked = savedData.feelings.stressé || false;
    document.getElementById("heureux").checked = savedData.feelings.heureux || false;
    document.getElementById("fatigué").checked = savedData.feelings.fatigué || false;
    document.getElementById("détendue").checked = savedData.feelings.détendue || false;
    document.getElementById("anxieu").checked = savedData.feelings.anxieu || false;
}
