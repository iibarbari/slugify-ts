import unidecode from 'unidecode';

function timestamp() {
  return Math.floor(Date.now() / 1e3).toString();
}

function substitute({ str, substitutions }) {
  let result = str;
  const keys = Object.keys(substitutions).sort();
  for (const key of keys) {
    const regex = new RegExp(key, "g");
    result = result.replace(regex, substitutions[key]);
  }
  return result;
}

const defaultCharSub = {
  '"': "",
  "'": "",
  "\u2019": "",
  "\u2012": "-",
  "\u2013": "-",
  "\u2014": "-",
  "\u2015": "-"
};
const enCharSub = {
  "&": "and",
  "@": "at"
};
const deCharSub = {
  "&": "und",
  "@": "an",
  "\xE4": "ae",
  "\xC4": "Ae",
  "\xF6": "oe",
  "\xD6": "Oe",
  "\xFC": "ue",
  "\xDC": "Ue",
  "\xDF": "ss"
};
const trCharSub = {
  "&": "ve",
  "@": "et",
  "\xC7": "C",
  "\xD6": "O",
  "\xDC": "U",
  "\xE7": "c",
  "\xF6": "o",
  "\xFC": "u",
  "\u011E": "G",
  "\u011F": "g",
  "\u0130": "I",
  "\u0131": "i",
  "\u015E": "S",
  "\u015F": "s"
};

function substituteLanguage({ str, language = "en" }) {
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

function smartTruncate(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  for (let i = maxLength; i >= 0; i--) {
    if (str[i] === " " || str[i] === "-") {
      return str.substring(0, i);
    }
  }
  return str.substring(0, maxLength);
}

const defaultOptions = {
  customSubstitutions: {},
  charSubstitutions: {},
  maxLength: 0,
  enableSmartTruncate: true,
  lowercase: true,
  appendTimestamp: false
};
function slugify(slug, params) {
  const {
    appendTimestamp,
    charSubstitutions,
    customSubstitutions,
    language = "en",
    enableSmartTruncate,
    lowercase,
    maxLength = 0
  } = { ...defaultOptions, ...params };
  slug = slug.trim();
  if (customSubstitutions) {
    slug = substitute({ str: slug, substitutions: customSubstitutions });
  }
  if (charSubstitutions) {
    slug = substitute({ str: slug, substitutions: charSubstitutions });
  }
  slug = substituteLanguage({ str: slug, language });
  slug = unidecode(slug);
  if (lowercase) {
    slug = slug.toLowerCase();
  }
  if (!enableSmartTruncate && maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
  }
  const regexpNonAuthorizedChars = /[^a-zA-Z0-9-_]/g;
  const regexpMultipleDashes = /-+/g;
  slug = slug.replace(regexpNonAuthorizedChars, "-");
  slug = slug.replace(regexpMultipleDashes, "-");
  slug = slug.replace(/^[-_]+|[-_]+$/g, "");
  if (enableSmartTruncate && maxLength > 0) {
    slug = smartTruncate(slug, maxLength);
  }
  if (appendTimestamp) {
    slug = `${slug}-${timestamp()}`;
  }
  return slug;
}

export { slugify as default };
//# sourceMappingURL=index.js.map
