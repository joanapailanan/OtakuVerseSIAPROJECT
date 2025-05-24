
/**
 * Index page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  
  // Add hover animation to card stack
  const animeCardPreviews = document.querySelectorAll('.anime-card-preview');
  
  animeCardPreviews.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset to original z-index after a short delay
      setTimeout(() => {
        if (card.classList.contains('anime-card-preview-1')) {
          card.style.zIndex = '3';
        } else if (card.classList.contains('anime-card-preview-2')) {
          card.style.zIndex = '2';
        } else {
          card.style.zIndex = '1';
        }
      }, 300);
    });
  });
});
