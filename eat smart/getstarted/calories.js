const calorieForm = document.getElementById("calorie-form");
const foodInput = document.getElementById("food");
const caloriesInput = document.getElementById("calories");
const dateInput = document.getElementById("date");
const totalCaloriesDisplay = document.getElementById("total-calories");
const foodList = document.getElementById("food-list");

let totalCalories = 0;

document.addEventListener("DOMContentLoaded", function () {
  const today = getCurrentDate();
  loadFoodLog(today);
});

calorieForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const food = foodInput.value;
  const calories = parseInt(caloriesInput.value, 10);
  const date = dateInput.value;

  if (food && calories && date) {
    addFoodItemToList(food, calories, date);

    totalCalories += calories;
    updateTotalCalories();

    storeFoodItem(food, calories, date);

    foodInput.value = "";
    caloriesInput.value = "";
  }
});

// Function to add food item to the list
function addFoodItemToList(food, calories, date) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${food} (${date})</span><span>${calories} calories</span>`;
  foodList.appendChild(li);
}

// Function to update total calories display
function updateTotalCalories() {
  totalCaloriesDisplay.textContent = totalCalories;
}

// Function to store food item in local storage
function storeFoodItem(food, calories, date) {
  const foodLog = JSON.parse(localStorage.getItem("foodLog")) || {};
  const logDate = date || getCurrentDate();

  if (!foodLog[logDate]) {
    foodLog[logDate] = [];
  }
  foodLog[logDate].push({ name: food, calories: calories });
  localStorage.setItem("foodLog", JSON.stringify(foodLog));
}

// Function to load food log for the specified date
function loadFoodLog(date) {
  const foodLog = JSON.parse(localStorage.getItem("foodLog")) || {};
  if (foodLog[date]) {
    foodLog[date].forEach((foodItem) => {
      addFoodItemToList(foodItem.name, foodItem.calories, date);
      totalCalories += foodItem.calories;
    });
    updateTotalCalories();
  }
}

// Function to get the current date in 'YYYY-MM-DD' format
function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}
