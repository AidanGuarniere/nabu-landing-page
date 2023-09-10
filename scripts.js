document.addEventListener('DOMContentLoaded', (event) => {
    const targetDate = new Date('September 17, 2023 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const timeDifference = targetDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (timeDifference < 0) {
            clearInterval(interval);
            document.getElementById('countdown').textContent = 'Nabu is live!';
        }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();  // Call once immediately to avoid 1 second delay
});
