document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();  
  
    const userName = document.getElementById('userName').value;
    
    fetch('/api/get-name', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: userName })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').innerText = `Name: ${data.name}, Emoji: ${data.emoji}`;
    })
    .catch(err => console.error('Error:', err)); 
  });

