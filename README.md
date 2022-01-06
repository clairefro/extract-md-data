[![npm version](https://badge.fury.io/js/extract-md-data.svg)](https://badge.fury.io/js/extract-md-data)

# extract-md-data

A util for getting data and metadata for all markdown files in a given dir. Useful for building static site generators.

## Usage

Given this example file structure:

```
.
└── src
    ├── docs
    │   ├── Day-One.md
    │   ├── Day-Two.md
    │   └── not-markdown.txt
    └── index.js
```

`Day-One.md`

```md
---
title: day one
tags:
  - foo
  - bar
---

# On the first day

God created markdown
```

`Day-Two.md`

```md
---
title: day two
tags:
  - baz
  - pistachio
---

# On the second day

God created another markdown
```

To get JSON data for all the markdown files in `docs` folder:

```js
// index.js

const extract = require('extract-md-data');
const path = require('path');

/* Define project rootDir and srcDir where the markdown files live */
const rootDir = path.resolve(__dirname);
const srcDir = path.resolve(rootDir, 'docs');

const jsons = extract(rootDir, srcDir);

console.log(jsons);
```

```json
[
  {
    "fm": {
      "title": "day one",
      "tags": ["foo", "bar"]
    },
    "content": "\n# On the first day\n\nGod created markdown\n",
    "relativePath": "docs/Day-One.md",
    "relativeDir": "docs",
    "filename": "Day-One.md",
    "slug": "day-one",
    "id": "be308ccd-71e6-5339-97d9-947670d116ba"
  },
  {
    "fm": {
      "title": "day two",
      "tags": ["baz", "pistachio"]
    },
    "content": "\n# On the second day\n\nGod created another markdown\n",
    "relativePath": "docs/Day-Two.md",
    "relativeDir": "docs",
    "filename": "Day-Two.md",
    "slug": "day-two",
    "id": "c115a245-d83c-5a8e-9d61-2bb40c05afdb"
  }
]
```

This data can be used with templating libraries like [`pug`](https://pugjs.org/) or [`handlebars`](https://handlebarsjs.com/) to build out static websites based off the markdown files.

You can make your own routing logic - perhaps you want to leverage `relativeDir`? Up to you!

## Features

- gets data for all files in `srcDir` with `.md` and `.markdown` extensions, recursively
- ignores non-markdown files
- extracts any custom yaml frontmatter into an object `fm`
- extracts `relativeDir` for use with file-based routing
- generates a unique `id` for each file by hashing the `relativePath`
- generates a url-safe `slug` for each file based on the `filename`

## Config

You can optionally pass a config object as a third argument.

```js
const jsons = extract(rootDir, srcDir, opts);
```

### `options.slugify`

Options for `slugify`. [See available settings](https://github.com/simov/slugify#options). These are the default settings:

```js
{
  slugify: {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
  }
}
```

### `options.omitContent`

Boolean indicating whether or not to return markdown body `content`. You can set this to `true` if you don't need the markdown bodies from the files and want to save memory. Defaults to `false`

```js
{
  // omits markdown body in returned objects
  omitContent: true;
}
```

## Development

### Install

`npm install`

### Testing

`npm run test`
