import { createI18n } from "vue-i18n"
import en from './locales/en.json'
import fr from './locales/fr.json'

export default createI18n({
    locale: "en", // set locale
    fallbackLocale: "en", // set fallback locale
    messages:{
        en,
        fr,
    } // set locale messages ...
})