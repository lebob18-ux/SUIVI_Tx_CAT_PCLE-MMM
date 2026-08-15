// Fonction appelée lors de la validation du nom de l'agent
function validerIdentitePopup() {
    const inputNom = document.getElementById('identiteNomInput');
    if (!inputNom) return;

    const nom = inputNom.value.trim().toUpperCase();
    if (!nom) {
        alert("Veuillez entrer un nom valide.");
        return;
    }

    // Sauvegarde locale
    localStorage.setItem('nomRedacteur', nom);
    
    // Fermeture de la modale d'identité si elle existe
    const modal = document.getElementById('divIdentiteModal');
    if (modal) modal.style.display = 'none';

    // Remplissage automatique du champ rédacteur dans le formulaire si présent
    const champRedacteur = document.getElementById('nomRedacteur');
    if (champRedacteur) champRedacteur.value = nom;

    // Règle spécifique : Si le nom contient LAVIGNON -> Onglet Récap, sinon Saisie
    if (nom.includes("LAVIGNON")) {
        if (typeof ouvrirOnglet === 'function') {
            ouvrirOnglet('recap');
        }
    } else {
        if (typeof ouvrirOnglet === 'function') {
            ouvrirOnglet('fbm');
        }
    }
}

// Vérification automatique au chargement de la page si un nom est déjà mémorisé
window.addEventListener('DOMContentLoaded', () => {
    const nomEnregistre = (localStorage.getItem('nomRedacteur') || "").toUpperCase();
    
    if (nomEnregistre) {
        const champRedacteur = document.getElementById('nomRedacteur');
        if (champRedacteur) champRedacteur.value = nomEnregistre;

        // Redirection automatique selon le nom stocké
        if (nomEnregistre.includes("LAVIGNON")) {
            if (typeof ouvrirOnglet === 'function') ouvrirOnglet('recap');
        } else {
            if (typeof ouvrirOnglet === 'function') ouvrirOnglet('fbm');
        }
    } else {
        // Si aucun nom n'est connu, on affiche la modale d'identification
        const modal = document.getElementById('divIdentiteModal');
        if (modal) modal.style.display = 'flex';
    }
});