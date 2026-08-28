# Class: Nutrient Analyzer

In-class build. Dark layout, food name + quantity, Edamam Nutrition Analysis API, result card.

## Run it

1. Copy `js/config.example.js` to `js/config.js`
2. Paste your Nutrition Analysis `API_ID` and `API_KEY`
3. Open `index.html` in a browser

## What the code does

1. Form submit (no page reload)
2. `fetch` to `https://api.edamam.com/api/nutrition-data` with `encodeURIComponent` on `ingr`
3. Parse `ingredients[0].parsed[0]`
4. Read nutrient keys as strings (`'ENERC_KCAL'`, `'PROCNT'`, and the rest)
5. Inject a card into `#result`

## Files

```
class/
  index.html
  css/style.css
  js/config.example.js
  js/config.js    (local only)
  js/script.js
```

Student homework for a full version with git rules: `../assignments/ASS-02-nutrient-analyzer.md`
