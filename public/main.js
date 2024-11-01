document.addEventListener('DOMContentLoaded', () => {
    console.log('Main JavaScript loaded.');

    function loadMiniApp(appName, containerId) {
        // Fetch the HTML content and insert it into the container
        fetch(`/apps/${appName}/${appName}.html`)
            .then(response => response.text())
            .then(htmlContent => {
                const container = document.getElementById(containerId);
                container.innerHTML = htmlContent;

                // Add CSS dynamically
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `/apps/${appName}/${appName}.css`; // Adjust path as needed
                document.head.appendChild(link);

                // Fetch and execute the JavaScript code after the HTML is inserted
                return fetch(`/apps/${appName}/${appName}.js`);
            })
            .then(response => response.text())
            .then(jsContent => {
                console.log(`${appName}.js code fetched and executed.`);
                // Execute the JavaScript content in a safe and controlled scope
                new Function(jsContent)();
            })
            .catch(error => {
                console.error(`Error loading ${appName}:`, error);
                document.getElementById(containerId).innerHTML = `<p>Error loading ${appName}</p>`;
            });
    }

    // Load app1 into the container
    loadMiniApp('app1', 'mini-app-1-container');
});
