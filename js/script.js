document.addEventListener('DOMContentLoaded', () => {
    // Simple JS to update year automatically in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Cursor trail effect
    const body = document.body;

    document.addEventListener('mousemove', (e) => {
        // Create a particle (star)
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomly assign a size class
        const starSizes = ['star-small', 'star-medium', 'star-large'];
        const randomSize = starSizes[Math.floor(Math.random() * starSizes.length)];
        particle.classList.add(randomSize);


        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';

        //more magical effect
        const driftX = (Math.random() - 0.5) * 60; // Random horizontal drift between -30px and 30px
        const driftY = (Math.random() - 0.5) * 60; // Random vertical drift


        particle.style.setProperty('--drift-x', driftX);
        particle.style.setProperty('--drift-y', driftY);

        body.appendChild(particle);


        let animationDuration = 1000; // Default in ms
        if(randomSize === 'star-medium') animationDuration = 1200;
        if(randomSize === 'star-large') animationDuration = 1500;

        setTimeout(() => {
            if (particle.parentNode) { // Check if it hasn't been removed already
                particle.parentNode.removeChild(particle);
            }
        }, animationDuration);
    });

    // Animated Lanterns Effect
    const lanternContainer = document.body;
    const numLanterns = 5; // Можно уменьшить количество для более спокойного эффекта
    const lanterns = [];

    const lanternBodyColors = [ // Используем RGBA для прозрачности
        'rgba(231, 76, 60, 0.6)',
        'rgba(211, 84, 0, 0.6)',
        'rgba(192, 57, 43, 0.6)',
        'rgba(230, 126, 34, 0.6)'
    ];
    const lanternLightColors = ['rgba(241, 196, 15, 0.5)', 'rgba(243, 156, 18, 0.5)']; // Теплые желтые/оранжевые для света

    function createLantern(index) {
        const lanternElement = document.createElement('div');
        lanternElement.classList.add('js-lantern'); // opacity: 0 by default

        const bodyEl = document.createElement('div');
        bodyEl.classList.add('js-lantern-body');
        bodyEl.style.backgroundColor = lanternBodyColors[Math.floor(Math.random() * lanternBodyColors.length)];

        const lightEl = document.createElement('div');
        lightEl.classList.add('js-lantern-light');
        lightEl.style.backgroundColor = lanternLightColors[Math.floor(Math.random() * lanternLightColors.length)];
        bodyEl.appendChild(lightEl);

        const tasselEl = document.createElement('div');
        tasselEl.classList.add('js-lantern-tassel');
        tasselEl.style.backgroundColor = lightEl.style.backgroundColor; // Кисточка в цвет света

        lanternElement.appendChild(bodyEl);
        lanternElement.appendChild(tasselEl);

        const randomScale = 0.6 + Math.random() * 0.5; // 0.6 to 1.1
        lanternElement.style.transform = `scale(${randomScale})`;

        // Делаем фонарик видимым с задержкой для эффекта "появления"
        setTimeout(() => {
            lanternElement.classList.add('visible');
        }, Math.random() * 2000 + 500); // Появятся в течение 0.5 - 2.5 секунд

        lanternContainer.appendChild(lanternElement);

        return {
            element: lanternElement,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + Math.random() * 300 + 150, // Start further below
            speedY: 0.15 + Math.random() * 0.2, // Slower: 0.15 to 0.35
            swayAngle: Math.random() * Math.PI * 2,
            swaySpeed: 0.005 + Math.random() * 0.005, // Slower sway
            swayAmplitude: 5 + Math.random() * 10,  // Much smaller sway (5 to 15px)
            scale: randomScale
        };
    }

    for (let i = 0; i < numLanterns; i++) {
        lanterns.push(createLantern(i));
    }

    function animateLanterns() {
        lanterns.forEach(lantern => {
            lantern.y -= lantern.speedY;

            // Легкое покачивание
            lantern.swayAngle += lantern.swaySpeed;
            const swayOffset = Math.sin(lantern.swayAngle) * lantern.swayAmplitude;

            // Позиционируем относительно центра фонарика по X
            const lanternWidth = lantern.element.offsetWidth;
            lantern.element.style.left = (lantern.x - lanternWidth / 2 + swayOffset) + 'px';
            lantern.element.style.bottom = (window.innerHeight - lantern.y) + 'px'; // ИЗМЕНЕНО: bottom вместо top для позиционирования от низа

            const lanternHeight = lantern.element.offsetHeight;
            if (lantern.y < -lanternHeight - 50) { // Даем уйти чуть дальше за экран перед сбросом
                // Сброс фонарика
                lantern.y = window.innerHeight + Math.random() * 200 + lanternHeight; // Позиция Y для старта снизу
                lantern.x = Math.random() * window.innerWidth;
                lantern.speedY = 0.15 + Math.random() * 0.2; // Сбрасываем скорость

                // Прячем и снова показываем для эффекта "нового" фонарика
                lantern.element.classList.remove('visible');
                setTimeout(() => {
                    // Можно обновить цвет фонарика при "перезапуске"
                    lantern.element.querySelector('.js-lantern-body').style.backgroundColor = lanternBodyColors[Math.floor(Math.random() * lanternBodyColors.length)];
                    lantern.element.querySelector('.js-lantern-light').style.backgroundColor = lanternLightColors[Math.floor(Math.random() * lanternLightColors.length)];
                    lantern.element.classList.add('visible');
                }, 500); // Задержка перед повторным появлением
            }
        });

        requestAnimationFrame(animateLanterns);
    }

    if (lanterns.length > 0) {
        animateLanterns();
    }
});