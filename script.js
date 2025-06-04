const BASE_URL = 'https://2024-03-06.currency-api.pages.dev/v1/currencies/';// usd.jason
// flag https://flagsapi.com/{country name}/shiny/64.png


const select = document.querySelectorAll("select");
let amountFrom = document.querySelector("#amountFrom");
let amountTo = document.querySelector("#amountTo");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");


for (let i of select) {
    for (let currCode in countryList) {
        let newOption = document.createElement('option');
        let currName = curr_detail[currCode].name;
        newOption.innerText = currCode + " - " + currName;
        newOption.value = currCode;
        if (i.name === "from" && currCode === "USD")
            newOption.selected = "selected";
        if (i.name === "to" && currCode === "INR")
            newOption.selected = "selected";
        i.append(newOption);
    }
}

for (let i of select) {
    i.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
    i.addEventListener("change", (e) => {
        updateSymbol(e.target);
    });
}

function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let imgURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgURL;
};

function updateSymbol(element) {
    let currCode = element.value;
    let currency = curr_detail[currCode].symbol;
    let paraElement = element.parentNode.parentNode.children[2].children[0];
    paraElement.innerHTML = currency;
}

const updateExchangeRateFrom = async () => {
    let amountValueFrom = amountFrom.value;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = rate * amountValueFrom;
    amountTo.value = finalAmount;
};

const updateExchangeRateTo = async () => {
    let amountValueTo = amountTo.value;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amountValueTo / rate;
    amountFrom.value = finalAmount;
};


amountFrom.addEventListener("keyup", (evt) => {
    evt.preventDefault();
    updateExchangeRateFrom();
});
amountTo.addEventListener("keyup", (evt) => {
    evt.preventDefault();
    updateExchangeRateTo();
});
window.addEventListener("load", () => {
    updateExchangeRateFrom();
});