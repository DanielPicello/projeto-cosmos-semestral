const panelConfig = {
    aluno: {
        label: "Aluno",
        groups: [
            {
                label: "Estudos",
                items: [
                    { icon: "bx-grid-alt", text: "Visão geral", href: "painel-aluno.html" },
                    { icon: "bx-book-open", text: "Minhas aulas", href: "#" },
                    { icon: "bx-calendar", text: "Agenda", href: "#" },
                    { icon: "bx-check-square", text: "Tarefas", href: "#" },
                    { icon: "bx-folder", text: "Materiais", href: "#" }
                ]
            },
            {
                label: "Conexões",
                items: [
                    { icon: "bx-heart", text: "Favoritos", href: "#" },
                    { icon: "bx-message-rounded-dots", text: "Mensagens", href: "#" }
                ]
            },
            {
                label: "Conta",
                items: [
                    { icon: "bx-credit-card", text: "Pagamentos", href: "#" },
                    { icon: "bx-user-circle", text: "Meu perfil", href: "#" }
                ]
            }
        ]
    },
    professor: {
        label: "Professor",
        groups: [
            {
                label: "Ensino",
                items: [
                    { icon: "bx-grid-alt", text: "Visão geral", href: "painel-professor.html" },
                    { icon: "bx-calendar", text: "Agenda", href: "#" },
                    { icon: "bx-book-open", text: "Minhas aulas", href: "#" },
                    { icon: "bx-group", text: "Meus alunos", href: "#" },
                    { icon: "bx-folder", text: "Materiais", href: "#" }
                ]
            },
            {
                label: "Negócios",
                items: [
                    { icon: "bx-wallet", text: "Ganhos", href: "#" },
                    { icon: "bx-bulb", text: "Oportunidades", href: "#" },
                    { icon: "bx-message-rounded-dots", text: "Mensagens", href: "#" }
                ]
            },
            {
                label: "Conta",
                items: [
                    { icon: "bx-user-circle", text: "Meu perfil", href: "#" }
                ]
            }
        ]
    },
    empresa: {
        label: "Empresa",
        groups: [
            {
                label: "Recrutamento",
                items: [
                    { icon: "bx-grid-alt", text: "Visão geral", href: "painel-empresa.html" },
                    { icon: "bx-briefcase", text: "Vagas & Projetos", href: "#" },
                    { icon: "bx-file", text: "Candidatos", href: "#" },
                    { icon: "bx-video", text: "Entrevistas", href: "#" },
                    { icon: "bx-user-check", text: "Contratados", href: "#" }
                ]
            },
            {
                label: "Gestão",
                items: [
                    { icon: "bx-message-rounded-dots", text: "Mensagens", href: "#" },
                    { icon: "bx-receipt", text: "Faturamento", href: "#" }
                ]
            },
            {
                label: "Conta",
                items: [
                    { icon: "bx-user-circle", text: "Perfil da empresa", href: "#" }
                ]
            }
        ]
    }
};

const explorarGroup = {
    label: "Explorar",
    items: [
        { icon: "bx-transfer-alt", text: "Trocar painel", href: "dashboard.html" },
        { icon: "bx-search", text: "Encontrar professores", href: "professores.html" },
        { icon: "bx-buildings", text: "Empresas", href: "empresas.html" },
        { icon: "bx-home", text: "Home", href: "index.html" }
    ]
};

function renderPanelSidebar(){
    const sidebar = document.getElementById("panelSidebar");
    const nav = document.getElementById("panelNav");
    if (!sidebar || !nav) return;

    const panelType = sidebar.dataset.panel;
    const config = panelConfig[panelType];
    if (!config) return;

    const logoSub = sidebar.querySelector(".panel-logo-sub");
    if (logoSub) logoSub.textContent = `Painel · ${config.label}`;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const groups = [...config.groups, explorarGroup];

    nav.innerHTML = groups.map(group => `
        <div class="panel-nav-group">
            <span class="panel-nav-label">${group.label}</span>
            ${group.items.map(item => `
                <a href="${item.href}" class="panel-nav-link${item.href === currentPage ? " active" : ""}">
                    <i class='bx ${item.icon}'></i>
                    <span>${item.text}</span>
                </a>
            `).join("")}
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", renderPanelSidebar);

const panelSidebar = document.getElementById("panelSidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const panelOverlay = document.getElementById("panelOverlay");

function isMobile(){
    return window.innerWidth <= 900;
}

if (sidebarToggle && panelSidebar) {
    sidebarToggle.addEventListener("click", () => {
        panelSidebar.classList.toggle("collapsed");

        if (isMobile()) {
            panelOverlay.classList.toggle("show", panelSidebar.classList.contains("collapsed"));
        }
    });
}

if (panelOverlay) {
    panelOverlay.addEventListener("click", () => {
        panelSidebar.classList.remove("collapsed");
        panelOverlay.classList.remove("show");
    });
}

window.addEventListener("resize", () => {
    if (!isMobile()) {
        panelOverlay.classList.remove("show");
    }
});

if (panelSidebar) {
    panelSidebar.addEventListener("click", (e) => {
        if (e.target.closest(".panel-nav-link") && isMobile()) {
            panelSidebar.classList.remove("collapsed");
            panelOverlay.classList.remove("show");
        }
    });
}