document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sentiment-form');
    const result = document.getElementById('result');
    const sentimentDisplay = document.getElementById('sentiment-display');
    const scoreDisplay = document.getElementById('score-display');
    const loading = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const textInput = document.getElementById('text-input').value;

        // Show loading, hide result
        loading.classList.remove('hidden');
        result.classList.add('hidden');

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textInput }),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            displayResult(data);
        } catch (error) {
            displayError(error.message);
        } finally {
            loading.classList.add('hidden');
        }
    });

    function displayResult(data) {
        sentimentDisplay.textContent = `Sentiment: ${data.sentiment}`;
        scoreDisplay.textContent = `Score: ${data.score.toFixed(2)}`;
        
        sentimentDisplay.className = data.sentiment.toLowerCase();
        result.classList.remove('hidden');
    }

    function displayError(message) {
        sentimentDisplay.textContent = `Error: ${message}`;
        scoreDisplay.textContent = '';
        sentimentDisplay.className = 'error';
        result.classList.remove('hidden');
    }
});