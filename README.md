# npm package starter ts

A template for creating new npm packages with typscript

### Includes

- typescript
- eslint
- prettier
- jest

## Make a new package

1. Clone this repo
1. `cd` into new repo
1. `npm i`
1. Update `package.json` `{ name }` and any other props
1. Write your code

## Publish package

1. Commit your code
1. Get an NPM account if you don't have one (`npm adduser` or [click here](https://www.npmjs.com/signup))
1. `npm login`
1. `npm publish`

## Versioning

1. `npm version patch`
1. `npm publish`

## View package on NPM

`https://npmjs.com/package/<package-name>`

## Thanks

Most of this template was derived from [this article](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c) by Carl-Johan Kihl. Thanks! Customized to use eslint instead of tslint, and custom configs.
