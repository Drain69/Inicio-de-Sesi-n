/*El usuario, Correo Electrónico es: test@sistema.com y su contraseña es: Password1! coloque eso en Iniciar sesion
para que ingrese, si se equivoca en la contraseña le saltara el enlace de: olvido su contraseña.
Dado que para registrarse necesitariamos una base de datos para convalidar en tiempo real */
let userData = {
    'test@sistema.com': { 
        nombre: 'Usuario de Prueba', 
        password: 'Password1!', 
        intentosFallidos: 0,
        bloqueado: false
    }
};

const MAX_ATTEMPTS = 3;

function displayMessage(elementId, text, isError = true) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.textContent = text;
    el.className = 'message';
    el.classList.add(isError ? 'error' : 'success');

    el.style.height = 'auto'; 
    el.style.padding = '15px'; 
    el.style.margin = '20px auto 0 auto';

    el.classList.remove('hidden'); 
}

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const loginMessage = document.getElementById('login-message');
    const recoverLink = document.getElementById('show-recover');
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

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        const user = userData[email];
        
        if (recoverLink) recoverLink.style.display = 'none'; 

        if (!user) {
            loginPassword.value = '';
            return displayMessage('login-message', '❌ Usuario o contraseña incorrectos.', true);
        }

        if (user.bloqueado) {
            if (recoverLink) recoverLink.style.display = 'block'; 
            return displayMessage('login-message', '❌ Cuenta bloqueada por intentos fallidos. Por favor, recupera tu contraseña.', true);
        }

        if (user.password === password) {
            user.intentosFallidos = 0; 
            
            displayMessage('login-message', `🎉 Bienvenido al sistema, ${user.nombre}`, false);
            loginForm.reset(); 
            
            setTimeout(() => {
                document.querySelector('.container').innerHTML = `<h2 style="color: #5D7C79;">✅ Acceso Correcto</h2><p>Bienvenido al sistema, ${user.nombre}</p><button onclick="window.location.reload()" class="btn primary-btn">Cerrar Sesión</button>`;
            }, 1500);

        } else {
            user.intentosFallidos++; 
            loginPassword.value = '';
            
            if (user.intentosFallidos >= MAX_ATTEMPTS) {
                user.bloqueado = true;
                if (recoverLink) recoverLink.style.display = 'block';
                displayMessage('login-message', '❌ Cuenta bloqueada por intentos fallidos.', true);
            } else {
                const remaining = MAX_ATTEMPTS - user.intentosFallidos;
                displayMessage('login-message', `❌ Usuario o contraseña incorrectos. Te quedan ${remaining} intentos.`, true);
            }
        }
    });

    if (recoverLink) recoverLink.style.display = 'none';
    loginMessage.classList.add('hidden'); 
    
    toggleButtons.forEach(toggle => {
        const iconEyeClosed = toggle.querySelector('.icon-eye-closed');
        const iconEyeOpen = toggle.querySelector('.icon-eye-open');
        
        if (iconEyeClosed) iconEyeClosed.classList.remove('hidden'); 
        if (iconEyeOpen) iconEyeOpen.classList.add('hidden');
    });


});
