// Step 1: Get the HTML elements we need
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const quantityInput = document.getElementById('quantity-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorTextEl = document.getElementById('error-text');
const resultsEl = document.getElementById('results');

// Step 2: Listen for the search form submit
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const foodName = searchInput.value.trim();
  const quantity = Number(quantityInput.value);

  if (!foodName) return;
  if (!quantity || quantity <= 0) {
    showError('Enter a quantity greater than 0.');
    return;
  }

  searchFood(foodName, quantity);
});

// Step 3: Main function - fetch data, parse it, show the card
async function searchFood(foodName, quantity) {
  showLoading();

  try {
    const rawData = await fetchNutrition(foodName, quantity);
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

// Step 4: Call the Edamam Nutrition Analysis API and get JSON back
async function fetchNutrition(foodName, quantity) {
  if (
    API_CONFIG.APP_ID === 'YOUR_APP_ID_HERE' ||
    API_CONFIG.API_KEY === 'YOUR_API_KEY_HERE'
  ) {
    throw new Error('Add your Edamam API keys in js/config.js');
  }

  const ingredient = quantity + ' ' + foodName;
  const baseUrl = 'https://api.edamam.com/api/nutrition-data';
  const url = baseUrl
    + '?nutrition-type=logging'
    + '&ingr=' + encodeURIComponent(ingredient)
    + '&app_id=' + API_CONFIG.APP_ID
    + '&app_key=' + API_CONFIG.API_KEY;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.status === 'error') {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// Step 5: Pull out the fields we need from the API response
function parseNutrition(data) {
  const ingredient = data.ingredients && data.ingredients[0];
  const parsed = ingredient && ingredient.parsed && ingredient.parsed[0];

  if (!parsed) {
    return null;
  }

  const nutrients = parsed.nutrients;
  const foodName = parsed.foodMatch || parsed.food;

  // Return a simple object that is easy to use in our card
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

// Step 6: Build the card HTML and put it on the page
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
    + nutrientItem('Quantity', nutrition.quantity, nutrition.measure || '', 'quantity')
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
  const display = unit
    ? formatNumber(value) + ' ' + unit
    : formatNumber(value);

  return ''
    + '<div class="nutrient nutrient--' + type + '">'
    + '<span>' + label + '</span>'
    + '<strong>' + display + '</strong>'
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

// Step 7: Show and hide loading, error, and results
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

// Step 8: Save the last result so it shows again after refresh
function saveToStorage(nutrition) {
  localStorage.setItem('lastNutrition', JSON.stringify(nutrition));
}

function loadFromStorage() {
  const saved = localStorage.getItem('lastNutrition');

  if (!saved) return;

  const nutrition = JSON.parse(saved);

  if (nutrition.quantity) {
    quantityInput.value = nutrition.quantity;
  }

  if (nutrition.name) {
    searchInput.value = nutrition.name.toLowerCase();
  }

  showCard(nutrition);
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

// Load the last searched food when the page opens
loadFromStorage();
