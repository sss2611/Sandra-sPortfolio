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

