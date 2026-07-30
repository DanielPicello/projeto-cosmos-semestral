const filtros = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".card-professor");
const pesquisa = document.querySelector("#pesquisa");



pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase();
    cards.forEach(card => {
        const nome = card.querySelector(".nome").textContent.toLowerCase();
        const universidade = card.querySelector(".universidade").textContent.toLowerCase();
        const formacao = card.querySelector(".formacao").textContent.toLowerCase();

        if(
            nome.includes(texto) ||
            universidade.includes(texto) ||
            formacao.includes(texto)
        ){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }
    });
});

filtros.forEach(filtro => {
    filtro.addEventListener("click", () => {
        const categoria = filtro.dataset.filtro;
        console.log(categoria);

        cards.forEach(card =>{

            const materia = card.dataset.materia;
            if (categoria === "todos" || materia === categoria) {
                card.style.display = "block"; 
               } else {
                    card.style.display = "none";
                }
        });
    });
});