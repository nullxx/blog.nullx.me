/* jsxImportSource: astro */
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact"; // import remarkToc from 'remark-toc';
// import astroRemark from'@astrojs/markdown-remark';

import autolinkHeadings from "remark-autolink-headings";
import sitemap from "@astrojs/sitemap";
import { rawContentMDX } from "./remark-raw-content.mjs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap(), mdx({ remarkPlugins: [rawContentMDX] })],
  site: "https://blog.nullx.me",
  server: {
    port: 3000,
    tailwindConfig: "./tailwind.config.js",
  },
});
