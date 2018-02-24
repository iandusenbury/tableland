module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "plugins": [
    "prettier"
  ],
  "env": {
    "browser": true,
    "jasmine": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "no-use-before-define": ["error", { "functions": false }],
    "jsx-a11y/anchor-is-valid": ["error", "never"],
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "semi": false,
      "jsxBracketSameLine": true
    }]
  }
};
