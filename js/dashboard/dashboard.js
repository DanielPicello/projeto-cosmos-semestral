const dashCards = document.querySelectorAll(".dash-card");

dashCards.forEach(card => {
    const btn = card.querySelector(".dash-btn");

    card.addEventListener("click", (e) => {
        if (e.target.closest(".dash-btn")) return;
        if (btn) window.location.href = btn.getAttribute("href");
    });
});