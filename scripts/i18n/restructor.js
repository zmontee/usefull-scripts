const fs = require('fs');

const translations = require('./site.json');

const languages = ['uk', 'ru', 'en'];

languages.forEach(language => {
  const translationsForLanguage = {};

  for (const key in translations) {
    const parts = key.split('.');
    let currentObject = translationsForLanguage;

    for (let i = 0; i < parts.length; i++) {
      // Check for existence and create object if necessary at any level
      currentObject[parts[i]] = currentObject[parts[i]] || {};
      currentObject = currentObject[parts[i]];
    }

    // Set the translation value at the final level
    currentObject[parts[parts.length - 1]] = translations[key][language];
  }

  fs.writeFile(`./${language}.json`, JSON.stringify(translationsForLanguage, null, 2), err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Файл ${language}.json успішно створено!`);
    }
  });
});
