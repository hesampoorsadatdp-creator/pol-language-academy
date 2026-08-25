/**
 * Pol Language Academy (آکادمی زبان پل) - Main Interactions
 * Pure Vanilla JavaScript - Cloudflare Pages Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Active Link Highlighter based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'courses.html' && href === 'products.html') || (currentPath === 'products.html' && href === 'courses.html')) {
      link.classList.add('active');
    }
  });

  // Convert numbers to Persian digits visually where marked
  convertPersianNumbers();
});

/**
 * Toast Notification Utility
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-[#052656] text-white border-l-4 border-[#24A45A]' : 'bg-red-600 text-white';
  toast.className = `${bgClass} p-4 rounded-xl shadow-2xl flex items-center justify-between text-sm animate-fade-in`;
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined">${type === 'success' ? 'check_circle' : 'error'}</span>
      <span>${message}</span>
    </div>
    <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white mr-2">
      <span class="material-symbols-outlined text-sm">close</span>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/**
 * Convert Latin numerals to Persian numerals
 */
function toPersianDigits(str) {
  const persianMap = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/[0-9]/g, match => persianMap[parseInt(match, 10)]);
}

function convertPersianNumbers() {
  document.querySelectorAll('.farsi-num').forEach(el => {
    el.textContent = toPersianDigits(el.textContent);
  });
}
