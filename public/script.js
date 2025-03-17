document.addEventListener('DOMContentLoaded', () => {
  
  fetch('/api/health')
    .then(response => response.json())
    .then(data => {
      const statusElement = document.getElementById('status');
      statusElement.innerHTML = `
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      `;
      statusElement.classList.add(data.status === 'healthy' ? 'healthy' : 'unhealthy');
    })
    .catch(error => {
      document.getElementById('status').innerHTML = `<p class="error">Error fetching status: ${error.message}</p>`;
    });


  fetch('/api/info')
    .then(response => response.json())
    .then(data => {
      document.getElementById('info').innerHTML = `
        <p><strong>App:</strong> ${data.app}</p>
        <p><strong>Version:</strong> ${data.version}</p>
        <p><strong>Environment:</strong> ${data.environment}</p>
      `;
    })
    .catch(error => {
      document.getElementById('info').innerHTML = `<p class="error">Error fetching info: ${error.message}</p>`;
    });
});