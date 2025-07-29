async function roastJob() {
  const input = document.getElementById('jobInput').value;
  const output = document.getElementById('output');
  const loading = document.getElementById('loading');

  output.textContent = '';
  loading.classList.remove('hidden');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: 'gpt-4o', // or try "gpt-4o" if you're using the new model
        messages: [
          {
            role: 'system',
            content:
              'You are a sarcastic, burned-out senior developer. Given a job description, you roast it with brutal honesty, sarcasm, and dev humor. Highlight red flags, outdated tech, lowball pay, and end with a Hell No rating (1–10).',
          },
          {
            role: 'user',
            content: input,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI raw response:', data); // ✅ Debug line

    if (data.choices && data.choices.length > 0) {
      output.textContent = data.choices[0].message.content;
    } else if (data.error) {
      output.textContent = 'API Error: ' + data.error.message;
    } else {
      output.textContent = 'Unexpected response format.';
    }
  } catch (error) {
    output.textContent = 'Error roasting job: ' + error.message;
  } finally {
    loading.classList.add('hidden');
  }
}
