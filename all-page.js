







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
 
