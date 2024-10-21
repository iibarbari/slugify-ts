import { substitute } from './substitute.js';
import { deCharSub, defaultCharSub, enCharSub, trCharSub } from '../data/languageSubstitutions.js';
import type { SubstituteLanguageOptions } from '../@types/index.js';

export function substituteLanguage({ str, language = "en" }: SubstituteLanguageOptions): string {
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
