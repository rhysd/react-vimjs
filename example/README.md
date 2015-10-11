What is this?
=============

This is an example of react-vimjs.  You can edit markdown file with Vim and the text is rendered to preview panel synchronously.  The markdown text is rendered with [marked](https://github.com/chjj/marked) and code blocks are highlighted with [highlight.js](https://highlightjs.org/).

## How to Prepare

```bash
$ npm install
$ ./node_modules/.bin/browserify -t babelify -d -o index.js index.jsx
$ # And then host this directory and open with browser.
```
