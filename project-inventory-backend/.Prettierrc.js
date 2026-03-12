/ @typedef {import("prettier").Config} PrettierConfig */;

const config = {
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  trailingComma: "none",
  printWidth: 100,
  useTabs: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "auto",
  proseWrap: "always",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
