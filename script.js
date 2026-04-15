



// Awwwards-style Deep Smooth Scroll
const lenis = new Lenis({
    duration: 2.2,          // Scroll ka momentum thoda lamba chalega (Slow stop)
    lerp: 0.04,             // [SABSE ZAROORI] Isse kam karne se scroll "makhann" ho jata hai (Range: 0.01 - 0.1)
    wheelMultiplier: 0.7,   // Mouse wheel ki speed thodi kam kar di taake "slow" feel aaye
    smoothWheel: true,
    syncTouch: true,        // Mobile par bhi wahi slow premium feel
    orientation: 'vertical',
});

// ScrollTrigger ko update karte rehna zaroori hai
lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Performance optimization
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ------------- page scroll naimtion end -------------- 




// ---------------------- header css start ------------ 




        // --- 1. Robust Letter Animation Logic ---
        function initTextAnimations() {
            document.querySelectorAll('.anim-text').forEach(el => {
                const text = el.textContent;
                const offset = el.dataset.y || 20; // Custom offset for large menu items
                el.innerHTML = '';
                
                // Wrap each character
                [...text].forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.classList.add('char');
                    el.appendChild(span);
                });

                // Smooth Hover Effect
                el.addEventListener('mouseenter', () => {
                    const chars = el.querySelectorAll('.char');
                    gsap.killTweensOf(chars); // Prevent glitching on fast hover
                    
                    gsap.timeline()
                        .to(chars, {
                            y: -offset, 
                            stagger: 0.02, 
                            duration: 0.3, 
                            ease: "power2.in"
                        })
                        .set(chars, { y: offset })
                        .to(chars, {
                            y: 0, 
                            stagger: 0.02, 
                            duration: 0.4, 
                            ease: "power2.out"
                        });
                });
            });
        }

        initTextAnimations();

      // --- Desktop Sticky Burger Reveal Logic ---
if (window.innerWidth > 768) {
    gsap.to(".sticky-burger", {
        scrollTrigger: {
            trigger: "body",
            start: "top -120", // Jab 120px scroll hoga tab aayega
            toggleActions: "play none none reverse",
            onEnter: () => gsap.set(".sticky-burger", { visibility: "visible" }),
            onLeaveBack: () => gsap.set(".sticky-burger", { visibility: "hidden" })
        },
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
    });
}

// Baki ka Overlay logic (toggleMenu/hideMenu) wahi rahega jo pehle tha.

        // --- 3. Overlay Menu Timeline ---
        const menuOverlay = document.querySelector('.menu-overlay');
        let menuTl = gsap.timeline({ paused: true });

        menuTl.to(menuOverlay, {
            clipPath: "circle(150% at 100% 0%)",
            duration: 1.2,
            ease: "expo.inOut",
            onStart: () => menuOverlay.classList.add('active')
        })
        .from(".menu-link .char", {
            y: 100,
            stagger: 0.02,
            duration: 0.8,
            ease: "power4.out"
        }, "-=0.7")
        .from(".social-link", {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.5
        }, "-=0.5");

        function toggleMenu() { menuTl.play(); }
        function hideMenu() { 
            menuTl.reverse();
            setTimeout(() => menuOverlay.classList.remove('active'), 1200);
        }

        document.getElementById('desktop-trigger').addEventListener('click', toggleMenu);
   




