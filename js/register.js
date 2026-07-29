const options = document.querySelectorAll(".register-option");
const button = document.querySelector(".register-button");

let selectedType = null;

options.forEach(option => {
    option.addEventListener("click", () => {
        options.forEach(item => item.classList.remove("selected"));
        option.classList.add("selected");
        selectedType = option.dataset.type;
        button.disabled = false;
    });
});