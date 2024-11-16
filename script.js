document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    const roomIdElement = document.getElementById('roomId');
    const dateElement = document.getElementById('current-date');
    const form = document.getElementById('report-form');

    // Set the roomId and current date
    roomIdElement.textContent = roomId;
    dateElement.textContent = new Date().toLocaleDateString();

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const userName = document.getElementById('user-name').value;
        const reportText = document.getElementById('report-text').value;
        const date = new Date().toLocaleDateString();

        // Construct the report object
        const report = {
            roomId,
            date,
            userName,
            reportText
        };

        // Save the report to Firebase (make sure Firebase is set up and linked in Firebase Console)
        fetch('https://your-firebase-function-url/submit-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(report)
        })
        .then(response => response.json())
        .then(data => {
            alert('Report submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit the report');
        });
    });
});
