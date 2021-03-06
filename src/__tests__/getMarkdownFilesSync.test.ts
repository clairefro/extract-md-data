import path from 'path';
import { getMarkdownFilepathsSync } from '../lib/files';

describe('getMarkdownFilepathsSync()', () => {
  const dir = path.resolve(__dirname, 'markdowns');
  const files = getMarkdownFilepathsSync(dir);

  it('Gets all markdown filepaths in dir', () => {
    expect(files).toHaveLength(10); // hard coding - change this if number of test markdowns changes
  });

  it('Only gets markdown files', () => {
    const allFilesAreMd = files.every((f) => /((\.md)|(\.markdown))$/.test(f));
    expect(allFilesAreMd).toBe(true);
  });
});
