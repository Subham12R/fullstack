# Nutrition Checker Lab

Hands-on lab: search a food, fetch JSON from an API, parse it, and render a nutrition card.

Graded work lives in [assignments/](assignments/README.md). This lab is the walkthrough.

**Time:** about 3 hours
**Level:** beginners who know HTML, CSS, and basic JavaScript
**API:** Edamam Nutrition Analysis API

---

## What you will build

```
User types "avocado"
        |
        v
JavaScript calls fetch()
        |
        v
API returns JSON
        |
        v
You pick the fields you need
        |
        v
A card appears with calories, grams, protein, carbs, fat, fiber
```

---

## Learning goals

By the end of this lab you should be able to:

- [ ] Explain what an API is
- [ ] Call an API with `fetch()`
- [ ] Read a JSON response in DevTools
- [ ] Pull nested values out of JSON
- [ ] Turn that data into HTML
- [ ] Show loading and error states
- [ ] Save the last result with `localStorage`

---

## Files you will create

```
workshop/demo/
  index.html
  css/style.css
  js/config.example.js
  js/config.js
  js/app.js
```

| File | Job |
|------|-----|
| `index.html` | Page layout: search form, loading, error, results |
| `css/style.css` | Look and layout |
| `js/config.js` | Your API keys (do not commit this) |
| `js/config.example.js` | Template for keys (safe to share) |
| `js/app.js` | Fetch, parse JSON, render the card |

---

## Lab 0: Setup

### Checklist

- [ ] Code editor installed
- [ ] Browser with DevTools (Chrome, Firefox, or Safari)
- [ ] Edamam account created
- [ ] App created for **Nutrition Analysis API**
- [ ] Folder structure created

### Get API keys

