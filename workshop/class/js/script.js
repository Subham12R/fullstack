const nutritionForm = document.getElementById('nutrition-form');
const foodName = document.getElementById('food-name');
const foodQty = document.getElementById('food-qty');
const analyzeButton = document.getElementById('analyze-button');

// We are taking the input from the food name and food qty
// Then we are sending the data to the server using fetch api
nutritionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const foodNameValue = foodName.value;
    const foodQtyValue = foodQty.value;
    
    searchFood(foodNameValue, foodQtyValue);
});

// takes up the food name and food qty and returns the nutrition data
// if the food is not found, it throws an error
// if the food is found, it shows the nutrition data
async function searchFood(foodNameValue, foodQtyValue) {
    try {
        const rawData = await fetchNutritionData(foodNameValue, foodQtyValue);
        const nutrionData = await parseNutritionData(rawData);

        if (!nutrionData) {
            throw new Error('No nutrition data found');
        }

        showNutritionData(nutrionData);

    } catch (error) {
        console.error('Error searching food:', error);
    }
}

async function fetchNutritionData(foodNameValue, foodQtyValue) {
    if (!foodNameValue || !foodQtyValue) {
        throw new Error('Food name and food qty are required');
    }

    if (API_CONFIG.API_ID && API_CONFIG.API_KEY) {
        const ingredient = `${foodQtyValue} ${foodNameValue}`;
        const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${API_CONFIG.API_ID}&app_key=${API_CONFIG.API_KEY}&ingr=${encodeURIComponent(ingredient)}&nutrition-type=logging`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } else {
        throw new Error('API ID and API KEY are required');
    }
}

async function parseNutritionData(rawData) {
    const ingredients = rawData.ingredients && rawData.ingredients[0];
    const parsed = ingredients && ingredients.parsed && ingredients.parsed[0];

    if (!parsed) {
        throw new Error('No parsed data found');
    }
    const nutrients = parsed.nutrients;
    const foodName = parsed.foodMatch || parsed.food;
    return {
        name: capitalizeFirstLetter(foodName),
        quantity: parsed.quantity,
        measure: parsed.measure,
        weight: roundNumber(parsed.weight), // 14.00000001 ~ 14, 15.99992 ~ 16
        calories: roundNumber(getNutrientValue(nutrients,'ENERC_KCAL'))  || 0,
        protein: roundNumber(getNutrientValue(nutrients,'PROCNT'))  || 0,
        fat: roundNumber(getNutrientValue(nutrients,'FAT'))  || 0,
        carbs: roundNumber(getNutrientValue(nutrients,'CHOCDF'))  || 0,
        fiber: roundNumber(getNutrientValue(nutrients,'FIBTG'))  || 0,
        sugar: roundNumber(getNutrientValue(nutrients,'SUGAR'))  || 0,
        vitamins: getNutrientValue(nutrients,'VITC')  || 0,
        minerals: getNutrientValue(nutrients,'CA')  || 0,
    };
}

function getNutrientValue(nutrients, nutrient) {
   if (!nutrients || !nutrients[nutrient]) {
    return 0;
   }
   return nutrients[nutrient].quantity;
}

function roundNumber(number, precision = 2) {
    return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showNutritionData(nutritionData) {
    const result = document.getElementById('result');
    result.innerHTML = `
    <div class="nutrition-data">
        <h2 class="nutrition-data-title">${nutritionData.name}</h2>
        <div class="nutrition-data-container">
        <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Quantity:</span>
            <span class="nutrition-data-item-value">${nutritionData.quantity} ${nutritionData.measure}</span>
        </p>
        <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Weight:</span>
            <span class="nutrition-data-item-value">${nutritionData.weight}g</span>
        </p>
        <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Calories:</span>
            <span class="nutrition-data-item-value">${nutritionData.calories}kcal</span>
        </p>
        <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Protein:</span>
            <span class="nutrition-data-item-value">${nutritionData.protein}g</span>
        </p>
        <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Fat:</span>
            <span class="nutrition-data-item-value">${nutritionData.fat}g</span>
        </p>
                <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Minerals:</span>
            <span class="nutrition-data-item-value">${nutritionData.minerals}</span>
        </p>
        <p class="nutrition-data-item">
            <span class="nutrition-data-item-label">Vitamins:</span>
            <span class="nutrition-data-item-value">${nutritionData.vitamins}</span>
        </p>
        </div>

    </div>
    `;
    result.classList.remove('hidden');
}