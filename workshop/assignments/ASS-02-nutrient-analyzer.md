# Assignment 2: Nutrient Analyzer

Build a nutrient analyzer in the browser. The user enters a food name and a quantity. Your app calls the Edamam Nutrition Analysis API, reads the JSON, and shows a result card.

This assignment follows the same process as the in-class app in `class/`. Use class notes and `LAB.md` as a reference. Submit your own repo. Do not fork and resubmit the workshop folder as the whole assignment.

**Due:** follow the date given in class
**Stack:** HTML, CSS, JavaScript (no frameworks)

---

## Goal

```
Quantity + food name
        |
        v
fetch() to Edamam
        |
        v
Parse JSON
        |
        v
Show name, grams, calories, macros
```

---

## API

Use **Nutrition Analysis API** only (not Food Database, not Recipe Search).

Signup: https://developer.edamam.com/

Endpoint:

```
GET https://api.edamam.com/api/nutrition-data
```

Query parameters:

| Param | Example |
|-------|---------|
| `nutrition-type` | `logging` |
| `ingr` | `2 avocado` (quantity, then food name) |
| `app_id` | from your dashboard |
| `app_key` | from your dashboard |

Always encode the ingredient:

```javascript
encodeURIComponent(quantity + ' ' + foodName)
```

Keep keys in `js/config.js`. Do not commit that file. Commit `js/config.example.js` with placeholders.

---

## JSON you must parse

After a successful call, walk this path:

```
data.ingredients[0].parsed[0]
```

Fields to use:

| Path | Show as |
|------|---------|
| `foodMatch` or `food` | Name |
| `quantity` | Quantity |
| `measure` | Measure (whole, cup, and similar) |
| `weight` | Serving weight in grams |
| `nutrients.ENERC_KCAL.quantity` | Calories |
| `nutrients.PROCNT.quantity` | Protein (g) |
| `nutrients.CHOCDF.quantity` | Carbs (g) |
| `nutrients.FAT.quantity` | Fat (g) |
| `nutrients.FIBTG.quantity` | Fiber (g) |

Nutrient codes are **string keys**. Write `'ENERC_KCAL'`, not `ENERC_KCAL`. Unquoted names are treated as variables and throw `is not defined`.

If `parsed[0]` is missing, show an error. Do not crash.

Round numbers so the UI does not show values like `114.00000000000001`.

---

## Requirements

### Must have

- [ ] `index.html`, `css/style.css`, `js/config.js`, `js/config.example.js`, `js/app.js` (names may vary, folders must be clear)
- [ ] Form with food name and quantity
- [ ] Submit does not reload the page (`preventDefault`)
- [ ] `fetch()` to the nutrition-data URL
- [ ] `response.json()` then a parse function that returns a flat object
- [ ] Result card with at least: name, quantity, weight (g), calories, protein, carbs, fat
- [ ] Loading state while the request runs
- [ ] Error state if keys are wrong, the network fails, or there is no parsed food
- [ ] Loading and error do not stay on screen together with a successful card
- [ ] `.gitignore` includes `js/config.js`
- [ ] `README.md` with setup steps for API keys

### Should have

- [ ] Fiber and one extra nutrient (sugar, vitamin C, or calcium) if present in JSON
- [ ] Last result restored with `localStorage` (`JSON.stringify` / `JSON.parse`)
- [ ] Disabled search button while loading

### Do not

- [ ] Do not commit real API keys
- [ ] Do not use jQuery, React, or a bundler
- [ ] Do not copy the workshop `demo/` or `class/` files word for word and change only the title. You may follow the same steps.

---

## Suggested file structure

```
assignment-2-nutrient-analyzer/
  index.html
  css/style.css
  js/config.example.js
  js/config.js          (gitignored)
  js/app.js
  .gitignore
  README.md
```

Example `.gitignore`:

```
js/config.js
.DS_Store
```

Example `config.example.js`:

```javascript
const API_CONFIG = {
  API_ID: 'YOUR_APP_ID_HERE',
  API_KEY: 'YOUR_API_KEY_HERE'
};
```

Match the property names you use in `app.js` (`API_ID` vs `APP_ID`). Be consistent.

---

## Process

### 1. Repo and keys

1. Create GitHub repo `assignment-2-nutrient-analyzer`.
2. Clone it.
3. Create the folder structure.
4. Get Nutrition Analysis keys.
5. Copy `config.example.js` to `config.js` and paste keys locally.

