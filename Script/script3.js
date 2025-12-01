document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecuperacion');
    const nuevaContrasena = document.getElementById('nuevaContrasena');
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const mensajeDiv = document.getElementById('mensaje');
    const toggleButtons = document.querySelectorAll('.toggle-password');
    const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    const rules = {
        length: { element: document.getElementById('rule-length'), regex: /.{6,}/ },
        upper: { element: document.getElementById('rule-upper'), regex: /(?=.*[A-Z])/ },
        lower: { element: document.getElementById('rule-lower'), regex: /(?=.*[a-z])/ },
        number: { element: document.getElementById('rule-number'), regex: /(?=.*\d)/ },
        symbol: { element: document.getElementById('rule-symbol'), regex: /(?=.*[\W_])/ }
    };
    nuevaContrasena.addEventListener('input', () => {
        const value = nuevaContrasena.value;
        confirmarContrasena.value = ''; 
        
        for (const key in rules) {
            const rule = rules[key];
            if (rule.regex.test(value)) {
                rule.element.classList.add('valid');
                rule.element.classList.remove('invalid');
            } else {
                rule.element.classList.add('invalid');
                rule.element.classList.remove('valid');
            }
        }
    });
    function mostrarMensaje(texto, tipo) {
        mensajeDiv.textContent = texto;
        mensajeDiv.className = `message ${tipo}`;
        mensajeDiv.classList.remove('hidden');
    }
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        mensajeDiv.classList.add('hidden'); 

        const nuevaC = nuevaContrasena.value;
        const confirmarC = confirmarContrasena.value;

        if (!REGEX_PASSWORD.test(nuevaC)) {
            mostrarMensaje('❌ La contraseña no cumple con todos los requisitos de seguridad.', 'error');
            return;
        }

        if (nuevaC !== confirmarC) {
            mostrarMensaje('❌ Las contraseñas ingresadas no coinciden.', 'error');
            return;
        }

        mostrarMensaje('✅ Contraseña actualizada. Ahora puede iniciar sesión.', 'exito');
        nuevaContrasena.value = '';
        confirmarContrasena.value = '';

        for (const key in rules) {
            rules[key].element.classList.remove('valid', 'invalid');
        }
    });

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const iconOpen = button.querySelector('.icon-eye-open');
            const iconClosed = button.querySelector('.icon-eye-closed');

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                iconOpen.classList.remove('hidden');
                iconClosed.classList.add('hidden');
            } else {
                targetInput.type = 'password';
                iconOpen.classList.add('hidden');
                iconClosed.classList.remove('hidden');
            }
        });
    });
});