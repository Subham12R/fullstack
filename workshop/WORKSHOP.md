# 📊 Nutrition Checker - 3 Hour JavaScript Workshop

## 🎯 Workshop Overview

**Time**: 3 hours  
**Target**: Intermediate developers (comfortable with HTML & CSS)  
**Focus**: JavaScript API Integration & JSON Parsing  
**Prerequisites**: HTML, CSS, basic JavaScript (variables, functions, DOM manipulation)\n**Outcome**: A nutrition checker web app using Edamam API

---

## 📚 What You'll Learn

### Session 1: Setup & API Connection (45 min)

- Set up Edamam API keys  
- Understand what an API is (simple analogy)\n- **How JS connects to APIs** using `fetch()`\n- Making your first API call

### Session 2: JSON Parsing & Display (90 min)\n- **What's JSON?** - Understanding the data format\n- **How to parse JSON** with `JSON.parse()`\n- Display nutrition data in a card\n- Handle API responses and errors\n- Debugging API issues

### Session 3: Enhanced Display & Persistence (30 min)\n- Show nutrition breakdown in a styled card\n- Implement session persistence with localStorage\n- Add loading and error states

---

## 🚀 Prerequisites

### Required

- A code editor (VS Code, Sublime, etc.)\n- A web browser (Chrome, Firefox, Safari)\n- **Edamam API Account** (FREE): https://developer.edamam.com/

### Optional

