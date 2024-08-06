async function loadTranslations(lang) {
    try {
        let response = await fetch(`lang/${lang}.json`);
        let translations = await response.json();
        return translations;
    } catch (error) {
        console.error("Translate error:", error);
        return {};
    }
}

function updatePageContent(translations) {
    var elements = document.querySelectorAll('[data-lang]');
    elements.forEach(function(element) {
        element.textContent = translations[element.dataset.lang];
        
    });
}

function switchLanguage(lang) {
    document.cookie = `selectedLanguage=${lang}; SameSite=Lax; Max-Age=2678400; path=/`;
    loadTranslations(lang).then(translations => {
        document.documentElement.lang = lang;
        updatePageContent(translations);
    });
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener('DOMContentLoaded', (event) => {
    const selectedLanguage = getCookie('selectedLanguage');
    if (selectedLanguage) {
        switchLanguage(selectedLanguage);
    }
});
