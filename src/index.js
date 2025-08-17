<script>
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Function to handle profile image loading
        function handleImageLoad() {
            // Hero section profile image
            const heroImg = document.querySelector('#heroProfileImage img');
            const heroPlaceholder = document.querySelector('#heroProfileImage .photo-placeholder');
            const heroContainer = document.getElementById('heroProfileImage');
            
            if (heroImg && heroImg.complete && heroImg.naturalHeight !== 0) {
                heroPlaceholder.style.display = 'none';
                heroContainer.classList.remove('no-image');
            }

            // About section profile image
            const aboutImg = document.querySelector('#aboutProfileImage img');
            const aboutPlaceholder = document.querySelector('#aboutProfileImage .photo-placeholder-about');
            const aboutContainer = document.getElementById('aboutProfileImage');
            
            if (aboutImg && aboutImg.complete && aboutImg.naturalHeight !== 0) {
                aboutPlaceholder.style.display = 'none';
                aboutContainer.classList.remove('no-image');
            }
        }

        // Check for images when page loads
        window.addEventListener('load', handleImageLoad);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll progress bar
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            document.getElementById('progressBar').style.width = scrollPercent + '%';
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Enhanced interactive effects
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Staggered animations for project cards
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card').forEach(card => {
            staggerObserver.observe(card);
        });

        // Add loading state for resume link
        document.querySelectorAll('a[href="resume.pdf"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const originalText = this.innerHTML;
                this.innerHTML = '⏳ Loading...';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });

        // Add copy email functionality
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const email = this.textContent;
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Email copied! ✓';
                    this.style.color = 'var(--success-green)';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    window.location.href = this.href;
                });
            });
        });

        // Add copy phone functionality
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const phone = this.textContent;
                navigator.clipboard.writeText(phone).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Phone copied! ✓';
                    this.style.color = 'var(--success-green)';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                }).catch(() => {
                    // Fallback - try to open phone app
                    window.location.href = this.href;
                });
            });
        });

        // Counter animation for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            updateCounter();
        }

        // Animate counters when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });

        // Parallax effect for hero section
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // Add smooth hover effects to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .resume-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = (this.style.transform || '') + ' scale(1.02)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.02)', '');
            });
        });

        // Performance optimization: Debounce scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Apply debouncing to scroll events for better performance
        const debouncedScrollHandler = debounce(() => {
            // Scroll progress
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            document.getElementById('progressBar').style.width = scrollPercent + '%';

            // Active nav highlighting
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler);

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });

        // Preload resume PDF for better UX
        const resumeLink = document.createElement('link');
        resumeLink.rel = 'prefetch';
        resumeLink.href = 'resume.pdf';
        document.head.appendChild(resumeLink);

        // Add success message for form submissions (if you add a contact form later)
        function showSuccessMessage(message) {
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success-green);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            successDiv.textContent = message;
            document.body.appendChild(successDiv);

            setTimeout(() => {
                successDiv.style.opacity = '1';
                successDiv.style.transform = 'translateX(0)';
            }, 100);

            setTimeout(() => {
                successDiv.style.opacity = '0';
                successDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(successDiv);
                }, 300);
            }, 3000);
        }

        // Console message for recruiters
        console.log(`
        🚀 Hi there! I'm Devaprakash, a passionate Software Development Engineer.
        
        📊 Quick Stats:
        • 500+ DSA problems solved
        • 15+ projects built
        • 3+ years of coding experience
        • Looking for SDE/SDE Intern opportunities
        
        💼 Let's connect:
        • Email: devaprakash.dev@gmail.com
        • LinkedIn: linkedin.com/in/devaprakash-sde
        • GitHub: github.com/devaprakash-sde
        
        Thanks for checking out my portfolio! 🎯
        `);

        console.log('🚀 Portfolio loaded successfully! Looking for SDE opportunities.');
    </script>