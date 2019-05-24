# TAoCP Exercises [![Build Status](https://secure.travis-ci.org/masak/taocp.svg?branch=master)](http://travis-ci.org/masak/taocp)

See [the wiki](https://github.com/masak/taocp/wiki/Tasks) for a list of tasks.

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
