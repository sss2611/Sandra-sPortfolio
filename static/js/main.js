document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío real

        // Opcional: validación básica
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !email || !mensaje) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor completá todos los campos antes de enviar.',
            });
            return;
        }

        // Simulación de envío exitoso
        Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarme. Te responderé pronto.',
            confirmButtonColor: '#2c3e50',
        });

        form.reset(); // Limpia el formulario
    });
});

// RECEPCIÓN DE CORREO ELECTRÓNICO
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch('https://formspree.io/f/mpwywkzl', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        status.textContent = '¡Mensaje enviado con éxito!';
        form.reset();
    } else {
        status.textContent = 'Hubo un error al enviar el mensaje.';
    }
});

// MENU MOVIL
const toggle = document.getElementById('menuToggle');
const icons = document.querySelectorAll('.icon-item');
let active = false;

toggle.addEventListener('click', () => {
    active = !active;
    icons.forEach(icon => {
        const angleDeg = parseFloat(icon.style.getPropertyValue('--angle'));
        const angleRad = angleDeg * (Math.PI / 180);
        const radius = 100;

        if (active) {
            const x = -radius * Math.cos(angleRad);
            const y = -radius * Math.sin(angleRad);
            icon.style.transform = `translate(${x}px, ${y}px)`;
            icon.style.opacity = '1';
        } else {
            icon.style.transform = `translate(0, 0)`;
            icon.style.opacity = '0';
        }
    });
});

// Inicializa Google Translate (función global que llama el script de Google)
window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'es',
            includedLanguages: 'en,es',
            autoDisplay: false
        },
        'google_translate_element'
    );
};

// Espera a que Google inyecte el <select> (.goog-te-combo)
function waitForCombo(maxMs = 8000, stepMs = 100) {
    return new Promise((resolve, reject) => {
        const start = Date.now();

        // 1) Polling
        const poll = setInterval(() => {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                clearInterval(poll);
                resolve(select);
            } else if (Date.now() - start > maxMs) {
                clearInterval(poll);
                reject(new Error('Translate combo not found'));
            }
        }, stepMs);

        // 2) Por si aparece de golpe: MutationObserver
        const observer = new MutationObserver(() => {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                observer.disconnect();
                clearInterval(poll);
                resolve(select);
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}

// Elimina la barra si Google la inyecta
function removeBanner() {
    const frame = document.querySelector('iframe.goog-te-banner-frame');
    if (frame) frame.remove();
    document.body.style.top = '0px';
}

// Alterna idioma y limpia barra
async function toggleTranslate() {
    try {
        const select = await waitForCombo();
        const newLang = select.value === 'en' ? 'es' : 'en';
        select.value = newLang;
        select.dispatchEvent(new Event('change'));

        // Cambia el texto del botón según idioma
        const btn = document.getElementById('translate-btn');
        if (newLang === 'en') {
            btn.textContent = 'Español';
        } else {
            btn.textContent = 'Inglés';
        }

        // Varios intentos por si reaparece la barra
        setTimeout(removeBanner, 200);
        setTimeout(removeBanner, 800);
        setTimeout(removeBanner, 1800);
    } catch (err) {
        console.warn('Google Translate no está listo aún:', err.message);
    }
}

// Asegura que el botón exista y funcione
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('translate-btn');
    if (btn) {
        // Estado inicial: página en español → mostrar "ING"
        btn.textContent = 'ING';
        btn.addEventListener('click', toggleTranslate);
    }
});
