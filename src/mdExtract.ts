import * as path from 'path';
import * as fs from 'fs';

import { getMarkdownFilepathsSync } from './lib/files';
import { parseMd } from './lib/markdown';

interface MdExtractConfig {
  slug?: {
    /** TODO: slugify config opts */
  };
}

/** Extracts json data about all markdown files in a directory (relSrcDir), relative to specfied rootDir */
const mdExtract = (
  rootDir: string,
  relSrcDir: string,
  config: MdExtractConfig = {}
) => {
  // get files
  // for each file
  // // extract json
  // // build relPath
  // // build slug
  // // make an id that is hash of relPath + slug
  // build relPaths, slugs,
  const srcDirPath = path.join(rootDir, relSrcDir);
  const mdFilepaths = getMarkdownFilepathsSync(srcDirPath);

  const jsons = mdFilepaths.map((filepath) => {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const { fm, content } = parseMd(raw);

    // const relPath = filepath.replace(new RegExp(`^${appDir}/`), '');
    // const prettyUrl = getPrettyUrl(relPath);
    // const rawUrl = getRawUrl(relPath);
    // const id = [getRepo(), relPath].join('/');
    // const slug = slugify(`${fm.author}-${fm.title}`, {
    //   replacement: '-', // replace spaces with replacement character, defaults to `-`
    //   remove: /[*+~.()'"!:@$%^()]/g, // remove characters that match regex, defaults to `undefined`
    //   lower: true, // convert to lower case, defaults to `false`
    //   strict: true, // strip special characters except replacement, defaults to `false`
    //   trim: true // trim leading and trailing replacement chars, defaults to `true`
    // });

    return { fm, content, filepath };
  });
  return jsons;
};
export { mdExtract };
