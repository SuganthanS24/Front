module.exports = {
    presets: [
      "@babel/preset-env",  // Transpiles modern JavaScript to be compatible with older browsers
      "@babel/preset-react" // Transpiles JSX and other React-related syntax
    ],
    plugins: [
      "@babel/plugin-transform-runtime" // Adds support for async/await and other features without polluting the global scope
    ]
  };
  