const options = document.querySelectorAll(".register-option");
const stepIndicators = document.querySelectorAll(".register-step");
const panels = document.querySelectorAll(".register-panel");
const profileFieldGroups = document.querySelectorAll("[data-profile-fields]");

const step1Continue = document.querySelector("#step1-continue");
const nameLabel = document.querySelector('[data-field="name-label"]');
const nameInput = document.querySelector('[data-field="name-input"]');

let currentStep = 1;
let selectedType = "student";

function goToStep(step){
    currentStep = step;

    panels.forEach(panel => {
        const panelStep = Number(panel.dataset.stepPanel);
        panel.style.display = panelStep === step ? "block" : "none";
    });

    stepIndicators.forEach(indicator => {
        const indicatorStep = Number(indicator.dataset.step);
        indicator.classList.remove("active", "completed");

        if (indicatorStep < step) {
            indicator.classList.add("completed");
        } else if (indicatorStep === step) {
            indicator.classList.add("active");
        }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTypeToStep2(){
    if (selectedType === "company") {
        nameLabel.textContent = "Nome da empresa";
        nameInput.placeholder = "Ex: Innovate";
    } else {
        nameLabel.textContent = "Nome completo";
        nameInput.placeholder = "Ex: Maria Silva";
    }
}

function applyTypeToStep3(){
    profileFieldGroups.forEach(group => {
        group.style.display = group.dataset.profileFields === selectedType ? "grid" : "none";
    });
}

options.forEach(option => {
    option.addEventListener("click", () => {
        options.forEach(item => item.classList.remove("selected"));
        option.classList.add("selected");
        selectedType = option.dataset.type;
        step1Continue.disabled = false;
    });
});

step1Continue.addEventListener("click", () => {
    if (step1Continue.disabled) return;
    applyTypeToStep2();
    goToStep(2);
});

document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => {
        const nextStep = Number(btn.dataset.next);
        if (nextStep === 3) {
            applyTypeToStep3();
        }
        goToStep(nextStep);
    });
});

document.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => {
        goToStep(currentStep - 1);
    });
});

const submitButton = document.querySelector("[data-submit]");
if (submitButton) {
    submitButton.addEventListener("click", () => {
        event.preventDefault();
        window.location.href = "dashboard.html";
    });
}