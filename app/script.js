document.getElementById('submitForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    const hobby = document.getElementById('hobby').value;
    const email = document.getElementById('email').value;

    const data = {
        hobby: hobby,
        email: email
    };

    fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Data submitted successfully!');
        // Optionally, clear the form
        document.getElementById('submitForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting data.');
    });
});
