document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const toggleModeButton = document.getElementById('toggle-mode');
    const body = document.body;
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    toggleModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        header.classList.toggle('dark-mode');
        sections.forEach(section => section.classList.toggle('dark-mode'));

        if (body.classList.contains('dark-mode')) {
            toggleModeButton.textContent = 'Day Mode';
        } else {
            toggleModeButton.textContent = 'Night Mode';
        }
    });

    portfolioItems.forEach(item => {
        const slider = item.querySelector('.image-slider');
        const dotsContainer = item.querySelector('.slider-dots');
        const images = slider.getAttribute('data-images').split(',');

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            if (index === 0) img.style.display = 'block';
            slider.appendChild(img);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        let currentIndex = 0;

        const showSlide = (index) => {
            const allImages = slider.querySelectorAll('img');
            const allDots = dotsContainer.querySelectorAll('.dot');

            allImages.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
                allDots[i].classList.toggle('active', i === index);
            });

            currentIndex = index;
        };

        dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        slider.addEventListener('click', () => {
            showSlide((currentIndex + 1) % images.length);
        });
    });
});
