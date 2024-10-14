import { timestamp } from './lib/timestamp.ts';
import { substitute } from './lib/substitute.ts';
import { substituteLanguage } from './lib/substituteLanguage.ts';
import type { Substitution, SupportedLanguages } from './types';
import { smartTruncate } from './lib/smartTruncate.ts';
import unidecode from 'unidecode';

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

const defaultOptions: SlugifyOptions = {
  customSubstitutions: {},
  charSubstitutions: {},
  maxLength: 0,
  enableSmartTruncate: true,
  lowercase: true,
  appendTimestamp: false,
};

export function slugify(slug: string, params?: SlugifyOptions): string {
  const {
    appendTimestamp,
    charSubstitutions,
    customSubstitutions,
    language = "en",
    enableSmartTruncate,
    lowercase,
    maxLength = 0
  } = { ...defaultOptions, ...params };

  // Trim
  slug = slug.trim();

  // Apply custom substitutions
  if (customSubstitutions) {
    slug = substitute({ str: slug, substitutions: customSubstitutions });
  }

  // Apply character substitutions
  if (charSubstitutions) {
    slug = substitute({ str: slug, substitutions: charSubstitutions });
  }

  // Apply language substitutions
  slug = substituteLanguage({ str: slug, language});

  // Unidecode
  slug = unidecode(slug);

  // Lowercase
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Simple truncate
  if (!enableSmartTruncate && maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
  }

  // Regex patterns for unwanted characters and multiple dashes
  const regexpNonAuthorizedChars = /[^a-zA-Z0-9-_]/g;
  const regexpMultipleDashes = /-+/g;

  // Remove non-authorized characters and replace multiple dashes
  slug = slug.replace(regexpNonAuthorizedChars, "-");
  slug = slug.replace(regexpMultipleDashes, "-");

  // Remove leading/trailing dashes
  slug = slug.replace(/^[-_]+|[-_]+$/g, "");

  // Smart truncate
  if (enableSmartTruncate && maxLength > 0) {
    slug = smartTruncate(slug, maxLength);
  }

  // Add timestamp
  if (appendTimestamp) {
    slug = `${slug}-${timestamp()}`;
  }

  return slug;
}
