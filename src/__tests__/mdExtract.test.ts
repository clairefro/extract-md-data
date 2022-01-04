import * as path from 'path';
import { getMarkdownFilepathsSync } from '../lib/files';
import mdExtract from '../mdExtract';

let testMarkdownFilepaths;

beforeAll(() => {
  const dir = path.resolve(__dirname, 'markdowns');
  testMarkdownFilepaths = getMarkdownFilepathsSync(dir);
});

describe('mdExtract()', () => {
  const rootDir = path.resolve(__dirname, 'markdowns');
  const relSrcDir = '.'; // srcDir is root dir in test

  const jsons = mdExtract(rootDir, relSrcDir);

  it('Returns objects of expected format', () => {
    expect(typeof jsons[0].content).toMatch('string');
    expect(typeof jsons[0].fm.title).toMatch('string');
    expect(typeof jsons[0].relativePath).toMatch('string');
    expect(typeof jsons[0].slug).toMatch('string');
    expect(typeof jsons[0].filename).toMatch('string');
    expect(Array.isArray(jsons[0].fm.tags)).toBe(true);
  });

  it('Returns an object for every markdown file', () => {
    expect(jsons).toHaveLength(testMarkdownFilepaths.length);
  });
});
