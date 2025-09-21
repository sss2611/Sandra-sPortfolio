document.addEventListener('DOMContentLoaded', function () {
  const offcanvasElement = document.getElementById('mobileMenu');
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);

  offcanvasElement.querySelectorAll('a.nav-link, a.dropdown-item').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      const isDropdownToggle = link.classList.contains('dropdown-toggle');

      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Scroll natural sin compensación
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (!isDropdownToggle) {
        offcanvas.hide();
      }
    });
  });
});
