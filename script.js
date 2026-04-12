
   
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
            if (window.innerWidth > 768) {
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