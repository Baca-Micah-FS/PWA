// Imports your SCSS stylesheet
import "./styles/index.scss";

import jsonData from "./car-dataset.json";

let year = "";

let make = "";

let model = "";

function populateYears() {
  // on page load. 1. Get years into array from json.
  const years = [];
  jsonData.forEach((car) => {
    if (!years.includes(car.year)) {
      years.push(car.year);
    }
  });

  // 2. Sort
  const yearsSorted = years.sort((a, b) => b - a);
  // console.log(years);
  appendYearsToDom(yearsSorted);
  // 3. Delete duplicates only unique values(check)
}

function appendYearsToDom(yearsList) {
  // 1. Select the id year-dropdown for menu
  const yearDropDown = document.querySelector("#year-dropdown");
  yearDropDown.innerHTML = "";

  // 2. Create options
  yearsList.forEach((year) => {
    const option = document.createElement("option");
    // console.log(year);
    // 3. Attach inner text to drop down options
    option.innerText = year;
    option.value = year;
    yearDropDown.appendChild(option);
  });
}

function populateManufacturer() {
  const manufacturers = [];
  // 1. Get amnufactureres from json
  jsonData.forEach((make) => {
    if (!manufacturers.includes(make.Manufacturer)) {
      manufacturers.push(make.Manufacturer);
    }
  });
  // sortt the manufacturers
  const makeSorted = manufacturers.sort();

  appendManufacturerToDom(makeSorted);
}

function appendManufacturerToDom(makeList) {
  const makeDropDown = document.querySelector("#make-dropdown");
  makeDropDown.innerHTML = "";
  // 2. Create optioins
  makeList.forEach((make) => {
    const option = document.createElement("option");
    option.innerText = make;
    option.value = make;
    makeDropDown.appendChild(option);
  });
}

function populateModel() {
  const models = [];
  jsonData.forEach((car) => {
    if (
      !models.includes(car.model) &&
      car.Manufacturer === make &&
      car.year === year
    ) {
      models.push(car.model);
    }
  });
  const modelSorted = models.sort((a, b) => b - a);

  appendModelToDom(modelSorted);
}

function appendModelToDom(modelList) {
  const modelDropDown = document.querySelector("#model-dropdown");
  modelDropDown.innerHTML = "";
  // 2. Create optioins
  modelList.forEach((make) => {
    const option = document.createElement("option");
    option.innerText = make;
    option.value = make;
    modelDropDown.appendChild(option);
  });
}

function logSelectedVehicle() {
  let selectedVehicle = jsonData.filter(
    (x) => x.year === year && x.Manufacturer === make && x.model === model
  );
  console.log(selectedVehicle[0]);
}
const yearSelectOutput = document.querySelector("#year-dropdown");
const makeSelectOutput = document.querySelector("#make-dropdown");
const modelSelectOutput = document.querySelector("#model-dropdown");

yearSelectOutput.addEventListener("change", (e) => {
  year = Number(e.target.value);

  populateManufacturer();
});

makeSelectOutput.addEventListener("change", (e) => {
  make = e.target.value;

  populateModel();
});

modelSelectOutput.addEventListener("change", (e) => {
  model = e.target.value;

  logSelectedVehicle();
});

populateYears();
