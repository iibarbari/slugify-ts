import type { Substitution, SupportedLanguages } from './types';
type SlugifyOptions = {
    customSubstitutions?: Substitution;
    charSubstitutions?: Substitution;
    language?: SupportedLanguages;
    maxLength?: number;
    enableSmartTruncate?: boolean;
    lowercase?: boolean;
    appendTimestamp?: boolean;
};
export declare function slugify(slug: string, params?: SlugifyOptions): string;
export {};
