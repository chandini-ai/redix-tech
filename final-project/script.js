// Animate About Us section on scroll
document.addEventListener('DOMContentLoaded', () => {
  const aboutEls = document.querySelectorAll('.slide-in-left, .slide-in-right');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  aboutEls.forEach(el => observer.observe(el));

  // FAQ Accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other accordion items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          otherContent.style.maxHeight = '0';
          otherContent.style.padding = '0 1.5rem';
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        content.style.padding = '0 1.5rem';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.padding = '0 1.5rem 1.5rem';
      }
    });
  });

  // Animate FAQ items on scroll
  const faqItems = document.querySelectorAll('.animate-on-scroll');
  const faqObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  faqItems.forEach(item => faqObserver.observe(item));

  // Animated counter for stats
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  };

  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));

  // Enhanced feature card interactions
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Parallax effect for background elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('#features::before');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Portfolio Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Portfolio card hover effects
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Contact Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitButton = document.querySelector('.form-submit');
  const submitText = document.querySelector('.submit-text');
  const submitLoading = document.querySelector('.submit-loading');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Validate form
      if (validateForm()) {
        // Show loading state
        showLoadingState();
        
        try {
          // Simulate form submission (replace with actual API call)
          await simulateFormSubmission();
          showSuccessMessage();
          contactForm.reset();
        } catch (error) {
          showErrorMessage('Something went wrong. Please try again.');
        } finally {
          hideLoadingState();
        }
      }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearFieldError(input));
    });
  }

  function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Validate name
    if (!name.value.trim()) {
      showFieldError('name', 'Name is required');
      isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      showFieldError('email', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showFieldError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      showFieldError('message', 'Message is required');
      isValid = false;
    }

    return isValid;
  }

  function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();

    switch (fieldName) {
      case 'name':
        if (!value) {
          showFieldError('name', 'Name is required');
          return false;
        }
        break;
      case 'email':
        if (!value) {
          showFieldError('email', 'Email is required');
          return false;
        } else if (!isValidEmail(value)) {
          showFieldError('email', 'Please enter a valid email address');
          return false;
        }
        break;
      case 'message':
        if (!value) {
          showFieldError('message', 'Message is required');
          return false;
        }
        break;
    }
    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    field.style.borderColor = '#ff6b6b';
    errorElement.textContent = message;
  }

  function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    errorElement.textContent = '';
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    errorElements.forEach(error => error.textContent = '');
    inputs.forEach(input => input.style.borderColor = 'rgba(255, 255, 255, 0.1)');
  }

  function showLoadingState() {
    submitButton.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'flex';
  }

  function hideLoadingState() {
    submitButton.disabled = false;
    submitText.style.display = 'block';
    submitLoading.style.display = 'none';
  }

  function showSuccessMessage() {
    formMessage.style.display = 'block';
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }

  function showErrorMessage(message) {
    formMessage.style.display = 'block';
    formMessage.className = 'form-message error';
    formMessage.textContent = message;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }

  async function simulateFormSubmission() {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  // Blog Search and Filter Functionality
  const blogSearch = document.getElementById('blogSearch');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const blogPosts = document.querySelectorAll('.blog-post');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  const newsletterForm = document.querySelector('.newsletter-form');

  // Search functionality
  if (blogSearch) {
    blogSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterPosts(searchTerm);
    });
  }

  // Category filter functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      filterPostsByCategory(category);
    });
  });

  // Load more functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // Simulate loading more posts
      loadMoreBtn.textContent = 'Loading...';
      loadMoreBtn.disabled = true;
      
      setTimeout(() => {
        loadMoreBtn.textContent = 'Load More Articles';
        loadMoreBtn.disabled = false;
        // In a real implementation, you would load more posts here
        showMessage('No more articles to load', 'info');
      }, 1500);
    });
  }

  // Newsletter signup
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('.newsletter-input').value;
      
      if (isValidEmail(email)) {
        showMessage('Thank you for subscribing!', 'success');
        newsletterForm.reset();
      } else {
        showMessage('Please enter a valid email address', 'error');
      }
    });
  }

  function filterPosts(searchTerm) {
    blogPosts.forEach(post => {
      const title = post.querySelector('.post-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
      const category = post.getAttribute('data-category');
      
      const matchesSearch = title.includes(searchTerm) || excerpt.includes(searchTerm);
      const currentCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      
      if (matchesSearch && matchesCategory) {
        post.style.display = 'block';
        post.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        post.style.display = 'none';
      }
    });
  }

  function filterPostsByCategory(category) {
    blogPosts.forEach(post => {
      const postCategory = post.getAttribute('data-category');
      const searchTerm = blogSearch ? blogSearch.value.toLowerCase() : '';
      const title = post.querySelector('.post-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
      
      const matchesCategory = category === 'all' || postCategory === category;
      const matchesSearch = !searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm);
      
      if (matchesCategory && matchesSearch) {
        post.style.display = 'block';
        post.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        post.style.display = 'none';
      }
    });
  }

  function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.zIndex = '9999';
    messageEl.style.padding = '1rem 1.5rem';
    messageEl.style.borderRadius = '10px';
    messageEl.style.fontWeight = '600';
    messageEl.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    
    if (type === 'success') {
      messageEl.style.background = 'rgba(16, 185, 129, 0.1)';
      messageEl.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      messageEl.style.color = '#10b981';
    } else if (type === 'error') {
      messageEl.style.background = 'rgba(239, 68, 68, 0.1)';
      messageEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      messageEl.style.color = '#ef4444';
    } else if (type === 'info') {
      messageEl.style.background = 'rgba(59, 130, 246, 0.1)';
      messageEl.style.border = '1px solid rgba(59, 130, 246, 0.3)';
      messageEl.style.color = '#3b82f6';
    }
    
    document.body.appendChild(messageEl);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }

  // Blog post hover effects
  blogPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
      post.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    post.addEventListener('mouseleave', () => {
      post.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Popular posts hover effects
  const popularPosts = document.querySelectorAll('.popular-post');
  popularPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
      post.style.transform = 'translateX(5px)';
    });
    
    post.addEventListener('mouseleave', () => {
      post.style.transform = 'translateX(0)';
    });
  });

  // Testimonials Carousel Functionality
  const carousel = document.getElementById('testimonialsCarousel');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let autoSlideInterval;

  if (carousel && slides.length > 0) {
    // Initialize carousel
    showSlide(currentSlide);

    // Auto-slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart auto-slide
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart auto-slide
      });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopAutoSlide();
        startAutoSlide(); // Restart auto-slide
      });
    });

    // Pause auto-slide on hover
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoSlide);
      carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-slide
    startAutoSlide();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      }
    });
  }

  // Testimonial card hover effects
  const testimonialCards = document.querySelectorAll('.testimonial-card, .grid-testimonial-card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Grid testimonial hover effects
  const gridTestimonials = document.querySelectorAll('.grid-testimonial');
  gridTestimonials.forEach(testimonial => {
    testimonial.addEventListener('mouseenter', () => {
      testimonial.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    testimonial.addEventListener('mouseleave', () => {
      testimonial.style.transform = 'translateY(0) scale(1)';
    });
  });
});

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('nav-open');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    });
    // Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('hidden');
  });
}

// Simple scroll reveal for elements with .reveal class
const revealOnScroll = () => {
  const items = document.querySelectorAll('.portfolio-card, .featured-thumb, .btn-primary, .hero-gradient');
  const revealAt = window.innerHeight * 0.85;
  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= revealAt) el.classList.add('show'); // .reveal.show via CSS
    else el.classList.remove('show');
  });
};
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', () => {
  // mark portfolio cards and featured thumb for reveal
  document.querySelectorAll('.portfolio-card, .featured-thumb').forEach((el, i) => {
    el.classList.add('reveal');
    // small stagger
    setTimeout(() => el.classList.add('show'), 120 * i);
  });
  revealOnScroll();
});

   