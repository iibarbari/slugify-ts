import { timestamp } from './lib/timestamp.js';
import { substitute } from './lib/substitute.js';
import { substituteLanguage } from './lib/substituteLanguage.js';
import type { SlugifyOptions } from './@types/index.js';
import unidecode from 'unidecode';
import { smartTruncate } from './lib/smartTruncate.js';

const defaultOptions: SlugifyOptions = {
  customSubstitutions: {},
  charSubstitutions: {},
  maxLength: 0,
  enableSmartTruncate: true,
  lowercase: true,
  appendTimestamp: false,
};

function slugify(slug: string, params?: SlugifyOptions): string {
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
  slug = substituteLanguage({ str: slug, language });

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

export default slugify;
