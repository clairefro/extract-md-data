import path from 'path';
import extract from '..';

const opts = {
  omitContent: true
};

describe('Config: options.omitContent', () => {
  const rootDir = path.resolve(__dirname);
  const srcDir = path.resolve(rootDir, 'markdowns');

  const jsonsWithConfig = extract(rootDir, srcDir, opts);

  it('Returns objects of expected format', () => {
    expect(jsonsWithConfig.every((j) => !j.content)).toBe(true);
  });
});
