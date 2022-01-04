import { ExtractConfig } from './types';

/** Default config for mdExtract */
export const defaultConfig: ExtractConfig = {
  slugify: {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
  }
};
