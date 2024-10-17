let inp_amount = document.querySelector("#inp_amount");
let converter_x = document.querySelectorAll(".converter_box select");
let fromcurrency = document.querySelector(".from_box select")
let tocurrency = document.querySelector(".to_box select")
let btn = document.querySelector("#btn");
let answer = document.querySelector(".answer_box p")
for (let i = 0; i < converter_x.length; i++) {
    for (currency_code in country_code) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if (i == 1) {
            selected = currency_code == "NPR" ? "selected" : "";
        }

        // console.log(currency_code)
        let optiontag = `<option value="${currency_code}">${currency_code}</option>`;
        converter_x[i].insertAdjacentHTML("beforeend", optiontag);
           converter_x[i].addEventListener("change", (e) => {
                loadflag(e.target);
            });
    }
 
}

function loadflag(e) {
    for (code in country_code) {
        if (code == e.value) {
            let imgtag = e.parentElement.querySelector("img");
            imgtag.src = `https://flagsapi.com/USD/flat/64.png">`
        }
    }
}
window.addEventListener("load", (e) => {
    getexchangerate();
});
btn.addEventListener("click", (e) => {
    e.preventDefault();
    getexchangerate();
})

async function getexchangerate() {
    let amount_val = inp_amount.value;
    if (amount_val == "" || amount_val == 0) {
        inp_amount.value = "1";
        amount_val = 1;

    }
    let apikey = "ba7bd56ea79c07583b8dc0ee";
    let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromcurrency.value}`
    let data = await fetch(url);
    let result = await data.json();
    let exchange_rate = result.conversion_rates[tocurrency.value];
    let totalexchangerate = (amount_val * exchange_rate).toFixed(2); /*work of tofixed it will show two decimal digits like 1.12 */
    answer.innerHTML = `${amount_val} ${fromcurrency.value} =${totalexchangerate} ${tocurrency.value}`

}