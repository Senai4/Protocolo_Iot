// script do funcionamento do menu hamburguer
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menuImg");
    const mobileMenu = document.querySelector(".menu-mobile");

    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove("active");
        }
    });
});
