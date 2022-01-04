/** From https://github.com/simov/slugify/blob/master/slugify.d.ts */
export type SlugifyOptions =
  | {
      replacement?: string;
      remove?: RegExp;
      lower?: boolean;
      strict?: boolean;
      locale?: string;
      trim?: boolean;
    }
  | string;

export interface MdExtractConfig {
  slugify?: SlugifyOptions;
}
