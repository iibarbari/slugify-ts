type Substitution = { [key: string]: string };

type SupportedLanguages = "de" | "deu" | "en" | "eng" | "tr" | "tur";

type SubstituteLanguageOptions = {
  str: string;
  language?: SupportedLanguages;
}

type SlugifyOptions = {
  // Custom substitutions for strings
  // Default: {}
  customSubstitutions?: Substitution;
  // Custom rune substitutions for individual characters
  // Default: {}
  charSubstitutions?: Substitution;
  // Language for substitutions
  language?: SupportedLanguages;
  // Max length of slug (0 means no limit)
  // Default: 0
  maxLength?: number;
  // If true, truncates intelligently
  // Default: true
  enableSmartTruncate?: boolean;
  // If true, converts slug to lowercase
  // Default: true
  lowercase?: boolean;
  // If true, appends a timestamp to the slug
  // Default: false
  appendTimestamp?: boolean;
}

declare function slugify(slug: string, params?: SlugifyOptions): string;

export { type SlugifyOptions, type SubstituteLanguageOptions, type Substitution, type SupportedLanguages, slugify as default };
