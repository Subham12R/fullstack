# Fullstack

Practice repo for HTML, CSS, and JavaScript. Start with small pages, then fetch APIs and parse JSON.

## Contents

| Folder | What you will do |
|--------|------------------|
| [start/](start/) | First JavaScript in the browser |
| [basic/](basic/) | DOM, events, simple interaction |
| [pokedex/](pokedex/) | `fetch()` a public API and render cards |
| [workshop/](workshop/) | Nutrition checker: API keys, JSON parsing, assignments |

## Suggested order

1. `start/` then `basic/` to get comfortable with the console and the DOM
2. `pokedex/` to see `fetch()` and JSON without API keys
3. `workshop/` for Edamam, lab notes, class demo, and graded assignments

## Workshop

Open [workshop/README.md](workshop/README.md) for the nutrition unit.

| Path | Role |
|------|------|
| [workshop/assignments/](workshop/assignments/README.md) | Assignment 1 (profile page) and Assignment 2 (nutrient analyzer) |
| [workshop/LAB.md](workshop/LAB.md) | Hands-on lab with checkpoints |
| [workshop/class/](workshop/class/) | In-class nutrient analyzer |
| [workshop/demo/](workshop/demo/) | Commented reference app |

## Assignments

1. [Profile page](workshop/assignments/ASS-01-profile-page.md) (HTML and CSS)
2. [Nutrient analyzer](workshop/assignments/ASS-02-nutrient-analyzer.md) (fetch, JSON, card)

Submit each assignment in its own GitHub repo. Follow the Git steps in the assignment file. Do not commit API keys.

## How to run anything here

These are static pages. Open the folder's `index.html` in a browser, or use a local server:

```bash
cd workshop/class
# then open index.html
```

For the nutrition apps, copy `config.example.js` to `config.js` and add Edamam Nutrition Analysis keys. Keep `config.js` out of git.

## API used in the workshop

Edamam Nutrition Analysis:

```
https://api.edamam.com/api/nutrition-data?nutrition-type=logging&ingr=1%20avocado&app_id=YOUR_ID&app_key=YOUR_KEY
```

First food in the JSON:

```
ingredients[0].parsed[0]
```
