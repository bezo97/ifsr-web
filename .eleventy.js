const markdownIt = require("markdown-it");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  //avoid common pitfall
  eleventyConfig.setLibrary("md", markdownIt({ html: true }).disable("code"));

  eleventyConfig.addPassthroughCopy("./src/theme.css");
  eleventyConfig.addWatchTarget("./src/theme.css");

  //copy static files to root output
  eleventyConfig.addPassthroughCopy({ static: "/" });

  //minify html
  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "build",
    },
  };
};
