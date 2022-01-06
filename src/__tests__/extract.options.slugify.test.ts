import path from 'path';
import extract from '..';

const removed = new RegExp('m');

const opts = {
  slugify: {
    remove: removed
  }
};

describe('Config: options.slugify', () => {
  const rootDir = path.resolve(__dirname);
  const srcDir = path.resolve(rootDir, 'markdowns');

  const jsonsWithConfig = extract(rootDir, srcDir, opts);

  it('Returns objects of expected format', () => {
    expect(jsonsWithConfig.every((j) => !j.slug.match(removed))).toBe(true);
  });
});
