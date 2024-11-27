document.getElementById('submissionForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from reloading the page

  const email = document.getElementById('email').value;
  const hobby = document.getElementById('hobby').value;

  try {
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, hobby }),
    });

    if (response.ok) {
      alert('Data submitted successfully!');
    } else {
      const error = await response.json();
      console.error('Error:', error.message);
      alert('Error submitting data: ' + error.message);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    alert('Error connecting to server');
  }
});