### 2. HTML first

Form ids you will use in JS, plus empty regions for loading, error, and results.

### 3. Fetch in the console

Prove the API works before you build the card. In DevTools:

```javascript
fetch('https://api.edamam.com/api/nutrition-data?nutrition-type=logging&ingr=' + encodeURIComponent('1 avocado') + '&app_id=YOUR_ID&app_key=YOUR_KEY')
  .then(function (res) { return res.json(); })
  .then(function (data) { console.log(data); });
```

You may also inspect the same URL in Bruno. Env vars for `app_id` and `app_key` are fine.

### 4. Parse

Write `parseNutrition(data)` that returns a small object. `console.log` it.

### 5. Render

Build HTML from the parsed object and inject it into the results element.

### 6. States

Show loading on submit. On success show the card. On failure show a message.

### 7. Polish and push

README, gitignore, three or more commits, then push.

---

## Checkpoints

### Checkpoint 1: Setup

- [ ] Repo cloned and GitHub remote set
- [ ] Nutrition Analysis app created (correct product)
- [ ] Local `config.js` has keys
- [ ] `config.js` is not tracked (`git status` does not list it as a file to commit)

### Checkpoint 2: HTML and CSS

- [ ] Name and quantity fields exist
- [ ] Quantity defaults to a number greater than 0
- [ ] Results area exists in the DOM

### Checkpoint 3: Fetch

- [ ] Network tab shows a request to `nutrition-data`
- [ ] Status `200` for `avocado` or `banana`
- [ ] Console can print the full JSON

### Checkpoint 4: JSON parse

- [ ] You can point to `ingredients[0].parsed[0].nutrients`
- [ ] Nutrient keys are quoted strings
- [ ] Flat object has `name`, `weight`, `calories`

### Checkpoint 5: UI

- [ ] Quantity `2` and food `avocado` changes grams and calories vs quantity `1`
- [ ] Weight is shown in grams
- [ ] Loading appears, then hides
- [ ] Bad food or bad keys show an error, not a blank page
- [ ] Hidden messages stay hidden (watch CSS `display` vs the `hidden` attribute)

### Checkpoint 6: Git submit

- [ ] README explains clone, copy config, paste keys, open `index.html`
- [ ] No keys in GitHub file view
- [ ] `git log` has distinct commits (HTML, fetch, parse, UI)
- [ ] Public repo URL submitted

---

## Git submission guidelines

### Repo

One assignment, one repository. Do not dump this into a random old project unless the instructor said to use a class org repo.

### Useful commands

```bash
git clone https://github.com/YOUR_USERNAME/assignment-2-nutrient-analyzer.git
cd assignment-2-nutrient-analyzer

git add index.html css/style.css js/app.js js/config.example.js .gitignore README.md
git commit -m "Add form layout for nutrient analyzer"

git add js/app.js
git commit -m "Fetch nutrition data and parse JSON into a card"

git push -u origin main
```

### Never do this

```bash
git add js/config.js
git add .
```

`git add .` will stage keys if they are not gitignored. Check `git status` before every commit.

### Commit messages to aim for

```text
Add HTML form for food name and quantity
Connect Edamam nutrition-data with fetch
Parse nested JSON into a flat nutrition object
Show loading and error states
Ignore config.js so keys stay local
```

### What to send the instructor

```text
Repo: https://github.com/YOUR_USERNAME/assignment-2-nutrient-analyzer
```

If the page is on GitHub Pages, include that URL too.

---

## How this maps to class

In class you built `class/`:

- Form: food name + quantity
- `fetchNutritionData` with `encodeURIComponent`
- `parseNutritionData` reading `ingredients[0].parsed[0]`
- Card for quantity, weight, calories, protein, fat, minerals, vitamins

Assignment 2 is the same idea, done in your repo, with loading/error, gitignore, and a README. The class folder is a live demo, not your submission.

---

## Common failures

| Problem | Cause |
|---------|--------|
| `ENERC_KCAL is not defined` | Missing quotes around the key |
| `No parsed data found` | Bad URL, unencoded `ingr`, or wrong API product |
| `401` / app is for another API | Keys are not Nutrition Analysis |
| Card built but invisible | You removed class `hidden` but the element still has the `hidden` attribute |
| Keys on GitHub | `config.js` was committed |

---

## Resources

- Lab walkthrough in this workshop: `../LAB.md`
- Class demo: `../class/`
- Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- JSON: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
