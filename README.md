# Project Description

- Repo Link - https://github.com/vikas2705/date-range-picker
Steps to follow - 

1. Clone the repo
2. Run npm i
3. Run npm run dev

About and Working - 


This is a weekdays date range picker. 

- User can select the start and end date and it will always be a weekday. The weekends are disabled as per the requirement.
- The selected dates are highlighted and the weekend’s number has the disabled number styling and hover effect. 
- The user can select a year directly by clicking on the year above as per requirement.
- The user can select a month directly by clicking on the month above as per requirement.
- The component will show the selected date range at the bottom of date picker as well as on the screen as per the requirement.
- We have given buttons directly in the datepicker to select the previous 7 weekdays or 30 weekdays instead of passing a prop as we were going to define fixed values anyways but the code can be updated if required. 
- We are also showing all the weekends dates present in the selected date range as well as per the requirement.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