1. Go to [https://developer.edamam.com/](https://developer.edamam.com/)
2. Sign up and confirm your email
3. Open the dashboard
4. Create a **new application**
5. Choose **Nutrition Analysis API** (not Food Database, not Recipe Search)
6. Copy `APP_ID` and `APP_KEY`

Edamam keys work only for the product you created. If you pick the wrong API, you will get `401` or `This app is for another API`.

### Create the folders

```
demo/
  css/
  js/
```

### Create `js/config.example.js`

```javascript
// Copy this file to config.js and add your Edamam API keys.
// Create an app for the Nutrition Analysis API (not Food Database).

const API_CONFIG = {
  APP_ID: 'YOUR_APP_ID_HERE',
  API_KEY: 'YOUR_API_KEY_HERE'
};
```

### Create `js/config.js`

Copy the example file and paste your real keys:

```javascript
const API_CONFIG = {
  APP_ID: 'paste_your_app_id',
  API_KEY: 'paste_your_app_key'
};
```

Do not put extra spaces or a dash after the key.

### Checkpoint

- [ ] `config.js` exists
- [ ] Keys are pasted with no extra characters
- [ ] The app type is Nutrition Analysis API

---

## Lab 1: HTML page

### Checklist

- [ ] Page has a title and a search form
- [ ] Form has `id="search-form"` and `id="search-input"`
- [ ] Loading, error, and results elements exist
- [ ] Scripts load `config.js` first, then `app.js`

### Why this order matters

`app.js` uses `API_CONFIG` from `config.js`. If you load `app.js` first, `API_CONFIG` will be undefined.

### Create `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nutrition Checker</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="page">
    <header class="hero">
      <h1>Nutrition Checker</h1>
      <p class="subtitle">Search any food to see calories, macros, and serving size.</p>
    </header>

    <section class="search-panel">
      <form id="search-form" class="search-form">
        <label class="search-label" for="search-input">Food name</label>
        <div class="search-row">
          <input
            type="text"
            id="search-input"
            placeholder="Try avocado, banana, or chicken"
            autocomplete="off"
            required
          >
          <button type="submit">Search</button>
        </div>
      </form>
    </section>

    <p id="loading" class="message loading" hidden>
      Loading nutrition data...
    </p>

    <p id="error" class="message error" hidden>
      <span id="error-text"></span>
    </p>

    <main id="results" hidden></main>
  </div>

  <script src="js/config.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

### What each id is for

| Id | Used for |
|----|----------|
| `search-form` | Listen for submit |
| `search-input` | Read the food name |
| `loading` | Show while waiting for the API |
| `error` | Show if something fails |
| `error-text` | Put the error message here |
| `results` | Inject the nutrition card |

### Checkpoint

- [ ] Open `index.html` in the browser
- [ ] You see the title and search box
- [ ] Open DevTools (F12 or Cmd+Option+I)
- [ ] Console has no errors

---

## Lab 2: Understand APIs, fetch, and JSON

### What is an API?

An API is a way for your page to ask another server for data.

Think of a restaurant:

- You (the browser) ask for avocado nutrition
- The waiter (`fetch`) takes the order
- The kitchen (Edamam) prepares the answer
- The ticket that comes back is JSON

### What is JSON?

JSON is text that looks like a JavaScript object. The server sends it as a string. `response.json()` turns that string into a real object you can use.

Example of JSON:

```json
{
  "name": "avocado",
  "calories": 160
}
```

Rules:

- Keys use double quotes: `"name"`
- Strings use double quotes: `"avocado"`
- Numbers have no quotes: `160`
- Nested objects use more `{ }`
- Lists use `[ ]`

### What is `fetch()`?

`fetch(url)` sends an HTTP request and returns a Promise. You wait for it with `await`.

```javascript
const response = await fetch(url);
const data = await response.json();
```

Two steps:

1. `fetch(url)` gets the HTTP response
2. `response.json()` parses the body into a JavaScript object

You do not need `JSON.parse()` when you use `response.json()`. The browser already parsed it.

If you had a JSON string instead:

```javascript
const text = '{"name":"avocado"}';
const obj = JSON.parse(text);
console.log(obj.name); // avocado
```

To save an object to `localStorage` you go the other way:

```javascript
localStorage.setItem('lastNutrition', JSON.stringify(obj));
```

| Method | Direction |
|--------|-----------|
| `response.json()` | HTTP body to object |
| `JSON.parse(text)` | String to object |
| `JSON.stringify(obj)` | Object to string |

### The endpoint you will call

```
GET https://api.edamam.com/api/nutrition-data
  ?nutrition-type=logging
  &ingr=1%20avocado
  &app_id=YOUR_APP_ID
  &app_key=YOUR_APP_KEY
```

`ingr` is the ingredient text. We send `1 avocado` so the API has a quantity.

`encodeURIComponent()` makes spaces and special characters safe in a URL.

### Test the API in the browser console

Open DevTools, Console tab, and run this (replace the keys):

```javascript
fetch(
  'https://api.edamam.com/api/nutrition-data'
  + '?nutrition-type=logging'
  + '&ingr=' + encodeURIComponent('1 avocado')
  + '&app_id=YOUR_APP_ID'
  + '&app_key=YOUR_APP_KEY'
)
  .then(function (res) { return res.json(); })
  .then(function (data) { console.log(data); })
  .catch(function (err) { console.error(err); });
```

### Checkpoint

- [ ] Console prints a big object
- [ ] You can expand `ingredients`
- [ ] Status in the Network tab is `200`
- [ ] If you see `401`, the keys or API product are wrong

---

## Lab 3: Read the JSON shape

This is the most important lab. Do not skip it.

### Checklist

- [ ] Log the full response
- [ ] Walk the nested path to nutrients
- [ ] Write down the keys you will use

### Sample response (shortened)

```json
{
  "ingredients": [
    {
      "text": "1 avocado",
      "parsed": [
        {
          "quantity": 1.0,
          "measure": "whole",
          "foodMatch": "avocado",
          "food": "avocado",
          "weight": 201.0,
          "nutrients": {
            "ENERC_KCAL": { "label": "Energy", "quantity": 321.6, "unit": "kcal" },
            "PROCNT": { "label": "Protein", "quantity": 4.02, "unit": "g" },
            "CHOCDF": { "label": "Carbs", "quantity": 17.14, "unit": "g" },
            "FAT": { "label": "Fat", "quantity": 29.54, "unit": "g" },
            "FIBTG": { "label": "Fiber", "quantity": 13.46, "unit": "g" }
          }
        }
      ]
    }
  ]
}
```

### Path from root to calories

```
data
  .ingredients[0]
  .parsed[0]
  .nutrients
  .ENERC_KCAL
  .quantity
```

In JavaScript:

```javascript
const parsed = data.ingredients[0].parsed[0];
const calories = parsed.nutrients.ENERC_KCAL.quantity;
const grams = parsed.weight;
```

### Nutrient codes you need

| Code | Meaning | Unit |
|------|---------|------|
| `ENERC_KCAL` | Calories | kcal |
| `PROCNT` | Protein | g |
| `CHOCDF` | Carbohydrates | g |
| `FAT` | Fat | g |
| `FIBTG` | Fiber | g |

Each of those is an object with `label`, `quantity`, and `unit`. You want `quantity`.

### Practice in the console

After you logged `data`:

```javascript
const parsed = data.ingredients[0].parsed[0];
console.log(parsed.foodMatch);
console.log(parsed.weight);
console.log(parsed.nutrients.ENERC_KCAL.quantity);
console.log(parsed.nutrients.PROCNT.quantity);
```

### Flatten the data

Do not pass the raw API object into HTML. Make a small object first:

```javascript
const nutrition = {
  name: 'Avocado',
  quantity: 1,
  measure: 'whole',
  weight: 201,
  calories: 321.6,
  protein: 4.0,
  carbs: 17.1,
  fat: 29.5,
  fiber: 13.5
};
```

That is JSON handling: read nested data, then keep only what the card needs.

### Checkpoint

- [ ] You can explain what `ingredients[0].parsed[0]` means
- [ ] You know which key is calories
- [ ] You know `weight` is serving size in grams

---

## Lab 4: Fetch in `app.js`

### Checklist

- [ ] Grab DOM elements
- [ ] Listen for form submit
- [ ] Call `fetch()` with the food name
- [ ] Convert the response with `response.json()`
- [ ] Log the result

### Start of `js/app.js`

```javascript
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorTextEl = document.getElementById('error-text');
const resultsEl = document.getElementById('results');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const foodName = searchInput.value.trim();
  if (!foodName) return;

  searchFood(foodName);
});
```

`event.preventDefault()` stops the page from reloading.

### Fetch function

```javascript
async function fetchNutrition(foodName) {
  if (
    API_CONFIG.APP_ID === 'YOUR_APP_ID_HERE' ||
    API_CONFIG.API_KEY === 'YOUR_API_KEY_HERE'
  ) {
    throw new Error('Add your Edamam API keys in js/config.js');
  }

  const baseUrl = 'https://api.edamam.com/api/nutrition-data';
  const url = baseUrl
    + '?nutrition-type=logging'
    + '&ingr=' + encodeURIComponent('1 ' + foodName)
    + '&app_id=' + API_CONFIG.APP_ID
    + '&app_key=' + API_CONFIG.API_KEY;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.status === 'error') {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}
```

### Wire a first search that only logs

```javascript
async function searchFood(foodName) {
  try {
    const rawData = await fetchNutrition(foodName);
    console.log(rawData);
  } catch (error) {
    console.error(error);
  }
}
```

### Checkpoint

- [ ] Search `avocado`
- [ ] Console shows the JSON object
- [ ] Network tab shows a request to `nutrition-data`
- [ ] Status is `200`

---

## Lab 5: Parse JSON into a simple object

### Checklist

- [ ] Guard against missing `parsed` data
- [ ] Read name, weight, quantity, measure
- [ ] Read nutrient quantities by code
- [ ] Round numbers so you do not see `114.00000000000001`

### Parser

```javascript
function parseNutrition(data) {
  const ingredient = data.ingredients && data.ingredients[0];
  const parsed = ingredient && ingredient.parsed && ingredient.parsed[0];

  if (!parsed) {
    return null;
  }

  const nutrients = parsed.nutrients;
  const foodName = parsed.foodMatch || parsed.food;

  return {
    name: capitalize(foodName),
    quantity: parsed.quantity,
    measure: parsed.measure,
    weight: roundNumber(parsed.weight),
    calories: roundNumber(getNutrientValue(nutrients, 'ENERC_KCAL')),
    protein: roundNumber(getNutrientValue(nutrients, 'PROCNT')),
    carbs: roundNumber(getNutrientValue(nutrients, 'CHOCDF')),
    fat: roundNumber(getNutrientValue(nutrients, 'FAT')),
    fiber: roundNumber(getNutrientValue(nutrients, 'FIBTG'))
  };
}

function getNutrientValue(nutrients, key) {
  if (!nutrients || !nutrients[key]) {
    return 0;
  }

  return nutrients[key].quantity;
}

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function roundNumber(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return 0;
  }

  return Math.round(Number(value) * 10) / 10;
}

function formatNumber(value) {
  const rounded = roundNumber(value);

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  return rounded.toFixed(1);
}
```

Why `&&` is used:

```javascript
data.ingredients && data.ingredients[0]
```

If `ingredients` is missing, this stops instead of crashing with `Cannot read property of undefined`.

### Update `searchFood` to parse

```javascript
async function searchFood(foodName) {
  try {
    const rawData = await fetchNutrition(foodName);
    const nutrition = parseNutrition(rawData);
    console.log(nutrition);
  } catch (error) {
    console.error(error);
  }
}
```

### Checkpoint

- [ ] Console shows a flat object like `{ name, weight, calories, protein, ... }`
- [ ] Numbers look like `201` or `13.5`, not long floats
- [ ] A nonsense search returns `null` instead of crashing

---

## Lab 6: Render the card

### Checklist

- [ ] Build HTML from the parsed object
- [ ] Show serving size in grams
- [ ] Show calories, protein, carbs, fat, fiber
- [ ] Put the HTML into `#results`

### Card functions

```javascript
function showCard(nutrition) {
  resultsEl.innerHTML = ''
    + '<article class="card">'
    + '<div class="card-header">'
    + '<h2>' + nutrition.name + '</h2>'
    + '<span class="serving-badge">Serving: ' + formatServing(nutrition) + '</span>'
    + '<p class="serving-note">Nutrition values below are for this serving size.</p>'
    + '</div>'
    + '<div class="calories-panel">'
    + '<span>Total calories</span>'
    + '<strong>' + formatNumber(nutrition.calories) + ' kcal</strong>'
    + '</div>'
    + '<div class="nutrients">'
    + nutrientItem('Weight', nutrition.weight, 'g', 'weight')
    + nutrientItem('Protein', nutrition.protein, 'g', 'protein')
    + nutrientItem('Carbs', nutrition.carbs, 'g', 'carbs')
    + nutrientItem('Fat', nutrition.fat, 'g', 'fat')
    + nutrientItem('Fiber', nutrition.fiber, 'g', 'fiber')
    + '</div>'
    + '</article>';

  showResults();
}

function nutrientItem(label, value, unit, type) {
  return ''
    + '<div class="nutrient nutrient--' + type + '">'
    + '<span>' + label + '</span>'
    + '<strong>' + formatNumber(value) + ' ' + unit + '</strong>'
    + '</div>';
}

function formatServing(nutrition) {
  const parts = [];

  if (nutrition.quantity) {
    parts.push(formatNumber(nutrition.quantity));
  }

  if (nutrition.measure) {
    parts.push(nutrition.measure);
  }

  if (nutrition.weight) {
    parts.push('(' + formatNumber(nutrition.weight) + ' g)');
  }

  return parts.join(' ');
}
```

### Connect parse to display

```javascript
async function searchFood(foodName) {
  showLoading();

  try {
    const rawData = await fetchNutrition(foodName);
    const nutrition = parseNutrition(rawData);

    if (!nutrition) {
      showError('No results found. Try a simpler name like "apple" or "rice".');
      return;
    }

    showCard(nutrition);
  } catch (error) {
    showError(error.message || 'Could not load data. Check your API keys in config.js and try again.');
    console.error(error);
  }
}
```

### Checkpoint

- [ ] Search `banana`
- [ ] A card appears with a name
- [ ] Serving shows grams, for example `1 medium (118 g)`
- [ ] Calories and macros are filled in

---

## Lab 7: Loading and error states

Only one of these should be visible at a time: loading, error, or results.

### Checklist

- [ ] Searching shows loading
- [ ] Success hides loading and shows the card
- [ ] Failure hides loading and shows the error
- [ ] A new search hides the previous card and error

### Toggle helper

```javascript
function setViewState(state, message) {
  loadingEl.hidden = state !== 'loading';
  errorEl.hidden = state !== 'error';
  resultsEl.hidden = state !== 'results';

  if (state === 'error') {
    errorTextEl.textContent = message;
  }
}

function showLoading() {
  setViewState('loading');
}

function showError(message) {
  setViewState('error', message);
}

function showResults() {
  setViewState('results');
}
```

### CSS note

If `.message` uses `display: flex`, it can override the `hidden` attribute. Add this:

```css
.message[hidden],
#results[hidden] {
  display: none !important;
}
```

### How to test errors

1. Temporarily break the API key in `config.js`
2. Search again
3. You should see the error box, not the loading box
4. Fix the key and search again
5. You should see the card, not the error box

### Checkpoint

- [ ] Loading appears while waiting
- [ ] Loading disappears after success
- [ ] Error appears on failure
- [ ] Loading and error never show together

---

## Lab 8: Save the last result

`localStorage` only stores strings. That is why you use `JSON.stringify` and `JSON.parse`.

### Checklist

- [ ] After a successful search, save the parsed object
- [ ] On page load, restore it if it exists
- [ ] Refresh the page and the last card still appears

```javascript
function saveToStorage(nutrition) {
  localStorage.setItem('lastNutrition', JSON.stringify(nutrition));
}

function loadFromStorage() {
  const saved = localStorage.getItem('lastNutrition');

  if (!saved) return;

  const nutrition = JSON.parse(saved);
  showCard(nutrition);
}

loadFromStorage();
```

Call `saveToStorage(nutrition)` after `showCard(nutrition)` in `searchFood`.

### Inspect it

In DevTools:

1. Application (Chrome) or Storage (Firefox)
2. Local Storage
3. Find `lastNutrition`
4. You should see a JSON string of your last food

### Checkpoint

- [ ] Search `rice`
- [ ] Refresh the page
- [ ] The rice card is still there

---

## Lab 9: CSS (minimum)

You can copy `demo/css/style.css` from this project, or start with this:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  background: #f3f6f2;
  color: #1a2e1a;
  line-height: 1.5;
}

