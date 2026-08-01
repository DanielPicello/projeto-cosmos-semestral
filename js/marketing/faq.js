const faqItems = document.querySelectorAll(".faq-item");
const faqGroups = document.querySelectorAll(".faq-group");
const faqFiltros = document.querySelectorAll(".faq-filtro");
const faqSearch = document.querySelector("#faqSearch");
const faqEmpty = document.querySelector("#faqEmpty");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        item.classList.toggle("open");
        answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
    });
});

faqFiltros.forEach(filtro => {
    filtro.addEventListener("click", () => {
        faqFiltros.forEach(f => f.classList.remove("ativo"));
        filtro.classList.add("ativo");

        const categoria = filtro.dataset.filtro;

        faqGroups.forEach(group => {
            const grupoCategoria = group.dataset.categoria;
            group.style.display =
                categoria === "todos" || grupoCategoria === categoria ? "block" : "none";
        });

        if (faqSearch) {
            faqSearch.value = "";
        }

        atualizarEstadoVazio();
    });
});

if (faqSearch) {
    faqSearch.addEventListener("input", () => {
        const texto = faqSearch.value.trim().toLowerCase();

        faqFiltros.forEach(f => f.classList.remove("ativo"));
        document.querySelector('.faq-filtro[data-filtro="todos"]').classList.add("ativo");

        faqGroups.forEach(group => {
            let algumVisivelNoGrupo = false;

            group.querySelectorAll(".faq-item").forEach(item => {
                const pergunta = item.querySelector(".faq-question").textContent.toLowerCase();
                const resposta = item.querySelector(".faq-answer p").textContent.toLowerCase();
                const corresponde = pergunta.includes(texto) || resposta.includes(texto);

                item.style.display = corresponde ? "block" : "none";
                if (corresponde) algumVisivelNoGrupo = true;

                if (!corresponde && item.classList.contains("open")) {
                    item.classList.remove("open");
                    item.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            group.style.display = algumVisivelNoGrupo ? "block" : "none";
        });

        atualizarEstadoVazio();
    });
}

function atualizarEstadoVazio(){
    const algumGrupoVisivel = Array.from(faqGroups).some(
        group => group.style.display !== "none"
    );

    if (faqEmpty) {
        faqEmpty.classList.toggle("show", !algumGrupoVisivel);
    }
}