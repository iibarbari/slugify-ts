import { substitute } from './substitute.ts';
import { deCharSub, defaultCharSub, enCharSub, trCharSub } from '../data/languageSubstitutions.ts';
import type { SupportedLanguages } from '../types';

type SubstituteLanguageOptions = {
  str: string;
  language?: SupportedLanguages;
}

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
