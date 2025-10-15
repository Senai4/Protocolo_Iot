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

// Seleciona os elementos que vamos usar
    const scene = document.querySelector('.scene');
    const carousel = document.querySelector('.carousel');

    // Variáveis para controlar o estado do carrossel e do arraste
    const numItems = 5; // O número total de itens no carrossel
    const theta = 360 / numItems; // O ângulo entre cada item (72 graus)
    let currentAngle = 0; // O ângulo de rotação atual do carrossel
    let isMouseDown = false; // Flag para saber se o mouse está pressionado
    let startX = 0; // Posição X inicial do mouse quando o clique começa

    // --- FUNÇÃO PARA "SNAP" (AJUSTAR) AO ITEM MAIS PRÓXIMO ---
    const snapToClosestItem = () => {
        // Calcula o índice do item mais próximo do centro
        const closestItemIndex = Math.round(currentAngle / theta);
        
        // Calcula o ângulo exato para alinhar com esse item
        const targetAngle = closestItemIndex * theta;
        
        // Atualiza o ângulo atual e aplica a transformação com transição suave
        currentAngle = targetAngle;
        carousel.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'; // Garante que a transição está ativa
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    };

    // 1. Quando o usuário clica com o mouse
    scene.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        startX = event.pageX; // Salva a posição inicial do X
        // Remove a transição durante o arraste para que o movimento seja instantâneo
        carousel.style.transition = 'none'; 
        scene.style.cursor = 'grabbing'; // Muda o cursor para indicar que está arrastando
    });

    // 2. Quando o usuário move o mouse (enquanto está clicado)
    window.addEventListener('mousemove', (event) => {
        if (!isMouseDown) return; // Se o mouse não estiver pressionado, não faz nada

        // Calcula a distância que o mouse se moveu
        const deltaX = event.pageX - startX;
        
        // Ajuste a sensibilidade do arraste aqui. Um número menor torna o arraste mais "lento".
        const rotationSensitivity = 0.1;
        const rotationDelta = deltaX * rotationSensitivity;

        // Aplica a rotação em tempo real
        carousel.style.transform = `rotateY(${currentAngle + rotationDelta}deg)`;
    });

    // 3. Quando o usuário solta o botão do mouse
    window.addEventListener('mouseup', (event) => {
        if (!isMouseDown) return; // Se não estava arrastando, não faz nada

        isMouseDown = false;
        scene.style.cursor = 'grab'; // Volta o cursor ao normal

        // Calcula a distância final do arraste para atualizar o ângulo
        const deltaX = event.pageX - startX;
        const rotationSensitivity = 0.5;
        currentAngle += deltaX * rotationSensitivity;

        // Chama a função para ajustar ao item mais próximo
        snapToClosestItem();
    });

    // Bônus: Mudar o cursor para indicar que o carrossel é "arrastável"
    scene.style.cursor = 'grab';