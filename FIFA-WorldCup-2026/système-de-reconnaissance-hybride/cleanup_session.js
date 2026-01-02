// ===================================================
// SCRIPT DE NETTOYAGE COMPLET - À EXÉCUTER DANS LA CONSOLE DU NAVIGATEUR (F12)
// ===================================================

console.log(" NETTOYAGE COMPLET DE LA SESSION");
console.log("================================");

// 1. Nettoyer TOUT le local storage
localStorage.clear();
console.log("✅ localStorage vidé");

// 2. Nettoyer TOUT le session storage
sessionStorage.clear();
console.log("✅ sessionStorage vidé");

// 3. Afficher confirmation
console.log("✅ NETTOYAGE TERMINÉ!");
console.log("");
console.log("MAINTENANT:");
console.log("1. Fermez cet onglet complètement");
console.log("2. Ouvrez un NOUVEL onglet");
console.log("3. Allez sur http://localhost:3000");
console.log("4. Connectez-vous avec: chaimaa.ops@wc2026.com / Wc2026@Demo!");
console.log("5. Complétez l'OTP quand demandé");
console.log("");
console.log("Repository: À exécuter maintenant!");

// Forcer le rechargement après 2 secondes
setTimeout(() => {
    console.log(">>> Rechargement automatique dans 2 secondes...");
    setTimeout(() => {
        window.location.href = '/login';
    }, 2000);
}, 1000);