.page {
  width: min(100%, 640px);
  margin: 0 auto;
  padding: 2.5rem 1.25rem;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.search-panel,
.card {
  background: #fff;
  border: 1px solid #dfe8df;
  border-radius: 16px;
  padding: 1.25rem;
}

.search-row {
  display: flex;
  gap: 0.75rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.9rem 1rem;
  border: 1px solid #dfe8df;
  border-radius: 10px;
  font: inherit;
}

button {
  padding: 0.9rem 1.25rem;
  border: none;
  border-radius: 10px;
  background: #1f7a4d;
  color: #fff;
  font: inherit;
  cursor: pointer;
}

.message {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
}

.message[hidden],
#results[hidden] {
  display: none !important;
}

.loading {
  background: #e8f5ee;
}

.error {
  background: #fef2f2;
  color: #991b1b;
}

.card {
  margin-top: 1.5rem;
  padding: 0;
  overflow: hidden;
}

.card-header,
.calories-panel,
.nutrients {
  padding: 1.25rem 1.5rem;
}

.nutrients {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.nutrient {
  padding: 1rem;
  background: #f8faf7;
  border-radius: 10px;
}
```

### Checkpoint

- [ ] The search box looks usable
- [ ] The card is readable
- [ ] Hidden messages are not visible

---

## Full `app.js` (reference)

Use this if you get stuck. Try to write each lab yourself first.

```javascript
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorTextEl = document.getElementById('error-text');
const resultsEl = document.getElementById('results');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const foodName = searchInput.value.trim();
  if (!foodName) return;

  searchFood(foodName);
});

