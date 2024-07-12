function removeEscapedCharacters(jsonString) {
    // Remplacer les caractères d'échappement spécifiques par une chaîne vide
    return jsonString.replace(/\\[nt]/g, '');
}

// Exemple d'utilisation
const rawJson = "{\n  \"Question\": \"What is the formula to calculate the force (F) acting on an object of mass (m) that is accelerating at a rate (a)?\",\n  \"A\": \"F = m * a\",\n  \"B\": \"F = m + a\",\n  \"C\": \"F = m / a\",\n  \"D\": \"F = m * a^2\",\n  \"Response\": \"A\"\n}";

const cleanedJson = removeEscapedCharacters(rawJson);
console.log(cleanedJson);
