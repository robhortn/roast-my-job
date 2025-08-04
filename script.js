async function roastJob() {
  const input = document.getElementById('jobInput').value;
  const output = document.getElementById('output');
  const loading = document.getElementById('loading');

  // Clear output and show loading
  output.textContent = '';
  output.classList.remove('show');
  loading.classList.add('show');

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
      output.classList.add('show');
    } else {
      output.textContent = 'Error: ' + data.error;
      output.classList.add('show');
    }
  } catch (error) {
    output.textContent = 'Error roasting job: ' + error.message;
    output.classList.add('show');
  } finally {
    loading.classList.remove('show');
  }
}

function resetRoast() {
  document.getElementById('jobInput').value = '';
  document.getElementById('output').textContent = '';

  // Hide both loading and output elements
  document.getElementById('loading').classList.remove('show');
  document.getElementById('output').classList.remove('show');
}
