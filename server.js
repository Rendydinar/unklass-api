const express = require('express');
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

/**
 * parse requests of content-type - application/x-www-form-urlencoded
 * Catatan Singkat Mengenai extended: false/true
 * If extended is false, you can not post "nested object"
 * person[name] = 'cw'
 * // Nested Object = { person: { name: cw } }
 * If extended is true, you can do whatever way that you like.
 */
app.use(express.urlencoded({ extended: true }));

// Set Routes
app.use('/', require('./app/routes/index.routes'));
app.use('/mahasiswa', require('./app/routes/mahasiswa.routes'));

// Set port, listen for requests 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}...`);
});

module.exports = app; // for testing