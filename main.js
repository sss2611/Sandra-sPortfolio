document.querySelectorAll('#menuCollapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('menuCollapse');
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(menu);
        if (window.innerWidth < 768) {
            bsCollapse.hide();
        }
    });
});

