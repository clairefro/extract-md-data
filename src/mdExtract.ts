import * as path from 'path';
import * as fs from 'fs';
import stringHash from 'string-hash';

import { getMarkdownFilepathsSync } from './lib/files';
import { parseMd } from './lib/markdown';
import { slugify } from './lib/slugify';
import { defaultConfig } from './config';
import { MdExtractConfig } from './types';

/** Extracts json data about all markdown files in a directory (srcDir), with respect to a given rootDir */
const mdExtract = (
  rootDir: string,
  srcDir: string,
  _config: MdExtractConfig = {}
) => {
  const config = { ...defaultConfig, ..._config };
  const srcDirPath = path.resolve(rootDir, srcDir);
  const mdFilepaths = getMarkdownFilepathsSync(srcDirPath);

  const jsons = mdFilepaths.map((filepath) => {
    const raw = fs.readFileSync(filepath, 'utf-8');

    /** Get frontmatter and markdown content */
    const { fm, content } = parseMd(raw);

    /** Get relative path of markdown file */
    const relativePath = path.relative(rootDir, filepath);

    /** Get id by hashing relativePath. You can't have two files with the same path ;)  */
    const id = stringHash(relativePath);

    /** Get filename of markdown file */
    const match = relativePath.match(/\/([^/]+)$/);
    if (!match) {
      throw new Error(
        `Error when parsing filename for file at path: ${filepath}`
      );
    }
    const filename = match[1];

    /** Get slug from filename */
    const filenameNoExt = filename.replace(/((\.md)|(\.markdown))$/, '');
    const slug = slugify(filenameNoExt, config.slugify);

    return { fm, content, relativePath, filename, slug, id };
  });

  return jsons;
};

export default mdExtract;
