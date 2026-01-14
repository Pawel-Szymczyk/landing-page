const DEFAULT_LANG = "pl";
const supported = ["pl", "en"];

async function loadLanguage(lang) {
  try {
    const res = await fetch(`../scripts/i18n/${lang}.json`);
    if (!res.ok) throw new Error(`Cannot load language file: ${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = translations[key] || key;
    });

    localStorage.setItem("lang", lang);

    document.querySelectorAll(".lang-switch button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));

    document.documentElement.lang = lang;
  } catch (err) {
    console.error(err);
  }
}

document.querySelectorAll(".lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => {
    loadLanguage(btn.dataset.lang);
  });
});

const browserLang = navigator.language.slice(0, 2);
const initialLang = localStorage.getItem("lang") || (supported.includes(browserLang) ? browserLang : DEFAULT_LANG);

loadLanguage(initialLang);
