import { countryList } from "./codes.js";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/v1/currencies";

const selectFrom = document.querySelector('.from-select');
const selectTo = document.querySelector('.to-select');
const flagFrom = document.querySelector('.from-flag');
const flagTo = document.querySelector('.to-flag');
const inputfrom = document.querySelector('.input-from');
const inputTo = document.querySelector('.input-to');
const convert = document.querySelector('#convert-icon');
const msg = document.querySelector('#msg');

// displaying every country codes :

for(let code in countryList) {
  let newOption = document.createElement('option');
  newOption.textContent = code;
  newOption.value = countryList[code];
  selectFrom.append(newOption);
}


for(let code in countryList) {
  let newOption = document.createElement('option');
  newOption.textContent = code;
  newOption.value = countryList[code];
  selectTo.append(newOption);
}

// trcking the change in selection and changing the flag image.
selectFrom.addEventListener('change', (event)=> {
  selectFrom.value = event.target.value;
  console.log(selectFrom.value);
  flagFrom.src=`https://flagsapi.com/${selectFrom.value}/flat/64.png`;
})

selectTo.addEventListener('change', (event)=> {
  selectTo.value = event.target.value;
  console.log(selectTo.value);
  flagTo.src=`https://flagsapi.com/${selectTo.value}/flat/64.png`;
})

let fromVal = inputfrom.value;
let toVal;

async function getRates() {
  console.log(selectFrom.value.toLowerCase())
  const url = `${BASE_URL}/${selectFrom.value.toLowerCase()}/${selectTo.value.toLowerCase()}.json`
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[toVal.toLowerCase()];
  let finalAmt = fromVal * rate;
  toVal = finalAmt;
  msg.innerText = `${fromVal} ${selectFrom.value} = ${finalAmt}${selectTo.value}`;
}

convert.addEventListener('click',(event)=> {
  event.preventDefault();
  getRates();
})