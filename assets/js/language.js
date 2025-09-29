/*
==============================================
NOXUS AI - Language Switching
==============================================
*/

document.addEventListener('DOMContentLoaded', function() {
    // Language Switcher
    const languageBtns = document.querySelectorAll('.language-btn');
    const htmlTag = document.querySelector('html');
    
    // Elements with translatable content
    const translatableElements = document.querySelectorAll('[data-en], [data-ar]');
    
    // Form placeholders
    const formInputs = document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder]');
    
    // Initialize language (default: English)
    let currentLanguage = 'en';
    
    // Check if language preference is stored in localStorage
    const storedLanguage = localStorage.getItem('noxus-language');
    if (storedLanguage) {
        currentLanguage = storedLanguage;
        setLanguage(currentLanguage);
    }
    
    // Language button click event
    languageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const language = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            languageBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set language
            setLanguage(language);
            
            // Store language preference in localStorage
            localStorage.setItem('noxus-language', language);
        });
    });
    
    // Set language function
    function setLanguage(language) {
        currentLanguage = language;
        
        // Set HTML direction attribute
        if (language === 'ar') {
            htmlTag.setAttribute('dir', 'rtl');
        } else {
            htmlTag.setAttribute('dir', 'ltr');
        }
        
        // Update active button
        languageBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === language) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update translatable elements
        translatableElements.forEach(element => {
            const translatedText = element.getAttribute(`data-${language}`);
            if (translatedText) {
                element.textContent = translatedText;
            }
        });
        
        // Update form placeholders
        formInputs.forEach(input => {
            const translatedPlaceholder = input.getAttribute(`data-${language}-placeholder`);
            if (translatedPlaceholder) {
                input.setAttribute('placeholder', translatedPlaceholder);
            }
        });
    }
});
