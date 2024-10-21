import { substitute } from './substitute';
import { deCharSub, defaultCharSub, enCharSub, trCharSub } from '../data/languageSubstitutions';
export function substituteLanguage({ str, language = "en" }) {
    switch (language) {
        case "de":
        case "deu":
            return substitute({ str, substitutions: { ...deCharSub, ...defaultCharSub } });
        case "en":
        case "eng":
            return substitute({ str, substitutions: { ...defaultCharSub, ...enCharSub } });
        case "tr":
        case "tur":
            return substitute({ str, substitutions: { ...defaultCharSub, ...trCharSub } });
        default:
            return substitute({ str, substitutions: { ...defaultCharSub, ...enCharSub } });
    }
}