// ---------------------- header css end ------------ 





   
        gsap.registerPlugin(ScrollTrigger);

        window.addEventListener("load", function() {
            const tl = gsap.timeline({ 
                defaults: { ease: "expo.out", duration: 1.8 } 
            });

            tl.set("#mainReveal", { autoAlpha: 1 });

            // Entrance Animation
            tl.from("#mainReveal", { yPercent: 100 })
              .from("#heroImg", { yPercent: -100, scale: 1.3 }, "<")
              .fromTo("#locationBox", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.2")
              .fromTo("#freelanceBox", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "<")
              .fromTo("#marqueeBox", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=1");

            // Marquee Loop
            let marquee = document.getElementById("marqueeContent");
            let marqueeTween = gsap.to(marquee, {
                xPercent: -50, 
                duration: 18,
                repeat: -1,
                ease: "none"
            });

            // Fast Marquee on Scroll
            gsap.to(marqueeTween, {
                timeScale: 4,
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Parallax Effect (Disabled on mobile for cleaner look if needed)
            if (window.innerWidth > 168) {
                gsap.to("#heroImg", {
                    y: 180,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero-section",
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });
   






        //   <!-- --------------------------- about section js start ---------------------  -->


 
        gsap.registerPlugin(ScrollTrigger);

        // 1. Splitting Logic (Waisa hi rahega)
        const leftTextContainer = document.getElementById('text');
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

        const allWords = document.querySelectorAll('.word');
        const allChars = document.querySelectorAll('.char');

        // 2. Left Side: POORA WORD EK SAATH WHITE HOGA
        gsap.to(allWords, {
            scrollTrigger: {
                trigger: ".manifesto-container",
                start: "top top",
                end: "+=2000",
                scrub: 0.1, // Isko thora fast rakha hai taake snap feel barh jaye
                pin: true,
            },
            color: "#e8e2d6",
            stagger: 0.1,
            duration: 0.05, // Bohot kam duration takay letter-by-letter na lage
            ease: "power1.inOut" 
        });

        // 3. Right Side: Auto Play (Waisa hi rahega)
        gsap.to(allChars, {
            scrollTrigger: {
                trigger: ".manifesto-container",
                start: "top 40%",
                toggleActions: "play none none none",
                scrub: false
            },
            y: "0%",
            stagger: 0.01,
            duration: 1,
            ease: "power3.out"
        });
    

    // <!-- --------------------------- about section  js end ---------------------  -->









    // ----------------------- skill section js start -------------------


        document.addEventListener('DOMContentLoaded', () => {
        const portfolioSection = document.getElementById('portfolio');
        const progressLine = document.getElementById('scroll-progress');

        // 1. Scroll Progress Line Logic
        const updateProgress = () => {
            if (!portfolioSection || !progressLine) return;
            const sectionRect = portfolioSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const startPoint = windowHeight * 0.8;
            const currentPosition = startPoint - sectionRect.top;
            let progress = currentPosition / sectionRect.height;
            
            progress = Math.max(0, Math.min(1, progress));
            progressLine.style.height = `${progress * 100}%`;
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        // 2. Heading Split Text
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

        // 3. REFINED INTERSECTION OBSERVER
        // Isse elements tab reveal honge jab wo screen ke center ke qareeb honge
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    const rows = entry.target.querySelectorAll('.list-row');
                    rows.forEach((row, index) => {
                        // Staggered timing for premium feel
                        setTimeout(() => {
                            row.classList.add('show');
                        }, 200 + (index * 200)); 
                    });

                    revealObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.25, // Trigger tab hoga jab section ka 25% hissa nazar aaye
            rootMargin: "0px 0px -20% 0px" // Bottom se 20% gap rakha hai (Center-ish trigger)
        });

        document.querySelectorAll('.column').forEach(col => revealObserver.observe(col));

        // 4. Direction-aware Hover (Desktop Only)
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





        // ----------------------- skill section js end -------------------





        // --------------- work sec js start ----------------



     
      gsap.registerPlugin(ScrollTrigger);

        // 1. Splitting Title into Words
        const pTitle = document.getElementById('portfolio-title-trigger');
        if(pTitle) {
            const words = pTitle.innerText.split(' ');
            pTitle.innerHTML = '';
            words.forEach(word => {
                const span = document.createElement('span');
                span.classList.add('featured-title-word');
                span.innerText = word;
                pTitle.appendChild(span);
                pTitle.appendChild(document.createTextNode(' '));
            });
        }

        // 2. Splitting Project Text into Characters
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

       // 3. UPDATED CURSOR LOGIC (Better Movement)
        const pCursor = document.querySelector("#portfolio-cursor");
        
        if(pCursor) {
            // Mouse move logic with quick GSAP follow
            window.addEventListener("mousemove", (e) => {
                gsap.to(pCursor, { 
                    x: e.clientX, 
                    y: e.clientY, 
                    duration: 0.10, 
                    ease: "power2.out" 
                });
            });

            document.querySelectorAll(".project-card-link").forEach(link => {
                link.addEventListener("mouseenter", () => gsap.to(pCursor, { scale: 1, duration: 0.3 }));
                link.addEventListener("mouseleave", () => gsap.to(pCursor, { scale: 0, duration: 0.3 }));
            });
        }

        // 4. Title Animation
        gsap.to(".featured-title-word", {
            scrollTrigger: {
                trigger: ".portfolio-header-row",
                start: "top 80%",
                end: "bottom 20%",
                scrub: 0.5,
            },
            color: "#ffffff",
            stagger: 0.1
        });

        // 5. Project Cards Reveal Animation
        document.querySelectorAll(".project-card-item").forEach((card) => {
            const box = card.querySelector(".project-reveal-box");
            const img = card.querySelector(".project-reveal-img");
            const chars = card.querySelectorAll(".project-char");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(box, 
                { yPercent: 50, clipPath: "inset(100% 0% 0% 0%)" }, 
                { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out", visibility: "visible" }
            )
            .from(img, { scale: 1.2, duration: 1.2, ease: "expo.out" }, "<")
            .to(chars, {
                y: "0%",
                stagger: 0.01,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.6");
        });


   // --------------- work sec js start ----------------









         // --------------- contact sec js start ----------------





        (function() {
            gsap.registerPlugin(ScrollTrigger);

            // 1. Marquee Animation
            gsap.to("#isolated-bg-text", {
                x: -500,
                scrollTrigger: {
                    trigger: "#isolated-contact-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2
                }
            });

            // 2. Title Word Split & Reveal (Same as Featured Works)
            const contactTitle = document.getElementById('contact-main-title');
            const words = contactTitle.innerText.split(' ');
            contactTitle.innerHTML = '';
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.classList.add('contact-title-word');
                // Adding <br> for layout if needed (matching your original design)
                if(index === 3) { 
                    contactTitle.appendChild(document.createElement('br'));
                }
                span.innerText = word;
                contactTitle.appendChild(span);
                contactTitle.appendChild(document.createTextNode(' '));
            });

            gsap.to(".contact-title-word", {
                scrollTrigger: {
                    trigger: "#isolated-contact-section",
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 0.5,
                },
                color: "#ffffff",
                stagger: 0.1
            });

            // 3. Magnetic Effect Logic
            const wrap = document.querySelector('#contact-mag-area');
            const btn = document.querySelector('#contact-mag-btn');

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.4; 
                const y = (e.clientY - rect.top - rect.height / 2) * 0.4;

                gsap.to(btn, {
                    x: x,
                    y: y,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            wrap.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        })();





            // --------------- contact sec js end ----------------