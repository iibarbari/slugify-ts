import type { Substitution } from '../@types/index.js';
type SlugifyOptions = {
    str: string;
    substitutions: Substitution;
};
export declare function substitute({ str, substitutions }: SlugifyOptions): string;
export {};
