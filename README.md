# TAoCP Exercises [![Build Status](https://secure.travis-ci.org/masak/taocp.svg?branch=master)](http://travis-ci.org/masak/taocp)

See [the wiki](https://github.com/masak/taocp/wiki/Tasks) for a list of tasks.

## Setting up Node and npm

The TypeScript solutions run on [Node.js](https://nodejs.org/en/).
After installing it, install the project's module dependencies.

```sh
$ npm install
```

At this point, you can run the tests, linting, and code formatting:

```sh
$ npm test
$ npm run lint
$ npm run prettier
```

It's also recommended that you set up `prettier` as a pre-commit hook.
Save this script as `.git/hooks/pre-commit` and give it execute permission:

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

## Setting up CHICKEN Scheme

The Scheme solutions have been confirmed to run on [CHICKEN Scheme 5.1.0](https://call-cc.org/).
On Debian/Ubuntu systems, it can be installed via apt:

```
sudo apt-get install chicken-bin
```

To run a script, use the `csi` binary:

```
csi -s my-script.scm
```

Or you can compile the script with `csc` and run the resulting binary:

```
csc my-script.scm
./my-script
```
