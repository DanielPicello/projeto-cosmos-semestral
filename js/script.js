const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const isOpen = mobileMenu.classList.contains("open");
    menuToggle.innerHTML = isOpen
        ? "<i class='bx bx-x'></i>"
        : "<i class='bx bx-menu'></i>";
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.innerHTML = "<i class='bx bx-menu'></i>";
            document.body.style.overflow = "";
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            mobileMenu.classList.remove("open");
            menuToggle.innerHTML = "<i class='bx bx-menu'></i>";
            document.body.style.overflow = "";
        }
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a, .mobile-nav-links a").forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});