const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const siteRoutes = require('./routes/SiteRoutes');
const blockRoutes = require('./routes/BlockRoutes');

app.use(bodyParser.json());

app.use('/api', siteRoutes);
app.use('/api', blockRoutes);

app.use((req, res) => {
    res.status(404).json({ status: 404, message: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
