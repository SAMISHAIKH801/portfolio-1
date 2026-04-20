







        (function() {
            const textElement = document.getElementById('denAnimatedText');
            if(!textElement) return;
            
            const words = textElement.innerText.split(' ');
            textElement.innerHTML = '';

            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'den-word';
                word.split('').forEach((char, charIndex) => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'den-char';
                    charSpan.innerText = char;
                    charSpan.style.animationDelay = `${(wordIndex * 0.12) + (charIndex * 0.03)}s`;
                    wordSpan.appendChild(charSpan);
                });
                textElement.appendChild(wordSpan);
            });
        })();
 






// ---------------------- work page js start ------------------






        function splitText() {
            document.querySelectorAll('.project-animate-text').forEach(el => {
                const text = el.innerText;
                el.innerHTML = '';
                [...text].forEach(char => {
                    const box = document.createElement('span');
                    box.className = 'project-char-box';
                    const span = document.createElement('span');
                    span.className = 'project-char';
                    span.innerText = char === ' ' ? '\u00A0' : char;
                    box.appendChild(span);
                    el.appendChild(box);
                });
            });
        }
        splitText();

        const pCursor = document.querySelector("#portfolio-cursor");
        if (pCursor && window.innerWidth > 768) {
            window.addEventListener("mousemove", (e) => {
                gsap.to(pCursor, { x: e.clientX, y: e.clientY, duration: 0.15 });
            });
            document.querySelectorAll(".project-card-link").forEach(link => {
                link.addEventListener("mouseenter", () => gsap.to(pCursor, { scale: 1, duration: 0.4 }));
                link.addEventListener("mouseleave", () => gsap.to(pCursor, { scale: 0, duration: 0.4 }));
            });
        }

        function killPortfolioScrollTriggersOnly() {
            ScrollTrigger.getAll().forEach((st) => {
                let tr = st.trigger;
                if (typeof tr === 'string') tr = document.querySelector(tr);
                if (tr && tr.closest && tr.closest('.portfolio-work-section')) st.kill();
            });
        }

        function initAnimations() {
            killPortfolioScrollTriggersOnly();
            document.querySelectorAll(".portfolio-work-section .project-card-item").forEach((card) => {
                const link = card.closest(".project-card-link");
                if (link && window.getComputedStyle(link).display === "none") return;

                const box = card.querySelector(".project-reveal-box");
                const img = card.querySelector(".project-reveal-img");
                const overlay = card.querySelector(".upcoming-overlay");
                const chars = card.querySelectorAll(".project-char");
                if (!box) return;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true
                    }
                });
                gsap.set(chars, { y: "105%" });
                tl.to(box, { visibility: "visible", duration: 0 })
                  .fromTo(box,
                    { y: 60, clipPath: "inset(100% 0% 0% 0%)" },
                    { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out" }
                  );
                if (img) {
                    tl.from(img, { scale: 1.4, duration: 1.6, ease: "expo.out" }, "<");
                } else if (overlay) {
                    tl.from(overlay,
                        { opacity: 0, y: 24, scale: 0.96, duration: 1.2, ease: "expo.out" },
                        "<"
                    );
                }
                tl.to(chars, { y: "0%", stagger: 0.012, duration: 0.7, ease: "power3.out" }, "-=0.8");
            });
            ScrollTrigger.refresh();
        }

        window.initPortfolioCardAnimations = initAnimations;

        window.addEventListener('load', () => {
            if (document.querySelector('.portfolio-work-section .project-card-link')) initAnimations();
        });
 











// ---------------------- work page js start ------------------