import { MdExtractConfig } from './types';

/** Default config for mdExtract */
export const defaultConfig: MdExtractConfig = {
  slugify: {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
  }
};
