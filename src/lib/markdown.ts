import matter from 'gray-matter';

interface MarkdownData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fm: { [key: string]: any };
  content: string;
}

const parseMd = (text: string): MarkdownData => {
  const parsed = matter(text);
  const { data: fm, content } = parsed;
  return { fm, content };
};

export { parseMd };
