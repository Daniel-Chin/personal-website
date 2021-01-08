const { readFileSync, writeFileSync } = require('fs');
var hljs = require('highlight.js');
const md = require('markdown-it')({
  html: true, 
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }, 
});

const src = readFileSync('md_js_in.md', {encoding: 'utf-8'});
const body = md.render(src);
writeFileSync('md_js_out.body', body, {encoding: 'utf-8'});
