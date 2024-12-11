import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Игнорируем папку dist
  {
    ignores: ['dist'],
  },
  // Настройка для JavaScript и JSX файлов
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Используем версию ES2020
      globals: {
        ...globals.browser, // Глобальные переменные браузера
        ...globals.node, // Глобальные переменные Node.js
      },
      parserOptions: {
        ecmaVersion: 'latest', // Последняя версия ECMAScript
        ecmaFeatures: { jsx: true }, // Включаем поддержку JSX
        sourceType: 'module', // Модули ES6
      },
    },
    settings: {
      react: {
        version: 'detect', // Автоматически определять версию React
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // Рекомендуемые правила ESLint
      ...react.configs.recommended.rules, // Рекомендуемые правила React
      ...react.configs['jsx-runtime'].rules, // Поддержка React 17+
      ...reactHooks.configs.recommended.rules, // Правила хуков React
      'react/jsx-no-target-blank': 'off', // Отключаем проверку target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
