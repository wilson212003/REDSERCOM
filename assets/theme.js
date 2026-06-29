/* RED SERVCOM — Theme JavaScript */

document.addEventListener('DOMContentLoaded', function () {

  // ── Cart Count ──
  function updateCartCount() {
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => {
        document.querySelectorAll('.cart-count').forEach(el => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      });
  }

  // ── Add to Cart ──
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const variantId = this.dataset.variantId;
      if (!variantId) return;
      const originalText = this.textContent;
      this.textContent = 'Agregando...';
      this.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
        .then(r => r.json())
        .then(() => {
          this.textContent = '✓ Agregado';
          updateCartCount();
          setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
          }, 2000);
        })
        .catch(() => {
          this.textContent = 'Error';
          this.disabled = false;
        });
    });
  });

  // ── Wishlist toggle ──
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
    });
  });

  // ── Mobile nav toggle ──
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
    });
  }

  // ── Sticky header shadow ──
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // ── Newsletter form ──
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;
      const btn = this.querySelector('.newsletter-btn');
      if (!email) return;
      btn.textContent = '✓ Suscrito';
      btn.disabled = true;
    });
  }

  updateCartCount();
});
