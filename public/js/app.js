document.getElementById('nameForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const userName = document.getElementById('userName').value.trim();
  const result = document.getElementById('result');

  result.innerText = '';

  if (!userName) {
    result.innerText = 'Please enter a name.';
    return;
  }

  try {
    const response = await fetch('/api/get-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName })
    });

    const data = await response.json();

    if (!response.ok) {
      result.innerText = data.error || 'Something went wrong.';
      return;
    }

    result.innerText = `Name: ${data.name}, Emoji: ${data.emoji}`;
  } catch (err) {
    console.error('Error:', err);
    result.innerText = 'Server connection error.';
  
});
