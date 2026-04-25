document.addEventListener('DOMContentLoaded', () => {
    // Password Visibility Toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    });

    // Password Strength Meter Logic
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    if (passwordInput && strengthMeter) {
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            if (val.length > 0) {
                strengthMeter.style.display = 'block';
                strengthText.style.display = 'block';

                let strength = 0;
                if (val.length >= 8) strength++;
                if (/[A-Z]/.test(val)) strength++;
                if (/[0-9]/.test(val)) strength++;
                if (/[^A-Za-z0-9]/.test(val)) strength++;

                strengthBar.className = 'strength-bar';
                if (strength <= 1) {
                    strengthBar.classList.add('strength-weak');
                    strengthText.innerText = 'Weak';
                    strengthText.style.color = 'var(--error-red)';
                } else if (strength <= 3) {
                    strengthBar.classList.add('strength-medium');
                    strengthText.innerText = 'Good';
                    strengthText.style.color = 'var(--warning-yellow)';
                } else {
                    strengthBar.classList.add('strength-strong');
                    strengthText.innerText = 'Strong';
                    strengthText.style.color = 'var(--success-green)';
                }
            } else {
                strengthMeter.style.display = 'none';
                strengthText.style.display = 'none';
            }
        });
    }

    // Signup Validation (Match Password)
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            const pass = document.getElementById('password').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (pass !== confirm) {
                e.preventDefault();
                alert('Passwords do not match!');
            }
        });
    }

    // Forgot Password Mock
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            forgotForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        });
    }

    // Login Form Mock
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.btn-auth');
            const btnText = btn.querySelector('span');

            btn.disabled = true;
            btnText.innerText = 'Authenticating...';

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
});