async function searchFood(foodName) {
  showLoading();

  try {
    const rawData = await fetchNutrition(foodName);
    const nutrition = parseNutrition(rawData);

    if (!nutrition) {
      showError('No results found. Try a simpler name like "apple" or "rice".');
      return;
    }

    showCard(nutrition);
    saveToStorage(nutrition);
  } catch (error) {
    showError(error.message || 'Could not load data. Check your API keys in config.js and try again.');
    console.error(error);
  }
}

async function fetchNutrition(foodName) {
  if (
    API_CONFIG.APP_ID === 'YOUR_APP_ID_HERE' ||
    API_CONFIG.API_KEY === 'YOUR_API_KEY_HERE'
  ) {
    throw new Error('Add your Edamam API keys in js/config.js');
  }

  const baseUrl = 'https://api.edamam.com/api/nutrition-data';
  const url = baseUrl
    + '?nutrition-type=logging'
    + '&ingr=' + encodeURIComponent('1 ' + foodName)
    + '&app_id=' + API_CONFIG.APP_ID
    + '&app_key=' + API_CONFIG.API_KEY;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.status === 'error') {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

function parseNutrition(data) {
  const ingredient = data.ingredients && data.ingredients[0];
  const parsed = ingredient && ingredient.parsed && ingredient.parsed[0];

  if (!parsed) {
    return null;
  }

  const nutrients = parsed.nutrients;
  const foodName = parsed.foodMatch || parsed.food;

  return {
    name: capitalize(foodName),
    quantity: parsed.quantity,
    measure: parsed.measure,
    weight: roundNumber(parsed.weight),
    calories: roundNumber(getNutrientValue(nutrients, 'ENERC_KCAL')),
    protein: roundNumber(getNutrientValue(nutrients, 'PROCNT')),
    carbs: roundNumber(getNutrientValue(nutrients, 'CHOCDF')),
    fat: roundNumber(getNutrientValue(nutrients, 'FAT')),
    fiber: roundNumber(getNutrientValue(nutrients, 'FIBTG'))
  };
}

function getNutrientValue(nutrients, key) {
  if (!nutrients || !nutrients[key]) {
    return 0;
  }

  return nutrients[key].quantity;
}

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function showCard(nutrition) {
  resultsEl.innerHTML = ''
    + '<article class="card">'
    + '<div class="card-header">'
    + '<h2>' + nutrition.name + '</h2>'
    + '<span class="serving-badge">Serving: ' + formatServing(nutrition) + '</span>'
    + '<p class="serving-note">Nutrition values below are for this serving size.</p>'
    + '</div>'
    + '<div class="calories-panel">'
    + '<span>Total calories</span>'
    + '<strong>' + formatNumber(nutrition.calories) + ' kcal</strong>'
    + '</div>'
    + '<div class="nutrients">'
    + nutrientItem('Weight', nutrition.weight, 'g', 'weight')
    + nutrientItem('Protein', nutrition.protein, 'g', 'protein')
    + nutrientItem('Carbs', nutrition.carbs, 'g', 'carbs')
    + nutrientItem('Fat', nutrition.fat, 'g', 'fat')
    + nutrientItem('Fiber', nutrition.fiber, 'g', 'fiber')
    + '</div>'
    + '</article>';

  showResults();
}

function nutrientItem(label, value, unit, type) {
  return ''
    + '<div class="nutrient nutrient--' + type + '">'
    + '<span>' + label + '</span>'
    + '<strong>' + formatNumber(value) + ' ' + unit + '</strong>'
    + '</div>';
}

function formatServing(nutrition) {
  const parts = [];

  if (nutrition.quantity) {
    parts.push(formatNumber(nutrition.quantity));
  }

  if (nutrition.measure) {
    parts.push(nutrition.measure);
  }

  if (nutrition.weight) {
    parts.push('(' + formatNumber(nutrition.weight) + ' g)');
  }

  return parts.join(' ');
}

function setViewState(state, message) {
  loadingEl.hidden = state !== 'loading';
  errorEl.hidden = state !== 'error';
  resultsEl.hidden = state !== 'results';

  if (state === 'error') {
    errorTextEl.textContent = message;
  }
}

function showLoading() {
  setViewState('loading');
}

function showError(message) {
  setViewState('error', message);
}

function showResults() {
  setViewState('results');
}

function saveToStorage(nutrition) {
  localStorage.setItem('lastNutrition', JSON.stringify(nutrition));
}

function loadFromStorage() {
  const saved = localStorage.getItem('lastNutrition');
  if (!saved) return;
  showCard(JSON.parse(saved));
}

function roundNumber(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return 0;
  }
  return Math.round(Number(value) * 10) / 10;
}

