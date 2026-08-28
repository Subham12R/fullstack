# Nutrition Checker Demo

A simple app that searches for food nutrition using the Edamam API.

## How it works

1. User types a food name and clicks Search
2. JavaScript calls the API with `fetch()`
3. The JSON response is parsed into a simple object
4. A nutrition card is shown on the page

## Setup

1. Sign up at https://developer.edamam.com/
2. Create an application for the **Nutrition Analysis API**
3. Copy your APP_ID and API_KEY
4. Open `js/config.js` and paste your keys
4. Open `index.html` in your browser

## File structure

```
demo/
  index.html       Page layout
  css/style.css    Styles
  js/config.js     Your API keys
  js/app.js        Fetch, parse, and display logic
```

## Try these searches

- avocado
- banana
- chicken
- rice
