# Nutrition Checker Demo

Reference app for the workshop. Search a food, send quantity, fetch JSON, show a nutrition card.

This is a teaching demo. For the graded build, see [../assignments/ASS-02-nutrient-analyzer.md](../assignments/ASS-02-nutrient-analyzer.md).

## How it works

1. User enters quantity and a food name
2. JavaScript calls Edamam with `fetch()`
3. The JSON response is parsed into a simple object
4. A nutrition card is shown (serving grams, calories, macros)

## Setup

1. Sign up at https://developer.edamam.com/
2. Create an application for the **Nutrition Analysis API**
3. Copy `js/config.example.js` to `js/config.js`
4. Paste your APP_ID and API_KEY
5. Open `index.html` in your browser

## File structure

```
demo/
  index.html
  css/style.css
  js/config.example.js
  js/config.js     (gitignored)
  js/app.js
```

## Try these searches

- avocado
- banana
- chicken
- rice
