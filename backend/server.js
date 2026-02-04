require('dotenv').config();

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Documentation available at http://localhost:' + port + '/api-docs');
    console.log(`Project Manager server running on port ${port}`);
});