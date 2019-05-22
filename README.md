# TAoCP chapter 2.2.3 exercise 7 [![Build Status](https://secure.travis-ci.org/masak/taocp-invert-linked-list.svg?branch=master)](http://travis-ci.org/masak/taocp-invert-linked-list)

Reversing a linked list!

## Setup

```sh
$ npm install
```

## Run the tests, the linter, and prettier

```sh
$ npm test
$ npm run lint
$ npm run prettier
```

It's also recommended that you run `prettier` as a pre-commit hook. Save this script
as `.git/hooks/pre-commit` and give it execute permission:

```sh
#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACM "*.ts" | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files
echo "$FILES" | xargs ./node_modules/.bin/prettier --write

# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add

exit 0
```
