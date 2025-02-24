// Additional vaporwave effects module

document.addEventListener('DOMContentLoaded', () => {
    // Create dynamic VHS distortion effect
    createVHSDistortion();
    
    // Create dynamic CRT scan effect  
    createCRTEffect();
    
    // Create holographic content hover effects
    createHolographicEffects();
    
    // Add digital data streams
    createDataStreams();
    
    // Add ambient audio effects (optional, triggered by user interaction)
    setupAudioEffects();
  });
  
  // ===== VHS Distortion Effect =====
  function createVHSDistortion() {
    // Create the VHS distortion element
    const vhsDistortion = document.createElement('div');
    vhsDistortion.classList.add('vhs-distortion');
    document.body.appendChild(vhsDistortion);
    
    // Randomly apply the distortion effect
    setInterval(() => {
      const shouldDistort = Math.random() > 0.7; // 30% chance
      
      if (shouldDistort) {
        // Add the active class that triggers the CSS animation
        vhsDistortion.classList.add('active');
        
        // Calculate random values for distortion
        const offsetX = Math.random() * 10 - 5; // -5 to 5
        const offsetY = Math.random() * 10 - 5; // -5 to 5
        const blur = Math.random() * 2;
        
        // Apply random distortion using GSAP
        gsap.to(vhsDistortion, {
          x: offsetX,
          y: offsetY,
          opacity: 0.5,
          filter: `blur(${blur}px)`,
          duration: 0.2,
          onComplete: () => {
            setTimeout(() => {
              // Reset the distortion
              gsap.to(vhsDistortion, {
                x: 0,
                y: 0,
                opacity: 0,
                filter: 'blur(0px)',
                duration: 0.2,
                onComplete: () => {
                  vhsDistortion.classList.remove('active');
                }
              });
            }, 200);
          }
        });
      }
    }, 3000);
  }
  
  // ===== CRT Scan Effect =====
  function createCRTEffect() {
    // Create CRT scan line
    const crtScan = document.createElement('div');
    crtScan.classList.add('crt-scan');
    document.body.appendChild(crtScan);
    
    // Animate the scan line
    gsap.to(crtScan, {
      top: '100%',
      duration: 3,
      ease: 'none',
      repeat: -1
    });
    
    // Occasional CRT flicker
    setInterval(() => {
      const shouldFlicker = Math.random() > 0.6; // 40% chance
      
      if (shouldFlicker) {
        // Add whole screen flicker effect
        document.body.classList.add('crt-flicker');
        
        setTimeout(() => {
          document.body.classList.remove('crt-flicker');
        }, 200);
      }
    }, 5000);
  }
  
  // ===== Holographic Hover Effects =====
  function createHolographicEffects() {
    // Add holographic effect to cards
    const cards = document.querySelectorAll('.solution-card, .case-card');
    
    cards.forEach(card => {
      // Create holographic overlay
      const holographicOverlay = document.createElement('div');
      holographicOverlay.classList.add('holographic-overlay');
      card.appendChild(holographicOverlay);
      
      // Add hover effect
      card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const mouseX = e.clientX - cardRect.left;
        const mouseY = e.clientY - cardRect.top;
        
        // Calculate percentage position
        const percentX = mouseX / cardRect.width;
        const percentY = mouseY / cardRect.height;
        
        // Calculate tilt
        const tiltX = (percentY - 0.5) * 15; // -7.5 to 7.5 degrees
        const tiltY = (percentX - 0.5) * -15; // -7.5 to 7.5 degrees
        
        // Apply the tilt effect
        gsap.to(card, {
          rotationX: tiltX,
          rotationY: tiltY,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        // Move holographic effect
        gsap.to(holographicOverlay, {
          backgroundPosition: `${percentX * 100}% ${percentY * 100}%`,
          opacity: 0.3,
          duration: 0.5
        });
      });
      
      // Reset on mouse leave
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        gsap.to(holographicOverlay, {
          opacity: 0,
          duration: 0.5
        });
      });
    });
  }
  
  // ===== Digital Data Streams =====
  function createDataStreams() {
    const streamsContainer = document.createElement('div');
    streamsContainer.classList.add('data-streams-container');
    document.body.appendChild(streamsContainer);
    
    // Create 10 data streams
    for (let i = 0; i < 10; i++) {
      createSingleDataStream(streamsContainer);
    }
    
    // Periodically add new streams
    setInterval(() => {
      if (streamsContainer.children.length < 15) {
        createSingleDataStream(streamsContainer);
      }
    }, 3000);
  }
  
  function createSingleDataStream(container) {
    // Create a stream element
    const stream = document.createElement('div');
    stream.classList.add('data-stream');
    
    // Generate binary text
    let binaryString = '';
    for (let i = 0; i < 20; i++) {
      binaryString += `<span>${Math.round(Math.random())}</span>`;
    }
    stream.innerHTML = binaryString;
    
    // Random position
    const startX = Math.random() * 100;
    stream.style.left = `${startX}%`;
    stream.style.top = '-100px';
    
    // Random direction and speed
    const speed = Math.random() * 5 + 3; // 3-8 seconds
    
    // Add to DOM
    container.appendChild(stream);
    
    // Animate
    gsap.to(stream, {
      top: '100%',
      opacity: 0,
      duration: speed,
      ease: 'none',
      onComplete: () => {
        container.removeChild(stream);
      }
    });
    
    // Animate individual digits
    const digits = stream.querySelectorAll('span');
    digits.forEach((digit, index) => {
      // Random interval for changing digits
      const interval = Math.random() * 500 + 100; // 100-600ms
      
      const changeDigit = () => {
        if (!container.contains(stream)) return; // Stop if stream is removed
        
        digit.textContent = Math.round(Math.random());
        digit.style.color = Math.random() > 0.7 ? 'var(--primary)' : 'var(--secondary)';
        
        setTimeout(changeDigit, interval);
      };
      
      // Start the animation with a delay based on position
      setTimeout(changeDigit, index * 100);
    });
  }
  
  // ===== Ambient Audio Effects =====
  function setupAudioEffects() {
  function setupAudioEffects() {
    // Create audio context
    let audioContext;
    let synthGain;
    let masterGain;
    
    // Setup on first user interaction
    document.addEventListener('click', initAudio, { once: true });
    
    function initAudio() {
      // Create audio context
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create master gain
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.15; // Set low volume
      masterGain.connect(audioContext.destination);
      
      // Create synth gain
      synthGain = audioContext.createGain();
      synthGain.gain.value = 0.2;
      synthGain.connect(masterGain);
      
      // Setup interaction sounds
      setupInteractionSounds();
      
      // Create ambient background synth
      createAmbientSynth();
    }
    
    function setupInteractionSounds() {
      // Add sound on button hover
      const buttons = document.querySelectorAll('.cyber-button, .nav-links li');
      
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          playTone(300 + Math.random() * 200, 0.05, 'sine');
        });
        
        button.addEventListener('click', () => {
          playTone(500 + Math.random() * 200, 0.1, 'sine');
        });
      });
      
      // Add sound on section change
      document.querySelectorAll('.section').forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          onEnter: () => {
            // Play different chord based on section
            const baseFreq = 200 + index * 50;
            playChord(baseFreq, 0.2);
          }
        });
      });
    }
    
    function createAmbientSynth() {
      // Create an LFO for frequency modulation
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      
      lfo.frequency.value = 0.1; // Very slow modulation
      lfoGain.gain.value = 5;
      
      lfo.connect(lfoGain);
      lfo.start();
      
      // Create a pad synth sound
      const padOsc = audioContext.createOscillator();
      padOsc.type = 'sine';
      padOsc.frequency.value = 200;
      
      // Connect LFO to the frequency
      lfoGain.connect(padOsc.frequency);
      
      // Create a filter
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      filter.Q.value = 5;
      
      // Connect oscillator to filter to gain
      padOsc.connect(filter);
      filter.connect(synthGain);
      
      // Start the oscillator
      padOsc.start();
      
      // Modulate the filter over time
      setInterval(() => {
        // Gently modulate filter frequency
        const newFreq = 400 + Math.sin(Date.now() * 0.001) * 300;
        filter.frequency.setTargetAtTime(newFreq, audioContext.currentTime, 1);
      }, 1000);
    }
    
    function playTone(frequency, duration, type = 'sine') {
      if (!audioContext) return;
      
      // Create oscillator
      const osc = audioContext.createOscillator();
      osc.type = type;
      osc.frequency.value = frequency;
      
      // Create envelope
      const envelope = audioContext.createGain();
      envelope.gain.setValueAtTime(0, audioContext.currentTime);
      envelope.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.02);
      envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      // Connect
      osc.connect(envelope);
      envelope.connect(masterGain);
      
      // Play
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    }
    
    function playChord(baseFrequency, duration) {
      if (!audioContext) return;
      
      // Play a vapor-y chord with base frequency
      playTone(baseFrequency, duration, 'sine');
      playTone(baseFrequency * 1.25, duration, 'sine'); // Major third
      playTone(baseFrequency * 1.5, duration, 'sine');  // Perfect fifth
      playTone(baseFrequency * 2, duration * 0.8, 'triangle'); // Octave
    }
  }