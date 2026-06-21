document.addEventListener('DOMContentLoaded', () => {

    // 1. Fluid Lag-Free Mouse Interaction Follower
    const mouseGlow = document.querySelector('.mouse-glow');
    const mouseDot = document.querySelector('.mouse-dot');
    
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    let dotX = targetX;
    let dotY = targetY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function processMousePhysics() {
        // Linear Interpolation loop for elegant smooth easing physics
        glowX += (targetX - glowX) * 0.06;
        glowY += (targetY - glowY) * 0.06;
        
        dotX += (targetX - dotX) * 0.16;
        dotY += (targetY - dotY) * 0.16;

        mouseGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
        mouseDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(processMousePhysics);
    }
    processMousePhysics();

    // Scaling micro-interaction on hovering active interactive links
    const interactiveTargets = document.querySelectorAll('.hover-target, a, button, .tilt-element');
    interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            mouseDot.classList.add('active');
        });
        target.addEventListener('mouseleave', () => {
            mouseDot.classList.remove('active');
        });
    });

    // 2. 3D Parallax Tilt Vector Tracker for Cards
    const tiltCards = document.querySelectorAll('.tilt-element');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const boundary = card.getBoundingClientRect();
            const mouseInCardX = e.clientX - boundary.left;
            const mouseInCardY = e.clientY - boundary.top;

            const cardHalfWidth = boundary.width / 2;
            const cardHalfHeight = boundary.height / 2;

            // Calculate rotational ranges
            const degreeRotationX = (cardHalfHeight - mouseInCardY) / 15;
            const degreeRotationY = (mouseInCardX - cardHalfWidth) / 15;

            card.style.transform = `perspective(1000px) rotateX(${degreeRotationX}deg) rotateY(${degreeRotationY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 3. Micro-Interaction Reactive Bag Counter Updates
    let bagTotalItems = 0;
    const countBadge = document.querySelector('.cart-count');
    const quickAddButtons = document.querySelectorAll('.bag-add-trigger');

    quickAddButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            bagTotalItems++;
            countBadge.textContent = bagTotalItems;

            // Trigger structural scaling dynamic animation
            countBadge.style.transform = 'scale(1.4)';
            setTimeout(() => {
                countBadge.style.transform = 'scale(1)';
            }, 200);

            // Interface visual confirmation feedback loop
            const dynamicPreviousMarkup = btn.textContent;
            btn.textContent = "Added to Bag";
            btn.style.backgroundColor = "#8B008B";
            
            setTimeout(() => {
                btn.textContent = dynamicPreviousMarkup;
                btn.style.backgroundColor = "";
            }, 1000);
        });
    });
});