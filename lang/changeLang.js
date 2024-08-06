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
    setCookie('selectedLanguage', lang)
    loadTranslations(lang).then(translations => {
        document.documentElement.lang = lang;
        updatePageContent(translations);
    });
}


function setCookie(name, value, samesite="Lax", maxage=2678400, path='/'){
    document.cookie = `${name}=${value}; SameSite=${samesite}; Max-Age=${maxage}; path=${path}`;
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
document.addEventListener('DOMContentLoaded', (event) => {
    const selectedLanguage = getCookie('selectedLanguage');
    if (selectedLanguage) {
        switchLanguage(selectedLanguage);
    }
});
