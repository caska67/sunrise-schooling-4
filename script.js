document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const menuToggle = document.getElementById('menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                    navLinks.classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.classList.contains('hamburger')) {
            menuToggle.checked = false;
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Sticky header with scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 64, 128, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.padding = '0.8rem 2rem';
        } else {
            header.style.background = 'var(--primary-color)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '1rem 2rem';
        }
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animations
    window.addEventListener('load', () => {
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);

    // Image modal for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.image-modal');
    const modalImg = modal.querySelector('.modal-image');
    const caption = modal.querySelector('.caption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modal.style.display = 'block';
            modalImg.src = img.src;
            caption.textContent = item.querySelector('.gallery-overlay p').textContent;
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-rotate testimonials
    setInterval(() => {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
});