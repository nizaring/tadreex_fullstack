import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    // Mettre à jour la langue sélectionnée en fonction de la langue actuelle de i18n
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const handleChange = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <select
      className="bg-gray-100 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
      value={selectedLanguage}
      onChange={handleChange}
    >
      <option value="en" className="text-gray-600">
        English
      </option>
      <option value="fr" className="text-gray-600">
        Français
      </option>
    </select>
  );
}

export default LanguageSelector;
