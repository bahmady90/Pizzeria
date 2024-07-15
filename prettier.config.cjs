(async () => {
    const tailwindPlugin = await import("prettier-plugin-tailwindcss");
   
    module.exports = {
      plugins: [tailwindPlugin.default],
      semi: false,
      singleQuote: true,
      jsxSingleQuote: true,
      trailingComma: "none",
      arrowParens: "avoid",
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
    };
  })();