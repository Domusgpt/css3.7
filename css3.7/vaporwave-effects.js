// Vaporwave effects for Clear Seas Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Set up digital rain effect
    setupDigitalRain();
    
    // Initialize VHS distortion effects
    initVHSDistortion();
    
    // Set up CRT scan effect
    setupCRTScan();
    
    // Initialize holographic overlay animations
    initHolographicOverlays();
  });
  
  // Create digital rain matrix effect
  function setupDigitalRain() {
    const container = document.createElement('div');
    container.className = 'digital-rain';
    document.body.appendChild(container);
    
    // Create 15 rain columns with random positions and speeds
    for (let i = 0; i < 15; i++) {
      createRainColumn(container);
    }
  }
  
  function createRainColumn(container) {
    const column = document.createElement('div');
    column.className = 'rain-column';
    
    // Set random position
    column.style.left = `${Math.random() * 100}%`;
    
    // Set random animation duration between 10 and 20 seconds
    const duration = 10 + Math.random() * 10;
    column.style.animationDuration = `${duration}s`;
    
    // Add random characters
    const chars = '01010101アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const length = 20 + Math.floor(Math.random() * 30);
    
    for (let i = 0; i < length; i++) {
      const span = document.createElement('span');
      span.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
      column.appendChild(span);
    }
    
    container.appendChild(column);
    
    // Remove and recreate after animation completes
    setTimeout(() => {
      column.remove();
      createRainColumn(container);
    }, duration * 1000);
  }
  
  // VHS distortion effect
  function initVHSDistortion() {
    // Create VHS distortion element if it doesn't exist
    if (!document.querySelector('.vhs-distortion')) {
      const vhsEffect = document.createElement('div');
      vhsEffect.className = 'vhs-distortion';
      document.body.appendChild(vhsEffect);
    }
    
    // Randomly trigger VHS distortion effect
    setInterval(() => {
      const vhsEffect = document.querySelector('.vhs-distortion');
      if (Math.random() < 0.2) { // 20% chance
        vhsEffect.classList.add('active');
        
        // Add CRT flicker to the body
        document.body.classList.add('crt-flicker');
        
        setTimeout(() => {
          vhsEffect.classList.remove('active');
          document.body.classList.remove('crt-flicker');
        }, 200 + Math.random() * 300);
      }
    }, 5000);
  }
  
  // CRT scan line effect
  function setupCRTScan() {
    const scanLine = document.createElement('div');
    scanLine.className = 'crt-scan';
    document.body.appendChild(scanLine);
    
    // Animate the scan line
    animateScanLine(scanLine);
  }
  
  function animateScanLine(scanLine) {
    gsap.fromTo(scanLine, 
      { top: 0 },
      { 
        top: '100%', 
        duration: 2, 
        ease: 'none',
        onComplete: () => {
          // Random delay before next scan
          setTimeout(() => {
            scanLine.style.top = '0';
            animateScanLine(scanLine);
          }, Math.random() * 5000 + 2000);
        }
      }
    );
  }
  
  // Holographic overlay effects
  function initHolographicOverlays() {
    // Add holographic overlay to each section
    document.querySelectorAll('.section').forEach(section => {
      const overlay = document.createElement('div');
      overlay.className = 'holographic-overlay';
      section.appendChild(overlay);
      
      // Random holographic animations
      animateHolographicOverlay(overlay);
    });
  }
  
  function animateHolographicOverlay(overlay) {
    // Random direction for gradient
    const direction = Math.random() > 0.5 ? '135deg' : '45deg';
    
    // Set gradient animation
    gsap.set(overlay, {
      background: `linear-gradient(${direction}, rgba(255, 0, 255, 0), rgba(0, 255, 247, 0.2) 25%, rgba(255, 0, 255, 0.2) 50%, rgba(0, 255, 247, 0.2) 75%, rgba(255, 0, 255, 0))`,
      backgroundSize: '300% 300%',
      opacity: 0
    });
    
    // Random timing for holographic flares
    setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0.3,
        duration: 0.5,
        onComplete: () => {
          gsap.to(overlay, {
            backgroundPosition: '100% 100%',
            duration: 3,
            ease: 'sine.inOut',
            onComplete: () => {
              gsap.to(overlay, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  // Reset and repeat with random timing
                  gsap.set(overlay, {
                    backgroundPosition: '0% 0%'
                  });
                  animateHolographicOverlay(overlay);
                }
              });
            }
          });
        }
      });
    }, Math.random() * 10000 + 5000);
  }
  
  // Add success animation particles
  function addSuccessAnimation() {
    // Create pixel particles for success animation
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('success-particles');
    document.body.appendChild(particleContainer);
    
    // Create 40 particles
    for (let i = 0; i < 40; i++) {
      createSuccessParticle(particleContainer);
    }
    
    // Remove particles after animation completes
    setTimeout(() => {
      particleContainer.remove();
    }, 3000);
  }
  
  function createSuccessParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('success-particle');
    
    // Random position, color and size
    const size = Math.random() * 8 + 2;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const isBlue = Math.random() > 0.5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.backgroundColor = isBlue ? 'var(--primary)' : 'var(--secondary)';
    
    // Add to container
    container.appendChild(particle);
    
    // Animate
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      opacity: 0,
      duration: 2 + Math.random() * 1,
      ease: 'power2.out'
    });
  }
  
  // Initialize pulse button effect
  function initPulseButton() {
    const pulseButton = document.querySelector('.pulse-effect');
    if (pulseButton) {
      // Create a glow effect
      const glow = document.createElement('div');
      glow.classList.add('button-glow');
      pulseButton.appendChild(glow);
      
      // Animate the glow
      setInterval(() => {
        glow.classList.add('active');
        setTimeout(() => {
          glow.classList.remove('active');
        }, 1000);
      }, 3000);
    }
  }
  
  // Expose functions to global scope for other scripts to use
  window.addSuccessAnimation = addSuccessAnimation;
  window.initPulseButton = initPulseButton;