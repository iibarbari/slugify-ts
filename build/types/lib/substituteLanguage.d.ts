import type { SupportedLanguages } from '../types';
type SubstituteLanguageOptions = {
    str: string;
    language?: SupportedLanguages;
};
export declare function substituteLanguage({ str, language }: SubstituteLanguageOptions): string;
export {};
