// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeMobileMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Reveal on scroll using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter-value');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const start = performance.now();
      const isPercent = counter.parentElement.textContent.includes('%');

      function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * target);

        if (target >= 1000) {
          counter.textContent = (current / 1000).toFixed(current < 10000 ? 1 : 0) + 'k';
        } else {
          counter.textContent = current;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          if (target >= 1000) {
            counter.textContent = (target / 1000).toFixed(target < 10000 ? 1 : 0) + 'k';
          } else {
            counter.textContent = target;
          }
        }
      }

      requestAnimationFrame(updateCounter);
    });

    countersAnimated = true;
  }

  // Observe stats bar for counter animation
  const statsBar = document.querySelector('.counter-value');
  if (statsBar) {
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(statsBar);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Heart/favorite toggle
  document.querySelectorAll('.course-card [data-lucide="heart"]').forEach(function(heart) {
    heart.parentElement.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const icon = this.querySelector('[data-lucide="heart"]');
      if (icon.classList.contains('text-red-500') || icon.classList.contains('fill-red-500')) {
        icon.classList.remove('text-red-500', 'fill-red-500');
        icon.classList.add('text-slate-400');
      } else {
        icon.classList.remove('text-slate-400');
        icon.classList.add('text-red-500', 'fill-red-500');
      }
    });
  });

  // Parallax effect for hero blobs (subtle)
  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', function(e) {
      const blobs = document.querySelectorAll('.blob');
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      blobs.forEach(function(blob, index) {
        const factor = (index + 1) * 0.5;
        blob.style.transform = 'translate(' + (x * factor) + 'px, ' + (y * factor) + 'px)';
      });
    });
  }

  // Category filter functionality
  const categoryFilters = document.querySelectorAll('.category-filter');
  const courseCards = document.querySelectorAll('.course-card');

  categoryFilters.forEach(function(filter) {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      categoryFilters.forEach(function(f) {
        f.classList.remove('active');
        f.classList.remove('text-white');
        f.classList.add('text-slate-600');
      });

      // Add active class to clicked filter
      this.classList.add('active');
      this.classList.remove('text-slate-600');

      const filterValue = this.getAttribute('data-filter');

      // Filter course cards
      courseCards.forEach(function(card) {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function() {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});
