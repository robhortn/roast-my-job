async function roastJob() {
  const input = document.getElementById('jobInput').value;
  const output = document.getElementById('output');
  const loading = document.getElementById('loading');

  output.textContent = '';
  loading.classList.remove('hidden');

  try {
    const response = await fetch('/.netlify/functions/roast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDescription: input }),
    });
    const data = await response.json();

    if (data.roast) {
      output.textContent = data.roast;
    } else {
      output.textContent = 'Error: ' + data.error;
    }
  } catch (error) {
    output.textContent = 'Error roasting job: ' + error.message;
  } finally {
    loading.classList.add('hidden');
  }
}

function resetRoast() {
  document.getElementById('jobInput').value = '';
  document.getElementById('output').textContent = '';
  document.getElementById('loading').classList.add('hidden');
}
