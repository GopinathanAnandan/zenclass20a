let select = document.querySelectorAll('.currency');
let button = document.getElementById('convert');
let input = document.getElementById('amount');
let selectFromCurrency = document.getElementById('fromCurrency');
let selectToCurrency = document.getElementById('toCurrency');

fetch("https://api.frankfurter.app/currencies")
    .then((res) => res.json())
    .then((data) => displayDropdown(data))

function displayDropdown(data) {
    const currency = Object.entries(data)
    // console.log(currency)
    let selectFromCurrency = document.getElementById('fromCurrency');
    let selectToCurrency = document.getElementById('toCurrency');
    for (const element of currency) {
        const opt = `<option value="${element[0]}">${element[0]}</option>`
        selectFromCurrency.innerHTML += opt;
        selectToCurrency.innerHTML += opt;
    }
}

button.addEventListener('click', () => {
    let currency1 = selectFromCurrency.value;
    let currency2 = selectToCurrency.value;
    let inputValue = input.value
    if (currency1 === currency2) {
        alert("select different currency")
    } else
        convert(currency1, currency2, inputValue)

});

function convert(currency1, currency2, inputValue) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputValue}&from=${currency1}&to=${currency2}`)
        .then(resp => resp.json())
        .then((data) => {
            document.getElementById('result').value = Object.values(data.rates)[0].toFixed(2);

        });
}