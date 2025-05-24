
/**
 * Character card component for OtakuVerse
 */

window.components = window.components || {};

/**
 * Create a character card element
 * @param {Object} character - Character object
 * @param {Function} onClick - Function to call when card is clicked
 * @returns {HTMLElement} Character card element
 */
window.components.createCharacterCard = (character, onClick) => {
  const card = document.createElement('div');
  card.className = 'character-card';
  card.setAttribute('data-id', character.mal_id);
  
  // Apply animation to cards
  card.style.animation = 'fade-in 0.5s ease forwards';
  card.style.opacity = '0';
  card.style.animationDelay = `${Math.random() * 0.3}s`;
  
  const imageUrl = character.images?.jpg?.image_url || 'https://via.placeholder.com/225x350?text=No+Image';
  
  card.innerHTML = `
    <div class="character-image-container">
      <img src="${imageUrl}" alt="${character.name}" class="character-image" loading="lazy" />
    </div>
    <div class="character-info">
      <h3 class="character-name">${character.name}</h3>
      <div class="character-anime">${character.name_kanji || ''}</div>
      <div class="character-favorites">
        <i data-lucide="heart"></i>
        <span>${character.favorites.toLocaleString()} favorites</span>
      </div>
    </div>
  `;
  
  // Add click event
  card.addEventListener('click', () => onClick(character));
  
  return card;
};

/**
 * Create a character detail view
 * @param {Object} character - Character object
 * @returns {HTMLElement} Character detail element
 */
window.components.createCharacterDetail = (character) => {
  const detailElement = document.createElement('div');
  detailElement.className = 'character-detail';
  
  // Format the about text
  const aboutText = character.about || 'No information available.';
  
  // Get image
  const imageUrl = character.images?.jpg?.image_url || 'https://via.placeholder.com/225x350?text=No+Image';
  
  // Create HTML structure
  detailElement.innerHTML = `
    <div class="character-detail-header">
      <img src="${imageUrl}" alt="${character.name}" class="character-detail-image" />
      <div class="character-detail-info">
        <h2 class="character-detail-name">${character.name}</h2>
        ${character.name_kanji ? `<p class="character-detail-kanji">${character.name_kanji}</p>` : ''}
        
        <div class="character-detail-meta">
          <div class="character-detail-meta-item">
            <i data-lucide="heart"></i>
            <span>${character.favorites.toLocaleString()} favorites</span>
          </div>
          ${character.nicknames && character.nicknames.length > 0 ? `
            <div class="character-detail-meta-item">
              <i data-lucide="tag"></i>
              <span>Also known as: ${character.nicknames.join(', ')}</span>
            </div>
          ` : ''}
        </div>
        
        <div class="character-detail-section">
          <h3 class="character-detail-section-title">About</h3>
          <div class="character-detail-about">${aboutText}</div>
        </div>
      </div>
    </div>
    
    ${character.anime && character.anime.length > 0 ? `
      <div class="character-appearances">
        <h3 class="character-appearances-title">Anime Appearances</h3>
        <div class="animeography-list">
          ${character.anime.slice(0, 8).map(entry => `
            <div class="animeography-item">
              <img 
                src="${entry.anime.images?.jpg?.image_url || 'https://via.placeholder.com/180x120?text=No+Image'}" 
                alt="${entry.anime.title}" 
                class="animeography-image"
                loading="lazy"
              />
              <div class="animeography-info">
                <div class="animeography-title">${entry.anime.title}</div>
                <div class="animeography-role">${entry.role || 'Character'}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
    
    ${character.voices && character.voices.length > 0 ? `
      <div class="voice-actors">
        <h3 class="voice-actors-title">Voice Actors</h3>
        <div class="voice-actors-list">
          ${character.voices.slice(0, 6).map(voice => `
            <div class="voice-actor-item">
              <img 
                src="${voice.person.images?.jpg?.image_url || 'https://via.placeholder.com/60x60?text=No+Image'}" 
                alt="${voice.person.name}" 
                class="voice-actor-image"
                loading="lazy"
              />
              <div class="voice-actor-info">
                <div class="voice-actor-name">${voice.person.name}</div>
                <div class="voice-actor-language">${voice.language}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
  
  return detailElement;
};
