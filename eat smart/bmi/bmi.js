document.getElementById("bmiForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  const bmi = (weight / (height * height)).toFixed(2);

  let category;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  document.getElementById(
    "result"
  ).innerText = `Your BMI is ${bmi}. Category: ${category}`;

  displayChart(category);
});

function displayChart(category) {
  const ctx = document.getElementById("bmiChart").getContext("2d");
  const categories = ["Underweight", "Normal weight", "Overweight", "Obesity"];
  const counts = [0, 0, 0, 0];

  switch (category) {
    case "Underweight":
      counts[0]++;
      break;
    case "Normal weight":
      counts[1]++;
      break;
    case "Overweight":
      counts[2]++;
      break;
    case "Obesity":
      counts[3]++;
      break;
  }

  const bmiChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          label: "BMI Categories",
          data: counts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "BMI Category Distribution",
        },
      },
    },
  });

  document.getElementById("bmiChart").style.display = "block";
}
