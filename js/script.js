// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.mobile-menu-close');
const body = document.body;

menuToggle.addEventListener('click', function() {
  mobileMenu.classList.add('active');
  body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', function() {
  mobileMenu.classList.remove('active');
  body.style.overflow = 'auto';
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    body.style.overflow = 'auto';
  }
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
      }
    }
  });
});

// Add active class to current page in navigation
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (currentPage === '' && linkHref === 'index.html') {
      link.classList.add('active');
    } else if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Simple form validation for contact form
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });
    
    // Email validation
    const emailField = contactForm.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value)) {
        isValid = false;
        emailField.classList.add('error');
      }
    }
    
    if (isValid) {
      // In a real application, you would send the form data to a server here
      alert('Thank you for your message! We will contact you soon.');
      contactForm.reset();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  });
}

// Testimonial slider (if needed)
// This is a simple implementation. For a more robust solution, consider using a library like Swiper.js
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function showTestimonials() {
  if (window.innerWidth <= 768 && testimonials.length > 1) {
    testimonials.forEach((testimonial, index) => {
      if (index === currentTestimonial) {
        testimonial.style.display = 'block';
      } else {
        testimonial.style.display = 'none';
      }
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    setTimeout(showTestimonials, 5000); // Change testimonial every 5 seconds
  } else {
    testimonials.forEach(testimonial => {
      testimonial.style.display = 'block';
    });
  }
}

// Initialize testimonial slider on mobile
if (testimonials.length > 0) {
  window.addEventListener('resize', showTestimonials);
  showTestimonials();
}