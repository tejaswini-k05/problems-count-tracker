const inputDigits = document.querySelectorAll('input');
window.onload = () => inputDigits[0].focus();

let setButton = document.getElementsByTagName('button')[0];
let resetButton = document.getElementsByTagName('button')[1];

let input1 = document.getElementsByTagName('input')[0];
let input2 = document.getElementsByTagName('input')[1];

inputDigits.forEach((el, index) => {
    el.addEventListener("input", () => {
        let value = el.value;
        value = value.replace(/[^0-9]/g, "");
        if (value.length > 1) {
            value = value.slice(0, 1);
        }
        el.value = value;
    });
    el.addEventListener('keyup', (event) => {
        const key = event.key;
        if (el.value.length >= 1 && (key >= 96 || key <= 105)) {
            inputDigits[index + 1]?.focus();
        }
        else if (el.value == '' && key === "Backspace") {
            setButton.classList.add("disabled");
            inputDigits[index - 1]?.focus();
        }

    })
})

function disableSetButton() {
    setButton.disabled = true;
}

function disableInputs() {
    input1.disabled = true;
    input2.disabled = true;
}

let goal = localStorage.getItem("goal") || 0;
let goalInString = "" + goal;
let digit1 = parseInt(goalInString[0]);
let digit2 = parseInt(goalInString[1]);
document.querySelector("input")[0].innerText = digit1;
document.querySelector("input")[1].innerText = digit2;

function createNew() {
    let newButtonDiv = document.getElementById("solved1Button");
    const decrementbutton = document.createElement('button');
    decrementbutton.className = "newButton";
    var decrementIcon = document.createElement("i");
    decrementIcon.className = "newIcon";
    decrementIcon.setAttribute("class", "fa fa-minus-circle");
    decrementbutton.appendChild(decrementIcon);
    decrementbutton.innerText = 'Solved 1 ?!';
    newButtonDiv.appendChild(decrementbutton);
}

function setGoal() {
    let validInputs = Array.from(inputDigits).filter(input => input.value !== "");
    if (validInputs.length == 2) {
        disableInputs();
        disableSetButton();
        createNew();
        localStorage.setItem("goal", goal);
        
    }
}

function enableInputs() {
    setButton.classList.remove('disabled');
}

function enableButtons() {
    input1.classList.remove('disabled');
    input2.classList.remove('disabled');

}

function reset() {
    enableInputs();
    enableButtons();
}