const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for mini-apps
app.get('/apps/:appName', (req, res) => {
    const appName = req.params.appName;
    const appPath = path.join(__dirname, `../public/apps/${appName}/${appName}.html`);

    res.sendFile(appPath, (err) => {
        if (err) {
            res.status(404).send('App not found');
        }
    });
});

// Ensure this is the last route to avoid catching static file requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
