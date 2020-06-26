const sanitize = require('sanitize-html')

const defaultTagList = sanitize.defaults.allowedTags

const sanitizeHtml = (html) => {
  return sanitize(html, {
    allowedTags: defaultTagList.concat(['img'], ['h1'], ['h2'], ['span'], ['pre']),
    allowedAttributes: false
  })
}

module.exports = { sanitizeHtml }
