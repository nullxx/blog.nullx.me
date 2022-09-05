export function rawContentMDX() {
    // All remark and rehype plugins return a separate function
    return function (_tree, file) {
      file.data.astro.frontmatter.rawContent = file.value;
    }
  }