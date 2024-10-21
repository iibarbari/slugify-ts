import type { Substitution } from '../@types/index.js';

export const defaultCharSub: Substitution = {
  '"': "",
  '\'': "",
  '’': "",
  '‒': "-",
  '–': "-",
  '—': "-",
  '―': "-",
};

// English
export const enCharSub: Substitution = {
  '&': "and",
  '@': "at",
};

// German
export const deCharSub: Substitution = {
  '&': "und",
  '@': "an",
  'ä': "ae",
  'Ä': "Ae",
  'ö': "oe",
  'Ö': "Oe",
  'ü': "ue",
  'Ü': "Ue",
  'ß': "ss",
};

// Turkish
export const trCharSub: Substitution = {
  '&': "ve",
  '@': "et",
  'Ç': "C",
  'Ö': "O",
  'Ü': "U",
  'ç': "c",
  'ö': "o",
  'ü': "u",
  'Ğ': "G",
  'ğ': "g",
  'İ': "I",
  'ı': "i",
  'Ş': "S",
  'ş': "s",
};


