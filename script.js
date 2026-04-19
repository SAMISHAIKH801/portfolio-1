// GSAP Register
gsap.registerPlugin(ScrollTrigger);

// 1. Awwwards-style Deep Smooth Scroll (Har page par chalega)
const lenis = new Lenis({
    duration: 2.2,
    lerp: 0.04,
    wheelMultiplier: 0.7,
    smoothWheel: true,
    syncTouch: true,
    orientation: 'vertical',
});

lenis.on('scroll', ScrollTrigger.update);
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// 2. Header & Menu Animations (Har page par apply hoga)
function initTextAnimations() {
    document.querySelectorAll('.anim-text').forEach(el => {
        // Keep CTA button text stable to avoid initial load width jump
        if (el.classList.contains('btn-text-wrap')) return;

        const text = el.textContent;
        const offset = el.dataset.y || 20;
        el.innerHTML = '';
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.classList.add('char');
            el.appendChild(span);
        });

        el.addEventListener('mouseenter', () => {
            const chars = el.querySelectorAll('.char');
            gsap.killTweensOf(chars);
            gsap.timeline()
                .to(chars, { y: -offset, stagger: 0.02, duration: 0.3, ease: "power2.in" })
                .set(chars, { y: offset })
                .to(chars, { y: 0, stagger: 0.02, duration: 0.4, ease: "power2.out" });
        });
    });
}
initTextAnimations();

if (window.innerWidth > 768 && document.querySelector(".sticky-burger")) {
    gsap.to(".sticky-burger", {
        scrollTrigger: {
            trigger: "body",
            start: "top -120",
            toggleActions: "play none none reverse",
            onEnter: () => gsap.set(".sticky-burger", { visibility: "visible" }),
            onLeaveBack: () => gsap.set(".sticky-burger", { visibility: "hidden" })
        },
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
    });
}

const menuOverlay = document.querySelector('.menu-overlay');
if (menuOverlay) {
    let menuTl = gsap.timeline({ paused: true });
    menuTl.to(menuOverlay, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 1.2,
        ease: "expo.inOut",
        onStart: () => menuOverlay.classList.add('active')
    })
    .from(".menu-link .char", { y: 100, stagger: 0.02, duration: 0.8, ease: "power4.out" }, "-=0.7")
    .from(".social-link", { opacity: 0, y: 15, stagger: 0.08, duration: 0.5 }, "-=0.5");

    window.toggleMenu = () => { menuTl.play(); };
    window.hideMenu = () => { 
        menuTl.reverse();
        setTimeout(() => menuOverlay.classList.remove('active'), 1200);
    };

    const trigger = document.getElementById('desktop-trigger');
    if(trigger) trigger.addEventListener('click', toggleMenu);
}


// 3. Hero Section Reveal (Sirf Index/Hero wale page par)
window.addEventListener("load", function() {
    if (document.getElementById("mainReveal")) {
        const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.8 } });
        tl.set("#mainReveal", { autoAlpha: 1 });
        tl.from("#mainReveal", { yPercent: 100 })
          .from("#heroImg", { yPercent: -100, scale: 1.3 }, "<")
          .fromTo("#locationBox", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.2")
          .fromTo("#freelanceBox", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "<")
          .fromTo("#marqueeBox", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=1");

        let marquee = document.getElementById("marqueeContent");
        if (marquee) {
            let marqueeTween = gsap.to(marquee, { xPercent: -50, duration: 18, repeat: -1, ease: "none" });
            gsap.to(marqueeTween, {
                timeScale: 4,
                scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 }
            });
        }

        if (window.innerWidth > 168 && document.querySelector("#heroImg")) {
            gsap.to("#heroImg", {
                y: 180, ease: "none",
                scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
            });
        }
    }
});


// 4. About / Manifesto Section (Condition check ke saath)
const leftTextContainer = document.getElementById('text');
if (leftTextContainer) {
    const leftLines = leftTextContainer.querySelectorAll('.line');
    leftLines.forEach(line => {
        const words = line.innerText.split(' ');
        line.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.classList.add('word');
            span.innerText = word;
            line.appendChild(span);
            line.appendChild(document.createTextNode(' '));
        });
    });

    const bioElement = document.getElementById('bio');
    if (bioElement) {
        const characters = bioElement.innerText.split('');
        bioElement.innerHTML = '';
        characters.forEach(char => {
            const charBox = document.createElement('span');
            charBox.classList.add('char-box');
            const charSpan = document.createElement('span');
            charSpan.classList.add('char');
            charSpan.innerText = char;
            charBox.appendChild(charSpan);
            bioElement.appendChild(charBox);
        });
    }

    gsap.to(document.querySelectorAll('.word'), {
        scrollTrigger: { trigger: ".manifesto-container", start: "top top", end: "+=2000", scrub: 0.1, pin: true },
        color: "#e8e2d6", stagger: 0.1, duration: 0.05, ease: "power1.inOut"
    });

    gsap.to(document.querySelectorAll('.char'), {
        scrollTrigger: { trigger: ".manifesto-container", start: "top 40%", toggleActions: "play none none none" },
        y: "0%", stagger: 0.01, duration: 1, ease: "power3.out"
    });
}


