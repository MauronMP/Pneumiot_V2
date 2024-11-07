// Function to dynamically import all translation files from the 'translations' folder
function importAll(r) {
  const translations = {};

  // Loop through all the files found by require.context()
  r.keys().forEach((key) => {
    const fileContent = r(key); // Load the content of the JSON file
    const fileName = key.replace('./', '').replace('.json', ''); // Get the file name (e.g., 'addworker')

    // The file should already contain 'en' and 'es' keys, so we combine it into the translations object
    Object.keys(fileContent).forEach((lang) => {
      if (!translations[lang]) {
        translations[lang] = {}; // Initialize language object if it doesn't exist
      }
      translations[lang][fileName] = fileContent[lang]; // Merge translations for each language
    });
  });

  return translations;  // Return the translations object containing all namespaces and languages
}

// Use require.context to import all JSON files in the translations folder (without subfolders)
const translations = importAll(require.context('./translations', false, /\.json$/));  // false = don't include subdirectories

export default translations;  // Export the translations object to be used by i18next
