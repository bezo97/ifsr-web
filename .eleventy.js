import markdownIt from "markdown-it";
import htmlmin from "html-minifier";
import mdIterator from "markdown-it-for-inline";

export default function (eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true })
      //avoid common pitfall
      .disable("code")
      // Open external links in new tab
      // https://v2.franknoirot.co/posts/external-links-markdown-plugin/
      .use(mdIterator, "url_new_win", "link_open", function (tokens, idx) {
        const [attrName, href] = tokens[idx].attrs.find((attr) => attr[0] === "href");
        if (href && !href.includes("ifsrenderer.z97.io") && !href.startsWith("/") && !href.startsWith("#")) {
          tokens[idx].attrPush(["target", "_blank"]);
          tokens[idx].attrPush(["rel", "noopener noreferrer"]);
        }
      }),
  );

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
}
