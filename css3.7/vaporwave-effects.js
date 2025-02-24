/* Additional special effects for the website */

/* Success Particles Animation */
.success-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 3000;
  }
  
  .success-particle {
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 10px currentColor;
    opacity: 1;
  }
  
  /* Button Glow Effect */
  .button-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 255, 247, 0.7) 0%,
      rgba(255, 0, 255, 0.3) 50%,
      rgba(0, 0, 0, 0) 70%
    );
    border-radius: 5px;
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: -1;
  }
  
  .button-glow.active {
    opacity: 1;
  }
  
  /* Enhanced Glitch Effect for Section Titles */
  .section-title.glitch-text::before,
  .section-title.glitch-text::after {
    animation-duration: 4s;
  }
  
  .section-title.glitch-text:hover::before,
  .section-title.glitch-text:hover::after {
    animation-duration: 0.5s;
  }
  
  /* Cyber Button Animation on Scroll */
  @keyframes cyber-button-flicker {
    0% { box-shadow: 0 0 10px var(--primary), inset 0 0 10px var(--primary); }
    25% { box-shadow: 0 0 5px var(--primary), inset 0 0 5px var(--primary); }
    50% { box-shadow: 0 0 15px var(--primary), 0 0 20px var(--secondary), inset 0 0 10px var(--primary); }
    75% { box-shadow: 0 0 7px var(--primary), inset 0 0 7px var(--primary); }
    100% { box-shadow: 0 0 10px var(--primary), inset 0 0 10px var(--primary); }
  }
  
  .cyber-button-large {
    animation: cyber-button-flicker 4s infinite;
  }
  
  /* Enhanced Video Container */
  .video-container::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, var(--primary), transparent, var(--secondary), transparent);
    background-size: 400% 400%;
    z-index: -1;
    filter: blur(20px);
    opacity: 0.3;
    animation: gradient-shift 15s ease infinite;
    border-radius: 10px;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* Terminal Lines Animation for Form */
  .consultation-form::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      var(--primary) 50%, 
      transparent 100%
    );
    opacity: 0.7;
    animation: terminal-scan 4s linear infinite;
  }
  
  @keyframes terminal-scan {
    0% { transform: translateY(0); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  
  /* Data Stream Background Effect for Contact Section */
  #section-5::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      repeating-linear-gradient(
        90deg,
        rgba(0, 255, 247, 0.03) 0px,
        rgba(0, 255, 247, 0.03) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(255, 0, 255, 0.03) 0px,
        rgba(255, 0, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      );
    z-index: -1;
    opacity: 0.4;
  }
  
  /* Enhanced Video Play Animation */
  .video-wrapper::after {
    content: '▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(0, 0, 0, 0.5);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    opacity: 0.8;
    transition: all 0.3s ease;
    pointer-events: none;
    animation: pulse-play 2s infinite;
  }
  
  @keyframes pulse-play {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  }
  
  .video-wrapper:hover::after {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
  
  /* Enhanced Floating Elements */
  .floating-cube, 
  .floating-pyramid, 
  .floating-circle, 
  .floating-rectangle, 
  .floating-triangle {
    position: absolute;
    opacity: 0.7;
    filter: blur(1px);
    transition: all 0.3s ease;
  }
  
  .floating-cube:hover, 
  .floating-pyramid:hover, 
  .floating-circle:hover, 
  .floating-rectangle:hover, 
  .floating-triangle:hover {
    filter: blur(0);
    opacity: 0.9;
    transform: scale(1.1);
  }
  
  /* Digital Rain Effect */
  .digital-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .rain-column {
    position: absolute;
    top: -20%;
    display: flex;
    flex-direction: column;
    color: var(--primary);
    font-family: monospace;
    font-size: 14px;
    opacity: 0.3;
    animation-name: rain-fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
  .rain-column span {
    text-shadow: 0 0 5px var(--primary);
    animation: character-change 0.3s infinite;
  }
  
  @keyframes rain-fall {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    5% {
      opacity: 0.5;
    }
    95% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(2000px);
      opacity: 0;
    }
  }
  
  @keyframes character-change {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  /* Enhanced Contact Form Submit Button */
  .cyber-button-large::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    filter: blur(10px);
    opacity: 0.5;
    top: 50%;
    left: -20px;
    transform: translateY(-50%);
    animation: button-particle-move 4s linear infinite;
  }
  
  @keyframes button-particle-move {
    0% { left: -20px; opacity: 0.5; }
    50% { opacity: 1; }
    100% { left: calc(100% + 20px); opacity: 0.5; }
  }
  
  /* Responsive Video Container */
  @media (max-width: 768px) {
    .video-container {
      width: 90%;
    }
    
    .video-wrapper::after {
      width: 70px;
      height: 70px;
      font-size: 2.5rem;
    }
  }
  
  /* Consultation Form Responsiveness */
  @media (max-width: 992px) {
    .consultation-container {
      grid-template-columns: 1fr;
    }
    
    .contact-info-panel {
      order: -1;
      margin-bottom: 30px;
    }
    
    .checkbox-group {
      grid-template-columns: 1fr;
    }
  }
  
  /* Focus Effects for Accessibility */
  .cyber-input:focus,
  .cyber-select:focus,
  .cyber-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--secondary), 0 0 0 4px var(--primary);
  }
  
  /* Form Validation Styles */
  .cyber-input:invalid,
  .cyber-select:invalid {
    border-bottom-color: rgb(255, 100, 100);
  }
  
  .cyber-input:valid ~ .input-line,
  .cyber-select:valid ~ .input-line {
    background-color: var(--primary);
    width: 100%;
  }
  
  /* Preloader Animation */
  .loader-progress {
    position: relative;
    overflow: hidden;
  }
  
  .loader-progress::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    animation: loading 3s ease forwards;
  }
  
  @keyframes loading {
    0% { width: 0; }
    100% { width: 100%; }
  }
  
  /* Retro Computer Interface Elements */
  .form-section {
    position: relative;
  }
  
  .form-section::before {
    content: attr(data-section-number);
    position: absolute;
    top: -10px;
    left: -10px;
    background: var(--accent);
    color: var(--primary);
    font-family: 'Orbitron', sans-serif;
    font-size: 0.7rem;
    padding: 2px 5px;
    border: 1px solid var(--primary);
    z-index: 2;
  }
  
  /* Enhanced Navigation Highlight */
  .nav-links li.active .cyber-box {
    background-color: var(--primary);
    color: var(--dark);
  }
  
  /* Footer Styling */
  .site-footer {
    margin-top: 30px;
    padding: 20px;
    text-align: center;
    font-size: 0.8rem;
    border-top: 1px solid rgba(0, 255, 247, 0.3);
  }
  
  .footer-logo {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--primary);
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 8, 33, 0.9);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary);
  }