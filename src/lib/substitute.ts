import type { Substitution } from '../@types/index.js';

type SlugifyOptions = {
  str: string
  substitutions: Substitution;
}

export function substitute({ str, substitutions }: SlugifyOptions): string {
  let result = str;
  const keys = Object.keys(substitutions).sort();

  for (const key of keys) {
    const regex = new RegExp(key, 'g');

    result = result.replace(regex, substitutions[key]);
  }

  return result;
}
