
/**
 * Navigation functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Mobile menu toggle functionality
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (menuToggle && mobileMenu && menuIcon) {
    menuToggle.addEventListener('click', () => {
      // Toggle visibility
      const isVisible = mobileMenu.style.display === 'block';
      
      // Animate the menu with proper z-index
      if (isVisible) {
        mobileMenu.style.opacity = '0';
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 300);
      } else {
        mobileMenu.style.display = 'block';
        setTimeout(() => {
          mobileMenu.style.opacity = '1';
        }, 10);
      }
      
      // Change icon
      if (isVisible) {
        menuIcon.setAttribute('name', 'menu');
      } else {
        menuIcon.setAttribute('name', 'x');
      }
      
      // Recreate Lucide icons
      if (window.lucide) {
        window.lucide.createIcons({
          icons: {
            menu: true,
            x: true
          }
        });
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenu.style.display === 'block' && 
          !mobileMenu.contains(e.target) && 
          e.target !== menuToggle && 
          !menuToggle.contains(e.target)) {
        mobileMenu.style.opacity = '0';
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 300);
        
        menuIcon.setAttribute('name', 'menu');
        
        // Recreate Lucide icons
        if (window.lucide) {
          window.lucide.createIcons({
            icons: {
              menu: true
            }
          });
        }
      }
    });
  }
  
  // Highlight active nav links based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if ((currentPath.includes(href) && href !== '/' && href !== 'index.html') || 
        (currentPath.endsWith('/') && href === 'index.html') || 
        (currentPath.endsWith('/vanilla-v2/') && href === 'index.html') ||
        (currentPath.endsWith('/index.html') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