// 5. Skill Section Logic
document.addEventListener('DOMContentLoaded', () => {
    const portfolioSection = document.getElementById('portfolio');
    const progressLine = document.getElementById('scroll-progress');
    if (portfolioSection && progressLine) {
        const updateProgress = () => {
            const sectionRect = portfolioSection.getBoundingClientRect();
            const startPoint = window.innerHeight * 0.8;
            const currentPosition = startPoint - sectionRect.top;
            let progress = Math.max(0, Math.min(1, currentPosition / sectionRect.height));
            progressLine.style.height = `${progress * 100}%`;
        };
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    document.querySelectorAll('.main-heading').forEach(h => {
        const text = h.textContent;
        h.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.transitionDelay = `${i * 40}ms`;
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            h.appendChild(span);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.querySelectorAll('.list-row').forEach((row, index) => {
                    setTimeout(() => { row.classList.add('show'); }, 200 + (index * 200));
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25, rootMargin: "0px 0px -20% 0px" });

    document.querySelectorAll('.column').forEach(col => revealObserver.observe(col));

    if (window.innerWidth > 900) {
        document.querySelectorAll('.list-row').forEach(row => {
            const bg = row.querySelector('.hover-bg');
            if(!bg) return;
            row.addEventListener('mouseenter', (e) => {
                const rect = row.getBoundingClientRect();
                const entryY = e.clientY - rect.top;
                bg.style.transition = 'none';
                bg.style.transform = (entryY < rect.height / 2) ? 'translateY(-100%)' : 'translateY(100%)';
                requestAnimationFrame(() => {
                    bg.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
                    bg.style.transform = 'translateY(0)';
                });
            });
            row.addEventListener('mouseleave', (e) => {
                const rect = row.getBoundingClientRect();
                const exitY = e.clientY - rect.top;
                bg.style.transform = (exitY < rect.height / 2) ? 'translateY(-100%)' : 'translateY(100%)';
            });
        });
    }
});


// 6. Work / Portfolio Section
const pTitle = document.getElementById('portfolio-title-trigger');
if (pTitle) {
    const words = pTitle.innerText.split(' ');
    pTitle.innerHTML = '';
    words.forEach(word => {
        const span = document.createElement('span');
        span.classList.add('featured-title-word');
        span.innerText = word;
        pTitle.appendChild(span);
        pTitle.appendChild(document.createTextNode(' '));
    });

    gsap.to(".featured-title-word", {
        scrollTrigger: { trigger: ".portfolio-header-row", start: "top 80%", end: "bottom 20%", scrub: 0.5 },
        color: "#ffffff", stagger: 0.1
    });
}

document.querySelectorAll('.project-animate-text').forEach(el => {
    const chars = el.innerText.split('');
    el.innerHTML = '';
    chars.forEach(char => {
        const box = document.createElement('span');
        box.classList.add('project-char-box');
        const span = document.createElement('span');
        span.classList.add('project-char');
        span.innerText = char;
        box.appendChild(span);
        el.appendChild(box);
    });
});

const pCursor = document.querySelector("#portfolio-cursor");
if (pCursor) {
    window.addEventListener("mousemove", (e) => {
        gsap.to(pCursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    });
    document.querySelectorAll(".project-card-link").forEach(link => {
        link.addEventListener("mouseenter", () => gsap.to(pCursor, { scale: 1, duration: 0.3 }));
        link.addEventListener("mouseleave", () => gsap.to(pCursor, { scale: 0, duration: 0.3 }));
    });
}

document.querySelectorAll(".project-card-item").forEach((card) => {
    const box = card.querySelector(".project-reveal-box");
    const img = card.querySelector(".project-reveal-img");
    const chars = card.querySelectorAll(".project-char");
    if(box && img) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } });
        tl.fromTo(box, { yPercent: 50, clipPath: "inset(100% 0% 0% 0%)" }, { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out", visibility: "visible" })
          .from(img, { scale: 1.2, duration: 1.2, ease: "expo.out" }, "<")
          .to(chars, { y: "0%", stagger: 0.01, duration: 0.6, ease: "power3.out" }, "-=0.6");
    }
});


// 7. Contact Section
const contactTitle = document.getElementById('contact-main-title');
if (contactTitle) {
    const words = contactTitle.innerText.split(' ');
    contactTitle.innerHTML = '';
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.classList.add('contact-title-word');
        if(index === 3) contactTitle.appendChild(document.createElement('br'));
        span.innerText = word;
        contactTitle.appendChild(span);
        contactTitle.appendChild(document.createTextNode(' '));
    });

    gsap.to(".contact-title-word", {
        scrollTrigger: { trigger: "#isolated-contact-section", start: "top 70%", end: "top 20%", scrub: 0.5 },
        color: "#ffffff", stagger: 0.1
    });

    gsap.to("#isolated-bg-text", {
        x: -500, scrollTrigger: { trigger: "#isolated-contact-section", start: "top bottom", end: "bottom top", scrub: 1.2 }
    });

    const wrap = document.querySelector('#contact-mag-area');
    const btn = document.querySelector('#contact-mag-btn');
    if(wrap && btn) {
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            gsap.to(btn, { x, y, duration: 0.4, ease: "power2.out" });
        });
        wrap.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    }
}