function formatNumber(value) {
  const rounded = roundNumber(value);
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(1);
}

loadFromStorage();
```

---

## Final checklist

You are done when all of these work:

- [ ] Type `avocado` and a card appears
- [ ] Serving size shows grams
- [ ] Calories, protein, carbs, fat, and fiber display
- [ ] Loading shows during the request
- [ ] A bad key or failed request shows an error, not a blank page
- [ ] Refresh keeps the last card
- [ ] You can find the JSON path in DevTools without guessing

---

## Common problems

| What you see | Likely cause | Fix |
|--------------|--------------|-----|
| `API_CONFIG is not defined` | Scripts loaded in the wrong order | Load `config.js` before `app.js` |
| `401` or "This app is for another API" | Keys belong to a different Edamam product | Create a Nutrition Analysis API app |
| `Failed to fetch` | Typo in the URL, or extra space in the key | Check `config.js` and the endpoint |
| Card never appears | Parser looking at the wrong JSON path | Log `data` and check `ingredients[0].parsed[0]` |
| `114.00000000000001` | Floating point leftover | Use `roundNumber` and `formatNumber` |
| Loading never hides | CSS `display: flex` fights `hidden` | Add `display: none !important` for `[hidden]` |
| Empty results | Food name too vague or not found | Try `apple`, `rice`, `banana` |
| Keys leaked in git | `config.js` was committed | Add `demo/js/config.js` to `.gitignore` |

---

## DevTools workflow (use this every time)

1. **Console:** `console.log(data)` after fetch
2. **Network:** click the request, open Response, confirm JSON
3. **Elements:** inspect `#results` to see the injected HTML
4. **Application / Storage:** inspect `lastNutrition`

If something breaks, log first. Do not guess the JSON path.

---

## Suggested search terms

- avocado
- banana
- chicken
- rice
- apple
- yogurt

---

## Extra credit (optional)

- [ ] Search `1 cup rice` instead of always prefixing `1 `
- [ ] Show more nutrients (sodium `NA`, sugar `SUGAR`)
- [ ] Keep a list of recent searches, not only the last one
- [ ] Disable the Search button while loading

Do these only after the main labs pass.

---

## Resources

- Edamam Nutrition Analysis: [https://developer.edamam.com/edamam-docs-nutrition-api](https://developer.edamam.com/edamam-docs-nutrition-api)
- Fetch: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- JSON: [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- localStorage: [https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
