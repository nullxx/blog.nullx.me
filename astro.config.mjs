/* jsxImportSource: astro */
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact"; // import remarkToc from 'remark-toc';
// import astroRemark from'@astrojs/markdown-remark';

import autolinkHeadings from "remark-autolink-headings";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap(), mdx()],
  site: `https://blog.nullx.me`,
  server: {
    port: 3000,
    tailwindConfig: "./tailwind.config.js"
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