const Mahasiswa = require('../models/mahasiswa.model');

class MahasiswaController {
	cariSemuaMahasiswa(req, res, next) {
		Mahasiswa.cariSemuaMahasiswa((err, data) => {
		    if (err){
			      res.status(500).send({
			      	status: false,
			        message:
			          err.message || "Beberapa kesalahan terjadi saat mencari Mahasiswa."
			      });

		    } else res.send({ status: true, data });
		});
	}
	
	cariMahasiswa(req, res, next) {
		Mahasiswa.cariMahasiswa(String(req.params.nim), (err, data) => {
		    if (err) {
		    	if(err.status === 'Mahasiswa tidak ditemukan') {
		    		res.status(404).send({
		    			status: false,
		    			message: `Tidak ditemukan mahasiswa dengan nim ${req.params.nim}`
		    		})
		    	} else {
					res.status(500).send({
		    			status: false,
						message:
						  err.message || "Beberapa kesalahan terjadi saat mencari Mahasiswa."
					});
	    		}	
		    }  else res.send({ status: true, data });
		})
	}
	
	tambahMahasiswa(req, res, next) {
		// Validate request
		if ((!req.body.nama_lengkap) || (!req.body.nim) || (!req.body.semester) || (!req.body.jenis_kelamin) || (!req.body.status)) {
		    return res.status(400).send({
		    	status: false,
		      	message: "Konten tidak boleh kosong!"
			});
		 }

		const MahasiswaBaru = {
			nama_lengkap: String(req.body.nama_lengkap), 
			nim: String(req.body.nim), 
			semester: Number(req.body.semester), 
			jenis_kelamin: String(req.body.jenis_kelamin),
			status: req.body.status === "true" ? 1 : 0
		};

		Mahasiswa.tambahMahasiswa(MahasiswaBaru, (err, data) => {
		    if (err) {
			      res.status(500).send({
			    	status: false,
			        message:
			          err.message || "Beberapa kesalahan terjadi saat membuat Mahasiswa."
			      });

		    } else res.send({ status: true, data });
		});
	}
	
	editDataMahasiswa(req, res, next) {
		// Validate request
		if ((!req.body.nama_lengkap) || (!req.body.nim) || (!req.body.semester) || (!req.body.jenis_kelamin) || (!req.body.status)) {
		    return res.status(400).send({
		    	status: false,
		      	message: "Konten tidak boleh kosong!"
			});
		}

		Mahasiswa.editDataMahasiswa(String(req.params.nim), {
			nama_lengkap: String(req.body.nama_lengkap), 
			nim: String(req.body.nim), 
			semester: Number(req.body.semester), 
			jenis_kelamin: String(req.body.jenis_kelamin),
			status: req.body.status === "true" ? 1 : 0
		}, (err, data) => {
		    if (err) {
		    	if(err.status === 'Mahasiswa tidak ditemukan') {
		    		res.status(404).send({
		    			status: false,
		    			message: `Tidak ditemukan mahasiswa dengan nim ${req.params.nim}`
		    		})
		    	} else {
					res.status(500).send({
						status: false,
						message:
						  err.message || "Beberapa kesalahan terjadi saat mengubah Mahasiswa."
					});
	    		}	
		    }  else res.send({ status: true, data });
		});
	}
	
	hapusSemuaMahasiswa(req, res, next) {
		Mahasiswa.hapusSemuaMahasiswa((err, data) => {
		    if (err) {
			      res.status(500).send({
			      	status: false,
			        message:
			          err.message || "Beberapa kesalahan terjadi saat menghapus Mahasiswa."
			      });
		    } else res.send({ status: true, data });			
		}); 
	}

	hapusMahasiswa(req, res, next) {
		Mahasiswa.hapusMahasiswa(String(req.params.nim), (err, data) => {
		    if (err) {
		    	if(err.status === 'Mahasiswa tidak ditemukan') {
		    		res.status(404).send({
				    	status: false,
		    			message: `Tidak ditemukan mahasiswa dengan nim ${req.params.nim}`
		    		})
		    	} else {
					res.status(500).send({
				    	status: false,
						message:
						  err.message || "Beberapa kesalahan terjadi saat menghapus Mahasiswa."
					});
	    		}	
		    }  else res.send({ status: true, data });			
		});
	}

}

module.exports = new MahasiswaController;

