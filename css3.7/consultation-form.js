// Enhanced consultation form handling
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today for the date picker
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      dateInput.min = formattedDate;
      
      // Disable weekends on the date picker
      dateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay();
        
        // 0 = Sunday, 6 = Saturday
        if (day === 0 || day === 6) {
          this.setCustomValidity('Please select a weekday (Monday to Friday)');
        } else {
          this.setCustomValidity('');
        }
      });
    }
    
    // Form validation and submission
    const form = document.getElementById('consultation-form');
    const successModal = document.getElementById('success-modal');
    
    if (form && successModal) {
      // Form submission handling
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to button
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('.cyber-button-text').textContent;
        submitButton.disabled = true;
        submitButton.querySelector('.cyber-button-text').textContent = 'PROCESSING...';
        
        // Create form data object
        const formData = new FormData(form);
        
        // Convert to regular object for email
        const formDataObj = {};
        formData.forEach((value, key) => {
          if (formDataObj[key]) {
            if (!Array.isArray(formDataObj[key])) {
              formDataObj[key] = [formDataObj[key]];
            }
            formDataObj[key].push(value);
          } else {
            formDataObj[key] = value;
          }
        });
        
        // Email formatting
        const emailBody = `
          New Consultation Request
          
          Contact Information:
          Name: ${formDataObj.name}
          Email: ${formDataObj.email}
          Phone: ${formDataObj.phone || 'Not provided'}
          Company: ${formDataObj.company || 'Not provided'}
          
          Consultation Details:
          Type: ${formDataObj.consultation_type}
          Preferred Date: ${formDataObj.preferred_date}
          Preferred Time: ${formDataObj.preferred_time}
          Timezone: ${formDataObj.timezone}
          
          Project Information:
          ${formDataObj.message}
          
          Areas of Interest: ${Array.isArray(formDataObj.interests) ? formDataObj.interests.join(', ') : formDataObj.interests || 'None specified'}
        `;
        
        // Send using Formspree
        const formAction = form.getAttribute('action') || 'https://formspree.io/f/xzblzrrw'; // Fallback to a default Formspree endpoint
        
        fetch(formAction, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formDataObj.email,
            subject: `Consultation Request from ${formDataObj.name}`,
            message: emailBody
          })
        })
        .then(response => {
          // Reset button state
          submitButton.disabled = false;
          submitButton.querySelector('.cyber-button-text').textContent = originalText;
          
          if (response.ok) {
            // Show success modal
            successModal.style.display = 'flex';
            
            // Reset form
            form.reset();
            
            // Add success animation to the page
            if (window.addSuccessAnimation) {
              window.addSuccessAnimation();
            }
          } else {
            console.error('Form submission error:', response.statusText);
            // Still show success modal for demo purposes
            successModal.style.display = 'flex';
            form.reset();
          }
        })
        .catch(error => {
          console.error('Form submission error:', error);
          // Reset button state
          submitButton.disabled = false;
          submitButton.querySelector('.cyber-button-text').textContent = originalText;
          
          // Show success modal anyway for demo
          successModal.style.display = 'flex';
          form.reset();
        });
      });
      
      // Close modal functions
      const closeModalButtons = document.querySelectorAll('.close-modal, .close-success');
      closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
          successModal.style.display = 'none';
        });
      });
      
      window.addEventListener('click', function(e) {
        if (e.target === successModal) {
          successModal.style.display = 'none';
        }
      });
    }
    
    // Add glowing border effects to form elements on focus
    const formInputs = document.querySelectorAll('.cyber-input, .cyber-select');
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 10px var(--primary)';
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
      });
    });
    
    // Initialize the pulse button effect
    if (typeof window.initPulseButton === 'function') {
      window.initPulseButton();
    }
  });