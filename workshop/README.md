# Fullstack workshop

HTML, CSS, and JavaScript workshop: fetch an API, parse JSON, and render a nutrition card.

## Folders

| Path | What it is |
|------|------------|
| `assignments/` | Student briefs (Assignment 1 and 2) |
| `class/` | In-class Nutrient Analyzer (live build) |
| `demo/` | Reference demo with comments |
| `LAB.md` | Step-by-step lab with JSON paths and checkpoints |
| `WORKSHOP.md` | Original workshop outline |

## Assignments

Start here: [assignments/README.md](assignments/README.md)

1. [Profile page](assignments/ASS-01-profile-page.md) (HTML and CSS)
2. [Nutrient analyzer](assignments/ASS-02-nutrient-analyzer.md) (fetch, JSON, card)

## Class app

Open `class/index.html` after copying `class/js/config.example.js` to `class/js/config.js` and adding Nutrition Analysis API keys.

Do not commit `config.js`.

## Demo

See [demo/README.md](demo/README.md).

## API

Edamam **Nutrition Analysis API**:

```
https://api.edamam.com/api/nutrition-data?nutrition-type=logging&ingr=1%20avocado&app_id=YOUR_ID&app_key=YOUR_KEY
```

JSON path for the first food:

```
ingredients[0].parsed[0]
```
