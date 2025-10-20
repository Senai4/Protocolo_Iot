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

// Carrossel de imagens

const scene = document.querySelector('.scene');
    const items = document.querySelectorAll('.item');
    const numItems = items.length;

    let activeIndex = 0;
    let isMouseDown = false;
    let startX = 0;
    let dragThreshold = 100; // Distância em pixels para registrar um "arraste"

    function updatePositions() {
        items.forEach((item, index) => {
            let pos = index - activeIndex;

            if (pos < -Math.floor(numItems / 2)) {
                pos += numItems;
            } else if (pos > Math.floor(numItems / 2)) {
                pos -= numItems;
            }
            
            item.dataset.pos = pos;
        });
    }

    function startDrag(event) {
        isMouseDown = true;
        startX = event.pageX || event.touches[0].pageX;
        scene.style.cursor = 'grabbing';
        // Remove a transição para o arraste ser direto
        items.forEach(item => item.style.transition = 'none');
    }

    function stopDrag(event) {
        if (!isMouseDown) return;
        isMouseDown = false;
        scene.style.cursor = 'grab';
        // Restaura a transição para a animação de "snap"
        items.forEach(item => item.style.transition = '');

        const endX = event.pageX || event.changedTouches[0].pageX;
        const deltaX = endX - startX;

        if (deltaX > dragThreshold) {
            activeIndex--;
        } else if (deltaX < -dragThreshold) {
            activeIndex++;
        }

        // Garante que o índice sempre "dê a volta"
        activeIndex = (activeIndex + numItems) % numItems;

        updatePositions();
    }
    
    // Event Listeners
    scene.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', (event) => {
      // Previne o arraste de texto/imagens padrão do navegador
      if(isMouseDown) {
        event.preventDefault();
      }
    });

    // Mobile
    scene.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
    
    // Define o estado inicial
    updatePositions();