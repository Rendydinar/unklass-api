const router = require('express').Router();
const indexController = require('../controllers/index.controller');

/**
 * @route       GET  / 
 * @params      none
 * @deskripsi   Send Message Welcome to user 
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.json({ pesan: 'Selamat datang di UNKLASS API...' });
 */
router.get('/', indexController.landingPage);

module.exports = router;