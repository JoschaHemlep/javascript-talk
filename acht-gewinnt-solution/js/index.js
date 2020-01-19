// Daten nachladen
fetch('http://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(person => {
        console.log(person);
        document.querySelector('#email').value = person.email;
        document.querySelector('#password').value = person.name;
    });

function login() {
    console.log(location);

    // Dialoge
    alert('ALERT!');

    const isConfirmed = confirm('Please confirm');

    const isYes = prompt('Please enter "yes" to continue:', 'yes');

    if (isConfirmed && isYes === 'yes') {
        // Navigation
        location.href = location.origin + '/record-time.html';
    }
}
