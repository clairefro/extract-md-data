import path from 'path';
import { getMarkdownFilepathsSync } from '../lib/files';
import extract from '../';

let testMarkdownFilepaths: string[];

beforeAll(() => {
  const dir = path.resolve(__dirname, 'markdowns');
  testMarkdownFilepaths = getMarkdownFilepathsSync(dir);
});

describe('extract()', () => {
  const rootDir = path.resolve(__dirname);
  const srcDir = path.resolve(rootDir, 'markdowns');

  const jsons = extract(rootDir, srcDir);

  it('Returns objects of expected format', () => {
    // deep dive jsons[0]
    expect(jsons[0].content).toMatch(
      '\n# On the first day\n\nGod created markdown\n'
    );
    expect(jsons[0].relativePath).toMatch('markdowns/flat/md1.md');
    expect(jsons[0].relativeDir).toMatch('markdowns/flat');
    expect(jsons[0].slug).toMatch('md1');
    expect(jsons[0].filename).toMatch('md1.md');
    expect(jsons[0].fm).toMatchObject({
      title: 'foo1',
      tags: ['foo', 'bar']
    });

    // generic tests for the rest
    jsons.forEach((j) => {
      expect(typeof j.content).toMatch('string');
      expect(j.fm).toMatchObject({});
      expect(j.relativePath).toMatch(/((\.md)|(\.markdown))$/);
      expect(j.relativeDir).toMatch(j.relativePath.replace(/\/[^/]*$/, ''));
      expect(typeof j.slug).toMatch('string');
      expect(j.filename).toMatch(/((\.md)|(\.markdown))$/);
    });
  });

  it('Returns an object for every markdown file', () => {
    expect(jsons).toHaveLength(testMarkdownFilepaths.length);
  });
});
