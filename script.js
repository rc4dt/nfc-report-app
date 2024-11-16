document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('roomId');
    const currentDate = new Date().toISOString().split('T')[0];

    if (document.getElementById('room-id')) {
        document.getElementById('room-id').textContent = roomId || 'Unknown';
        document.getElementById('current-date').textContent = currentDate;
    }

    if (document.getElementById('report-form')) {
        document.getElementById('report-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const report = document.getElementById('report').value;

            await fetch('https://your-api-endpoint.amazonaws.com/submit-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomId, date: currentDate, name, report })
            });

            alert('Report submitted successfully!');
            e.target.reset();
        });
    }

    if (document.getElementById('find-form')) {
        document.getElementById('find-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const date = document.getElementById('date').value;

            const response = await fetch(`https://your-api-endpoint.amazonaws.com/get-reports?date=${date}`);
            const reports = await response.json();

            const reportsDiv = document.getElementById('reports');
            reportsDiv.innerHTML = '<h2>Reports:</h2>' + reports.map(report => `
                <div class="report">
                    <p><strong>Room ID:</strong> ${report.roomId}</p>
                    <p><strong>Name:</strong> ${report.name}</p>
                    <p><strong>Report:</strong> ${report.report}</p>
                </div>
            `).join('');
        });
    }
});