- Terminal/command line\n- Git (for version control)\n- Async/await knowledge (we'll explain it as you code)

---

## 📋 Setup Instructions

### Step 1: Get Your Edamam API Keys

1. Go to https://developer.edamam.com/\n2. Click **"Get Started for Free"**\n3. Sign up with your email\n4. Wait for email confirmation\n5. Once approved, log in and go to **Dashboard**\n6. Copy your **APP_ID** and **API_KEY**

### Step 2: Create Config File

Create `assets/js/config.js`:\n```javascript\nexport const API_CONFIG = {\n  APP_ID: "YOUR_APP_ID_HERE",\n  API_KEY: "YOUR_API_KEY_HERE",\n  APPLET_KEY: "YOUR_APPLET_KEY_HERE"\n};\n```\n\n### Step 3: Open in Browser

Open `index.html` in your browser and start coding!\n\n### Step 4: Test Your Connection

Open browser console (F12) and run:\n```javascript\nfetch('https://api.edamam.com/search?app_id=YOUR_ID&app_key=YOUR_KEY&q=avocado')\n  .then(res => res.json())\n  .then(data => console.log('API connected!'))\n  .catch(err => console.error('API Error:', err));\n```\n\n---

## 🎨 What We're Building

```html\nSearch: [________________] [🔍 Search]\n```\n\n```html\n───────────────────────────────\n│ 📷 Image                    │\n│ 🍎 Avocado                  │\n│ Description: ...           │\n│                             │\n│ ⚡ Calories: 160 kcal       │\n│ 🥤 Protein: 2g              │\n│ 🍚 Carbs: 12g               │\n│ 🥩 Fat: 15g                 │\n│ 🥬 Fiber: 7g                │\n│                             │\n│ [🗑️ Delete Card]           │\n───────────────────────────────\n```\n\n**That's it!** A simple search → one nutrition card.\n\n---

## 📖 Code Files Overview

### `index.html` - The Main Page

```html\n<!-- Header -->\n<h1>📊 Nutrition Checker</h1>\n\n<!-- Search Form -->\n<input type=\"text\" placeholder=\"Enter food item (e.g., avocado)\" />\n<button id=\"search-btn\">🔍 Search</button>\n\n<!-- Results -->\n<div id=\"results\"></div>\n```\n\n### `assets/css/style.css` - The Styling\n\n```css\n/* Basic styles for inputs, buttons */\n/* Nutrition card styles */\n/* Responsive layout */\n```\n\n### `assets/js/config.js` - API Configuration\n\n```javascript\nexport const API_CONFIG = {\n  APP_ID: \"YOUR_APP_ID_HERE\",\n  API_KEY: \"YOUR_API_KEY_HERE\",\n  APPLET_KEY: \"YOUR_APPLET_KEY_HERE\"\n};\n```\n\n### `assets/js/app.js` - The JavaScript\n\n```javascript\n// Load config\nimport { API_CONFIG } from './config.js';\n\n// Listen for search\nbutton.addEventListener('click', searchNutrition);\n\n// Fetch from Edamam API\nasync function searchNutrition(query) {\n  const response = await fetch(API_URL, { params });\n  const data = await response.json();\n  \n  // Parse and display\n  displayNutritionCard(data);\n}\n```\n\n---

## 🎯 Learning Objectives

By the end of this workshop, you'll understand:\n\n1. ✅ How JavaScript connects to external APIs with `fetch()`\n2. ✅ What JSON looks like and how to parse it\n3. ✅ How to transform API responses into HTML\n4. ✅ How to handle errors gracefully\n5. ✅ How to implement session persistence with localStorage\n6. ✅ How to debug API and parsing issues in DevTools\n\n---

## ⏱️ Time Allocation

| Session | Duration | Focus |\n|---------|---------|-------|\n| Session 1 | 45 min | API connection, fetch basics |\n| Session 2 | 90 min | JSON structure, parsing, display |\n| Session 3 | 15 min | Final polish, localStorage |\n\n---

## 💡 Teaching Tips

### For JavaScript Beginners:

1. **Annotate EVERY line** when explaining JS\n2. **Break down API calls** into small, testable pieces\n3. **Show what's happening** at each step\n4. **Use browser DevTools** to inspect variables\n\n### Key Concepts to Emphasize:

1. **What's an API?** - \"A waiter taking your order to the kitchen\"\n2. **What's fetch()?** - \"Ordering food online, waiting for delivery\"\n3. **What's JSON?** - \"The ticket you receive with your order details\"\n4. **What's JSON.parse()?** - \"Opening and reading the ticket\"\n5. **What's async/await?** - \"Waiting for the waiter to bring your food\"\n\n---

## 🐛 Common Pitfalls

| Issue | Cause | Solution |\n|-------|-------|----------|\n| \"Failed to fetch\" | Wrong API keys | Double-check APP_ID and API_KEY |\n| Empty results | Search term too vague | Try simpler names (e.g., \"apple\" not \"red apple\") |\n| 400 Bad Request | Invalid query | Ensure the API is activated |\n| Parser Error | Response not valid JSON | Check Network tab for error |\n| No data | Item not in database | Try common food names |\n\n---

## 📚 Resources

- **Edamam API Docs**: https://developer.edamam.com/doc/recipes\n- **JSON Tutorial**: https://www.json.org/json-en.html\n- **Fetch API Guide**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API\n- **MDN JSON.parse()**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse\n\n---

## 🎓 What Happens Next?

### After this workshop, later sessions will add:\n\n- Save multiple nutrition cards (cart functionality)\n- Calculate total nutrition for a meal\n- Track daily nutrient intake\n- Save preferences (dietary restrictions)\n\nBut for now: **Just keep it simple!**\n\n---

## 🏆 Workshop Completion

**You've succeeded if:**\n\n- ✅ Type \"avocado\" → see a nutrition card appear\n- ✅ The nutrition numbers display correctly (calories, protein, etc.)\n- ✅ The card looks styled and readable\n- ✅ You understand how the JavaScript connects to the API\n- ✅ You can parse JSON in the browser\n\n---

## 🙏 Thank You!

Enjoy building your Nutrition Checker!\n\n---\n\n## 📝 Session Files\n\n- `SESSION_01_API.md` - Setup & fetch connection\n- `SESSION_02_JSON.md` - JSON parsing & display\n- `SESSION_03_FINAL.md` - Final polish & localStorage\n\n---\n\n**Ready to start Session 1?** 🚀