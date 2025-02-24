// Main.js for Clear Seas Solutions

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
  
    // DOM elements
    const loadingScreen = document.getElementById('loading-screen');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links li');
    const progressBar = document.querySelector('.progress-bar');
    const cursorFollower = document.querySelector('.cursor-follower');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const sectionContents = document.querySelectorAll('.section-content');
    const scrollContainer = document.getElementById('scroll-container');
    const canvas = document.getElementById('webgl-canvas');
  
    // ===== Loading Screen Animation =====
    window.addEventListener('load', () => {
      setTimeout(() => {
        gsap.to(loadingScreen, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loadingScreen.style.visibility = 'hidden';
            animateSection(0);
          }
        });
      }, 2500);
    });
  
    // ===== Custom Cursor Follower =====
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    });
  
    // Add hover effects for interactive elements
    const hoverElements = document.querySelectorAll('button, a, .nav-links li, .solution-card, .case-card');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, {
          width: 50,
          height: 50,
          backgroundColor: 'rgba(255, 0, 255, 0.2)',
          borderColor: 'var(--secondary)',
          duration: 0.3
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, {
          width: 30,
          height: 30,
          backgroundColor: 'rgba(0, 255, 247, 0.2)',
          borderColor: 'var(--primary)',
          duration: 0.3
        });
      });
    });
  
    // ===== Mobile Menu Toggle =====
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      
      // Animate the hamburger bars
      const bars = menuToggle.querySelectorAll('.bar');
      if (navLinksContainer.classList.contains('active')) {
        gsap.to(bars[0], { rotation: 45, y: 8, duration: 0.3 });
        gsap.to(bars[1], { opacity: 0, duration: 0.3 });
        gsap.to(bars[2], { rotation: -45, y: -8, duration: 0.3 });
      } else {
        gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(bars[1], { opacity: 1, duration: 0.3 });
        gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
      }
    });
  
    // ===== Scroll Progress Indicator =====
    scrollContainer.addEventListener('scroll', () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const height = scrollContainer.clientHeight;
      const scrollPercentage = (scrollTop / (scrollHeight - height)) * 100;
      
      progressBar.style.width = `${scrollPercentage}%`;
      
      // Get current section
      const currentSectionIndex = Math.floor(scrollTop / window.innerHeight);
      
      // Update navigation highlighting
      navLinks.forEach((link, index) => {
        if (index === currentSectionIndex) {
          link.style.color = 'var(--primary)';
          link.style.textShadow = 'var(--glow-primary)';
        } else {
          link.style.color = 'var(--light)';
          link.style.textShadow = 'none';
        }
      });
      
      // Check if a new section is in view for animations
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollTop >= sectionTop - sectionHeight / 3 && 
            scrollTop < sectionTop + sectionHeight - sectionHeight / 3) {
          animateSection(index);
        }
      });
    });
  
    // ===== Smooth Navigation =====
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        scrollContainer.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinksContainer.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          
          // Reset hamburger icon
          const bars = menuToggle.querySelectorAll('.bar');
          gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
          gsap.to(bars[1], { opacity: 1, duration: 0.3 });
          gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
        }
      });
    });
  
    // ===== Section Animation Handler =====
    function animateSection(index) {
      // Get color data and set background gradient
      const section = sections[index];
      const color = section.getAttribute('data-color');
      const [r, g, b] = color.split(',').map(Number);
      
      // Animate section content
      sectionContents.forEach((content, i) => {
        if (i === index) {
          content.classList.add('animated');
        }
      });
      
      // Animate the stats circles when Expertise section is active
      if (index === 2) {
        animateStatCircles();
      }
      
      // Update the vaporwave sun position based on scroll
      const sunProgress = index / (sections.length - 1);
      const sunElement = document.getElementById('retro-sun');
      gsap.to(sunElement, {
        y: -100 * sunProgress,
        duration: 1
      });
      
      // Update 3D scene if available
      if (window.updateSceneColors) {
        window.updateSceneColors(r, g, b);
      }
    }
  
    // ===== Animate Stat Circles =====
    function animateStatCircles() {
      const statCircles = document.querySelectorAll('.stat-circle-progress');
      
      statCircles.forEach(circle => {
        const percentage = parseInt(circle.getAttribute('data-percentage'));
        const circumference = 283; // 2 * π * 45
        const dashOffset = circumference - (percentage / 100 * circumference);
        
        gsap.to(circle, {
          strokeDashoffset: dashOffset,
          duration: 2,
          ease: "power2.out"
        });
        
        // Update text as well
        const textElement = circle.parentNode.querySelector('.stat-text');
        let startVal = 0;
        
        gsap.to({ value: startVal }, {
          value: percentage,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            const currentVal = Math.round(this.targets()[0].value);
            const displayValue = percentage > 100 ? `${Math.round(currentVal/100)}x` : `${currentVal}%`;
            textElement.textContent = displayValue;
          }
        });
      });
    }
  
    // ===== Initialize Floating Elements =====
    function initFloatingElements() {
      const floatingElements = document.querySelectorAll('.floating-cube, .floating-pyramid, .floating-circle, .floating-rectangle, .floating-triangle');
      
      floatingElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || '1');
        const randomX = Math.random() * 80 - 40;
        const randomY = Math.random() * 80 - 40;
        const randomDelay = Math.random() * 2;
        const randomDuration = 5 + Math.random() * 10;
        
        // Set random initial position
        gsap.set(element, {
          x: Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2,
          y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
          rotation: Math.random() * 360
        });
        
        // Create floating animation
        gsap.to(element, {
          x: `+=${randomX}`,
          y: `+=${randomY}`,
          rotation: `+=${Math.random() * 40 - 20}`,
          duration: randomDuration / speed,
          delay: randomDelay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    }
  
    // ===== Set up WebGL Background =====
    function initWebGLBackground() {
      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // Custom shader for vaporwave grid effect
      const gridShader = {
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color(0x00fff7) },
          uColor2: { value: new THREE.Color(0xff00ff) },
          uAccent: { value: new THREE.Color(0x2D1B69) },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uAccent;
          uniform vec2 uResolution;
          varying vec2 vUv;
          
          float grid(vec2 uv, float size) {
            vec2 g = abs(fract(uv * size) - 0.5) / fwidth(uv * size);
            return 1.0 - min(g.x, g.y);
          }
          
          void main() {
            // Transform UVs for perspective effect
            vec2 uv = vUv * 2.0 - 1.0;
            uv.y *= uResolution.y / uResolution.x;
            float dist = length(uv);
            
            // Create a vaporwave-style gradient background
            vec3 bg = mix(uColor1, uColor2, vUv.y);
            
            // Add a sun effect
            float sun = smoothstep(0.5, 0.2, length(uv - vec2(0.0, -0.3)));
            bg = mix(bg, uColor2, sun * 0.6);
            
            // Add grid effect with perspective
            vec2 grid_uv = vec2(uv.x / (uv.y + 1.5), 1.0 / (uv.y + 1.5));
            grid_uv += vec2(0.0, uTime * 0.1);
            
            float g = grid(grid_uv, 10.0) * smoothstep(1.0, 0.0, dist);
            
            // Mix the colors
            vec3 finalColor = mix(bg, uColor1, g * 0.5);
            
            // Add a glow to the horizon
            finalColor += uAccent * (0.1 / (abs(uv.y + 0.3) + 0.05));
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `
      };
      
      // Create a full-screen plane with the shader
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        uniforms: gridShader.uniforms,
        vertexShader: gridShader.vertexShader,
        fragmentShader: gridShader.fragmentShader
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      // Add particles/stars
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 200;
      
      const posArray = new Float32Array(particleCount * 3);
      const scaleArray = new Float32Array(particleCount);
      
      for (let i = 0; i < particleCount; i++) {
        // Position
        posArray[i * 3] = (Math.random() - 0.5) * 10;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
        posArray[i * 3 + 2] = (Math.random() - 3) * 5;
        
        // Scale
        scaleArray[i] = Math.random();
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const particles = new THREE.Points(particlesGeometry, particleMaterial);
      scene.add(particles);
      
      // Create a retro grid floor
      const gridGeometry = new THREE.PlaneGeometry(40, 40, 20, 20);
      gridGeometry.rotateX(-Math.PI / 2);
      gridGeometry.translate(0, -5, 0);
      
      const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x00fff7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const grid = new THREE.Mesh(gridGeometry, gridMaterial);
      scene.add(grid);
      
      // Export the updateSceneColors function globally
      window.updateSceneColors = (r, g, b) => {
        // Convert RGB to THREE.Color (0-1 range)
        const color1 = new THREE.Color(r/255, g/255, b/255);
        const color2 = new THREE.Color((255-r)/255, (255-g)/255, (255-b)/255);
        
        gsap.to(material.uniforms.uColor1.value, {
          r: color1.r,
          g: color1.g,
          b: color1.b,
          duration: 1
        });
        
        gsap.to(material.uniforms.uColor2.value, {
          r: color2.r,
          g: color2.g,
          b: color2.b,
          duration: 1
        });
        
        gsap.to(gridMaterial.color, {
          r: color1.r,
          g: color1.g,
          b: color1.b,
          duration: 1
        });
      };
      
      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      });
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        material.uniforms.uTime.value += 0.01;
        
        // Rotate particles slowly for a cosmic effect
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        
        // Move the grid to create the illusion of forward motion
        grid.position.z += 0.02;
        if (grid.position.z > 5) {
          grid.position.z = -35;
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
    }
  
    // ===== Initialize Typing Effect =====
    function initTypingEffect() {
      const typingElement = document.querySelector('.typing-effect');
      if (!typingElement) return;
      
      const text = typingElement.textContent;
      typingElement.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(typeWriter, 1000);
    }
  
    // ===== Glitch Effects =====
    function initGlitchEffects() {
      // Button glitches
      setInterval(() => {
        const buttons = document.querySelectorAll('.cyber-button');
        buttons.forEach(button => {
          const glitchEffect = button.querySelector('.cyber-button-glitch');
          if (glitchEffect) {
            gsap.to(glitchEffect, {
              opacity: 1,
              duration: 0.1,
              onComplete: () => {
                gsap.to(glitchEffect, {
                  opacity: 0,
                  duration: 0.1
                });
              }
            });
          }
        });
      }, 5000);
  
      // Random text glitches
      setInterval(() => {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        const randomIndex = Math.floor(Math.random() * glitchTexts.length);
        
        gsap.fromTo(glitchTexts[randomIndex], 
          { skewX: 0, skewY: 0 },
          { 
            skewX: 10, 
            skewY: -10, 
            duration: 0.1,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 3
          }
        );
      }, 3000);
    }
  
    // ===== Click Ripple Effect =====
    document.addEventListener('click', (e) => {
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.classList.add('neon-flare');
      
      // Set position
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      
      // Random color (primary or secondary)
      if (Math.random() > 0.5) {
        ripple.style.background = 'radial-gradient(circle, var(--primary) 0%, transparent 70%)';
      } else {
        ripple.style.background = 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)';
      }
      
      // Add to body
      document.body.appendChild(ripple);
      
      // Remove after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  
    // ===== Initialize All Effects =====
    initFloatingElements();
    initWebGLBackground();
    initTypingEffect();
    initGlitchEffects();
    
    // Initialize first section immediately
    animateSection(0);
    
    // Add ScrollTrigger for each section
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => {
          // Flash grid effect when changing sections
          gsap.to('#grid-overlay', {
            opacity: 0.6,
            duration: 0.2,
            yoyo: true,
            repeat: 1
          });
          
          // Add portal flash effect
          const portal = document.getElementById('global-portal');
          if (portal) {
            gsap.to(portal, {
              opacity: 0.5,
              duration: 0.3,
              yoyo: true,
              repeat: 1
            });
          }
        }
      });
    });
    
    // Add parallax effect to floating elements
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;
      
      document.querySelectorAll('.floating-elements').forEach(container => {
        gsap.to(container, {
          x: moveX,
          y: moveY,
          duration: 1
        });
      });
    });
    
    // Add scanline flicker effect
    setInterval(() => {
      const scanlines = document.getElementById('scanlines');
      if (scanlines) {
        gsap.to(scanlines, {
          opacity: 0.1,
          duration: 0.1,
          yoyo: true,
          repeat: 3
        });
      }
    }, 7000);
    
    // Add ambient noise to the noise overlay
    setInterval(() => {
      const noise = document.getElementById('noise-overlay');
      if (noise) {
        gsap.to(noise, {
          opacity: Math.random() * 0.05 + 0.02,
          duration: 0.5
        });
      }
    }, 500);
  });