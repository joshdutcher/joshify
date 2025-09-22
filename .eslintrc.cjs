module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/prop-types': 'off', // Turn off prop-types as we're not using TypeScript
    'no-unused-vars': ['warn', {
      varsIgnorePattern: '^_|^React$',
      argsIgnorePattern: '^_'
    }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'warn', // Allow quotes in JSX text
    'react-hooks/exhaustive-deps': 'warn', // Warn instead of error for dependency array
    'indent': ['error', 4, {
      'SwitchCase': 1,
      'ignoredNodes': ['JSXElement *', 'JSXElement']
    }],
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4]
  }
};