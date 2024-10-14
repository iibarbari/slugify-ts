# slugify

**slugify** is a customizable TypeScript function that transforms any string into a URL-friendly slug. It handles:

- Removing unwanted characters.
- Transliteration of Unicode characters (e.g., `ü`, `é`, `ñ`) into their closest ASCII equivalents (e.g., `ue`, `e`, `n`).
- Optional truncation, with smart truncation to avoid cutting off words awkwardly.
- Emoji handling: you can either remove emojis or replace them with their textual descriptions.
- Timestamp appending.

## Features

- **Customizable substitutions**: Customize specific character or string replacements.
- **Unicode transliteration**: Convert Unicode characters to their closest ASCII equivalents.
- **Smart truncation**: Intelligently truncate strings at word boundaries.
- **Timestamp appending**: Optionally append a timestamp to the slug.
- **Full TypeScript support**: Includes type definitions for safety and ease of use.

## Basic usage

```typescript
import { slugify } from 'slugify-utility';

const result = slugify('Héllo Wörld!');
console.log(result);  // Output: 'hello-world'
```

## Options

You can customize the behavior of `slugify` by passing an options object as the second argument:

```typescript
type SlugifyOptions = {
  customSubstitutions?: Substitution;
  charSubstitutions?: Substitution;
  maxLength?: number;
  enableSmartTruncate?: boolean;
  lowercase?: boolean;
  appendTimestamp?: boolean;
};
```

** Example with options **

```typescript
const options: SlugifyOptions = {
  customSubstitutions: { '&': 'and' },  // Replace & with 'and'
  charSubstitutions: { 'ö': 'oe' },    // Replace ö with 'oe'
  maxLength: 20,                       // Limit the length to 20 characters
  enableSmartTruncate: true,           // Enable smart truncation
  lowercase: true,                     // Convert slug to lowercase
  appendTimestamp: true,               // Append a timestamp
};

const slug = slugify('Héllo & Wörld!', options);
console.log(slug);  // Output: 'hello-and-woerld-1635789123'
```

## Options explained

### `customSubstitutions`

Custom string replacements. For example, replace & with and, @ with at, etc.

```typescript
customSubstitutions: {
  '&': 'and',
  '@': 'at',
}
```

### `charSubstitutions`

Character-specific substitutions. For example, replace ö with oe, ü with ue.

```typescript
charSubstitutions: {
  'ö': 'oe',
  'ü': 'ue',
}
```

### `maxLength`

Limits the length of the resulting slug. If enableSmartTruncate is set to true, the string will be truncated intelligently at a word boundary. If enableSmartTruncate is set to false, truncation will occur at exactly maxLength characters. Default is 0 (no limit).

### `enableSmartTruncate`

If `true`, the slug will be truncated at a word boundary instead of in the middle of a word when maxLength is reached.

### `lowercase`

If `true`, the resulting slug will be converted to lowercase.

### `appendTimestamp`

If `true`, a timestamp will be appended to the slug.

## Further Plans

1. Add custom uniencode function: Plan to support Unicode-to-ASCII mappings more comprehensively, covering special characters and diacritics in various languages. 
1. Add better emoji support, right now it only removes emojis.
1. Add more language support
1. Add more tests


PRs are welcome!
