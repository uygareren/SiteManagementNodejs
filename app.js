const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const siteRoutes = require('./routes/SiteRoutes');
const blockRoutes = require('./routes/BlockRoutes');
const flatRoutes = require('./routes/FlatRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const userRoutes = require('./routes/UserRoutes');

app.use(bodyParser.json());

app.use('/site-management/admin', adminRoutes);
app.use('/site-management/user', userRoutes);
app.use('/site-management', siteRoutes);
app.use('/site-management', blockRoutes);
app.use('/site-management', flatRoutes);

app.use((req, res) => {
    res.status(404).json({ status: 404, message: 'Not Found' });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
