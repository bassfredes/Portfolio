import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [".history/**", "eslint.config.mjs"],
  },
  ...nextConfig,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
