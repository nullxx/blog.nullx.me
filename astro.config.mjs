import { defineConfig } from "astro/config";
import preact from "@astrojs/preact"; // import remarkToc from 'remark-toc';
// import astroRemark from'@astrojs/markdown-remark';

import autolinkHeadings from "remark-autolink-headings";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  site: `https://blog.nullx.me`,
  server: {
    port: 3000,
    tailwindConfig: "./tailwind.config.js"
  },
  legacy: {
    astroFlavoredMarkdown: true
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false
    },
    syntaxHighlight: 'shiki',
    rehypePlugins: ["rehype-slug", ["rehype-autolink-headings", {
      behavior: "prepend"
    }], ["rehype-toc", {
      headings: ["h1", "h2"],

      /* only supported h1, h2 */
      ordered: true,
      cssClasses: {}
    }]],
    remarkPlugins: ["remark-code-titles", [autolinkHeadings, {
      behavior: "prepend"
    }]]
  }
});