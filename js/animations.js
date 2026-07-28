/* animation helpers for reveal effects, sparkle bursts, and developer previews */
const animationConfig = {
  revealDelay: 180,
  revealStagger: 140,
};

function revealElements(container = document) {
  const elements = Array.from(container.querySelectorAll('[data-animate]'));
  elements.forEach((element, index) => {
    const delay = (element.dataset.delay ? Number(element.dataset.delay) : 0) + index * animationConfig.revealStagger;
    element.style.animationDelay = `${delay}ms`;
    element.classList.add('visible');
  });
}

function createCelebrationEffects(parent = document.body) {
  const confettiCount = 28;
  for (let i = 0; i < confettiCount; i += 1) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    const size = 6 + Math.random() * 10;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 1.4}px`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${-20 - Math.random() * 10}px`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    parent.appendChild(confetti);

    const horizontalMotion = (Math.random() - 0.5) * 160;
    const duration = 2600 + Math.random() * 1200;
    confetti.animate(
      [
        { transform: `translate(0, 0) rotate(${Math.random() * 360}deg)`, opacity: 1 },
        {
          transform: `translate(${horizontalMotion}px, ${600 + Math.random() * 180}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
    ).onfinish = () => confetti.remove();
  }

  const hearts = 10;
  for (let j = 0; j < hearts; j += 1) {
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.textContent = '❤';
    heart.style.left = `${20 + Math.random() * 60}%`;
    heart.style.top = `${80 + Math.random() * 10}%`;
    parent.appendChild(heart);

    const travelX = (Math.random() - 0.5) * 120;
    const travelY = -260 - Math.random() * 90;
    const opacityEnd = 0.05;
    const duration = 3000 + Math.random() * 1000;
    heart.animate(
      [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${travelX}px, ${travelY}px) scale(1.3)`, opacity: opacityEnd },
      ],
      { duration, easing: 'cubic-bezier(.21,.81,.38,1)', fill: 'forwards' }
    ).onfinish = () => heart.remove();
  }
}

function previewCelebration() {
  createCelebrationEffects(document.body);
}

function bindScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('visible');
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('[data-animate]').forEach((element) => observer.observe(element));
}
