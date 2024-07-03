const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss");
const path = require('path');
const Image = require('@11ty/eleventy-img');
const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(lightningCSS);
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addShortcode('image', imageShortcode);
     
  function imageShortcode(src, alt, sizes = '(max-width: 28rem)') {
    let options = {
      widths: [1200, 900, 600, 450, 280],
      formats: ['webp', 'png'],
      urlPath: '/img',
      outputDir: './public/img',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    };
    Image(src, options);

    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
    };
    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
  }
  eleventyConfig.addShortcode('image', imageShortcode);
  
  
 

  return {
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    
    dir: {
      input: "src",
      output: "public"
    }
  }
};