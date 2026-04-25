document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;

    const steps = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const stepText = document.getElementById('step-text');
    const progressFill = document.querySelector('.progress-fill');

    const wsNameInput = document.getElementById('ws-name');
    const projNameInput = document.getElementById('proj-name');

    // Step validation for Step 1
    wsNameInput.addEventListener('input', () => {
        nextBtn.disabled = wsNameInput.value.trim() === '';
    });

    // Handle template selection in Step 3
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            templateCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            nextBtn.disabled = false;
        });
    });

    function updateStep() {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === currentStep - 1) {
                step.classList.add('active');
            }
        });

        // Final step handling
        if (currentStep > totalSteps) {
            document.getElementById('step-final').classList.add('active');
            document.getElementById('onboardingFooter').style.display = 'none';
            document.querySelector('.onboarding-header').style.opacity = '0';
            startConfetti();

            // Populate summary
            document.getElementById('final-ws').innerText = wsNameInput.value;
            document.getElementById('final-proj').innerText = projNameInput.value || 'Blank Workspace';
            return;
        }

        stepText.innerText = `Step ${currentStep} of ${totalSteps}`;
        progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

        // Button states
        backBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
        nextBtn.innerText = currentStep === totalSteps ? 'Finish' : 'Continue';

        // Validation per step
        if (currentStep === 1) {
            nextBtn.disabled = wsNameInput.value.trim() === '';
        } else if (currentStep === 3) {
            const selected = document.querySelector('.template-card.selected');
            nextBtn.disabled = !selected;
        } else {
            nextBtn.disabled = false;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep <= totalSteps) {
            currentStep++;
            updateStep();
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    });

    // Skip handling
    document.querySelectorAll('.skip-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentStep = parseInt(link.getAttribute('data-next'));
            updateStep();
        });
    });

    // Add row in invite
    document.getElementById('addRowBtn').addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'invite-row';
        row.innerHTML = `
            <input type="email" placeholder="email@example.com">
            <select>
                <option>Admin</option>
                <option>Manager</option>
                <option>Host</option>
                <option>Artisan</option>
                <option>Viewer</option>
            </select>
        `;
        document.getElementById('inviteRows').appendChild(row);
    });

    // Basic Confetti
    function startConfetti() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let particles = [];
        const colors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 360
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                p.y += p.speed;
                if (p.y > canvas.height) p.y = -20;
            });
            requestAnimationFrame(draw);
        }
        draw();
    }
});