// 8. Branding Section
function initBrandingSection() {
    if (document.querySelector(".branding-section")) {
        gsap.to(".branding-title", {
            y: 0, duration: 1.3, ease: "power4.out", stagger: 0.15,
            scrollTrigger: { trigger: ".branding-section", start: "top 80%" }
        });
        gsap.to(".branding-globe", { rotationY: 360, duration: 5, repeat: -1, ease: "none" });
        gsap.to(".branding-icon-box", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
}
initBrandingSection();










//  ---------------- footer js start ------------------



document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.dsgn-footer');
    const canvasTarget = document.getElementById('matter-container');
    let animationStarted = false;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
    const engine = Engine.create();
    
    // Physics adjustments for stacking
    engine.world.gravity.y = 3; 
    engine.velocityIterations = 8; // More precision for stacking
    engine.positionIterations = 0.5;

    const render = Render.create({
        element: canvasTarget,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio
        }
    });

    const coinImages = [
        'images/wordpress-removebg-preview.png',
        'images/shopify-removebg-preview.png',
        'images/html-removebg-preview.png',
        'images/css-removebg-preview.png',
        'images/js-removebg-preview.png'
    ];

    let ground, leftWall, rightWall;

    function createBoundaries() {
        if (ground) Composite.remove(engine.world, [ground, leftWall, rightWall]);
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Ground ko thoda mota rakha hai taake stacking base solid ho
        ground = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, friction: 1 });
        leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, friction: 1 });
        rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, friction: 1 });

        Composite.add(engine.world, [ground, leftWall, rightWall]);
    }

    function startAnimation() {
        if (animationStarted) return;
        animationStarted = true;

        const isMobile = window.innerWidth < 768;
        const coinCount = isMobile ? 35 : 65; // Mobile ke liye count thoda optimize kiya
        const radius = isMobile ? 12 : 22;   // Size thoda barhaya taake stack nazar aaye

        for (let i = 0; i < coinCount; i++) {
            // Coins ko random width par lekin height mein gap ke sath phenka taake ek sath dhappa na ho
            const x = (Math.random() * (container.clientWidth - 40)) + 20;
            const y = isMobile ? -(i * 30) - 100 : -(i * 20) - 100; 

            const coin = Bodies.circle(x, y, radius, {
                restitution: 0.2, // Bounce kam kar diya (0.2)
                friction: 0.8,    // Friction barha di taake ek dusre par rukein (Stacking)
                frictionAir: 0.05, // Hawa mein thoda slow girein
                density: 0.01,
                render: {
                    sprite: {
                        texture: coinImages[i % coinImages.length],
                        xScale: (radius * 2.2) / 100, 
                        yScale: (radius * 2.2) / 100
                    }
                }
            });
            Composite.add(engine.world, coin);
        }

        createBoundaries();

        const mouse = Mouse.create(container); 
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
        
        Render.run(render);
        Runner.run(Runner.create(), engine);
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Mobile par halka sa delay taake scroll smooth rahe
            setTimeout(startAnimation, 300);
        }
    }, { threshold: 0.1 });

    observer.observe(container);

    window.addEventListener('resize', () => {
        render.canvas.width = container.clientWidth;
        render.canvas.height = container.clientHeight;
        createBoundaries();
    });
});


//  ---------------- footer js end ------------------
