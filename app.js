const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

// Render Home Page
app.get('/', (req, res) => {
    res.render('homepage')
});

// Error for status code 500
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something failed'
    res.status(statusCode).render('error', { err })
})

// Port Selection
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})