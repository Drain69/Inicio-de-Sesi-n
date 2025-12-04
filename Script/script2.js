const REGEX = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    nombre: /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/,
    passwordSegura: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
    celular: /^[0-9]{7,12}$/
};

function validateInput(value, regex) {
    return regex.test(value);
}

let userData = {
    'test@sistema.com': { 
        nombre: 'Usuario de Prueba', 
        password: 'Password1!', 
        intentosFallidos: 0,
        bloqueado: false
    }
};

function displayMessage(elementId, text, isError = true) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.textContent = text;
    el.className = 'message';
    el.classList.add(isError ? 'error' : 'success');
    el.classList.remove('hidden'); 
}

document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('register-form');
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target'); 
            const passwordInput = document.getElementById(targetId);
            
            if (!passwordInput) return;

            const iconEyeClosed = this.querySelector('.icon-eye-closed');
            const iconEyeOpen = this.querySelector('.icon-eye-open');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text'; 
                iconEyeClosed.classList.add('hidden');
                iconEyeOpen.classList.remove('hidden');
            } else {
                passwordInput.type = 'password'; 
                iconEyeOpen.classList.add('hidden');
                iconEyeClosed.classList.remove('hidden');
            }
        });
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('reg-nombre').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const movil = document.getElementById('reg-movil').value.trim();
        const password = document.getElementById('reg-password').value;
        const registerMessage = document.getElementById('register-message');

        // 1. VALIDACIONES CON REGEX
        if (!validateInput(nombre, REGEX.nombre)) {
            return displayMessage('register-message', '❌ Nombre inválido. Solo letras y espacios.', true);
        }
        if (!validateInput(email, REGEX.email)) {
            return displayMessage('register-message', '❌ Correo inválido. Formato incorrecto (ej: usuario@dominio.com).', true);
        }
        if (!validateInput(movil, REGEX.celular)) {
            return displayMessage('register-message', '❌ Móvil inválido. Debe tener entre 7 y 12 dígitos (solo números).', true);
        }
        if (!validateInput(password, REGEX.passwordSegura)) {
            return displayMessage('register-message', '❌ Contraseña insegura. Debe tener 6+ caracteres, e incluir mayúscula, minúscula, dígito y símbolo.', true);
        }
        
        if (userData[email]) {
            return displayMessage('register-message', '❌ El usuario con este correo ya está registrado.', true);
        }

        userData[email] = {
            nombre: nombre,
            movil: movil,
            password: password,
            intentosFallidos: 0,
            bloqueado: false
        };

        displayMessage('register-message', '✅ Cuenta creada con éxito!', false);
    });
    
    toggleButtons.forEach(toggle => {
        const iconEyeClosed = toggle.querySelector('.icon-eye-closed');
        const iconEyeOpen = toggle.querySelector('.icon-eye-open');
        
        if (iconEyeClosed) iconEyeClosed.classList.remove('hidden'); 
        if (iconEyeOpen) iconEyeOpen.classList.add('hidden');
    });


});
