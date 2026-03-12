document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Empêche la page de se recharger lors de la soumission du formulaire
  
    const userName = document.getElementById('userName').value;
    
    fetch('/api/get-name', {  // URL sans slash final
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
    .catch(err => console.error('Error:', err));  // En cas d'erreur
  });
