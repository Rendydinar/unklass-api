class IndexController {
	landingPage(req, res, next) {
		res.json({
			pesan: 'Selamat datang di UNKLASS API...'
		});
	}
}

module.exports = new IndexController;