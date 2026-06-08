import { useEffect } from 'react';

export default function Lightbox() {
  useEffect(() => {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;

    const handleClick = (e) => {
      const item = e.target.closest('.photo-item');
      if (!item) return;

      const url = item.dataset.url;
      const caption = item.dataset.caption;

      // Create lightbox overlay
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img src="${url}" alt="${caption || ''}" class="lightbox-img" />
        ${caption ? `<p class="lightbox-caption-text">${caption}</p>` : ''}
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      // Animate in
      requestAnimationFrame(() => {
        overlay.classList.add('active');
      });

      const close = () => {
        overlay.classList.remove('active');
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = '';
        }, 300);
      };

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
          close();
        }
      });

      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', onKey);
        }
      });
    };

    grid.addEventListener('click', handleClick);
    return () => grid.removeEventListener('click', handleClick);
  }, []);

  return (
    <style>{`
      .lightbox-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
        cursor: pointer;
      }
      .lightbox-overlay.active {
        background: rgba(0, 0, 0, 0.92);
      }
      .lightbox-img {
        max-width: 90vw;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.3s ease;
        cursor: default;
      }
      .lightbox-overlay.active .lightbox-img {
        opacity: 1;
        transform: scale(1);
      }
      .lightbox-close {
        position: absolute;
        top: 20px;
        right: 24px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
        z-index: 1;
      }
      .lightbox-close:hover {
        opacity: 1;
      }
      .lightbox-caption-text {
        color: #ccc;
        font-size: 0.95rem;
        margin-top: 16px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease 0.15s;
      }
      .lightbox-overlay.active .lightbox-caption-text {
        opacity: 1;
      }
    `}</style>
  );
}
