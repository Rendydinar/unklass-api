const sql = require('./db');

class ModelMahasiswa {
	tambahMahasiswa(mahasiswaBaru, result) {
		sql.query("INSERT INTO mahasiswa SET ?", mahasiswaBaru, (err, res) => {
			if(err) {
				console.log('Terjadi error saat menambahkan mahasiswa kedalam database. Pesan Error: ', err);
				result(err, null);
				return; 
			}
			// console.log('Berhasil menambahkan mahasiswa: ', { id: res.insertId, ...mahasiswaBaru});
			result(null, {id: res.insertId, ...mahasiswaBaru});
		});
	}

	cariMahasiswa(mahasiswaNim, result) {
		sql.query(`SELECT * FROM mahasiswa WHERE nim = ${mahasiswaNim}`, (err, res) => {
			if(err) {
				console.log(`Terjadi error saat mencari mahasiswa didalam database. Pesan Error: `, err);
				result(err, null);
				return; 				
			}

			if(res.length) {
				// console.log(`Berhasil mencari mahasiswa`, res[0]);
				result(null, res[0]);
				return;
			}

			// tidak berhasil menemukan mahasiswa dengan nim yang dicari
			result({ status: 'Mahasiswa tidak ditemukan' }, null);
		});
	}

	cariSemuaMahasiswa(result) {
		sql.query("SELECT * FROM mahasiswa", (err, res) => {
			if(err) {
				console.log(`Terjadi error saat mencari semua mahasiswa didalam database. Pesan Error: `, err);
				result(err, null);
				return; 								
			}
			result(null, res);
		});
	}

	editDataMahasiswa(mahasiswaNim, mahasiswaDataEdit, result) {
		sql.query("UPDATE mahasiswa SET nama_lengkap = ?, nim = ?, semester = ?, jenis_kelamin = ?, status = ? WHERE nim = ?",
    	  [mahasiswaDataEdit.nama_lengkap, mahasiswaDataEdit.nim, mahasiswaDataEdit.semester, mahasiswaDataEdit.jenis_kelamin, mahasiswaDataEdit.status, mahasiswaNim],
    	  (err, res) => {
			if(err) {
				console.log(`Terjadi error saat mengubah data mahasiswa didalam database. Pesan Error: `, err);
				result(err, null);
				return; 								
			}

			if(res.affectedRows == 0) {
				// tidak berhasil mengubah data mahasiswa karena tidak dapat menemukan mahasiswa dengan nim tersebut didalam database
				result({ status: 'Mahasiswa tidak ditemukan' }, null);
			}

			// berhasil mengubah data mahasiswa kedalam database
			// console.log(res);
			// console.log('Berhasil mengubah mahasiswa: ', {...mahasiswaDataEdit});
			result(null, {...mahasiswaDataEdit})
    	});
	}

	hapusMahasiswa(mahasiswaNim, result) {
		sql.query("DELETE FROM mahasiswa WHERE nim = ?", mahasiswaNim, (err, res) => {
			if(err) {
				console.log(`Terjadi error saat menghapus mahasiswa didalam database. Pesan Error: `, err);
				result(err, null);
				return; 												
			}

			if(res.affectedRows == 0) {
				// tidak berhasil menghapus mahasiswa karena tidak dapat menemukan mahasiswa dengan nim tersebut didalam database
				result({ status: 'Mahasiswa tidak ditemukan' }, null);
				return;
			}

			result(null, res);
		})
	} 

	hapusSemuaMahasiswa(result) {
		sql.query("DELETE FROM mahasiswa", (err, res) => {
			if(err) {
				console.log(`Terjadi error saat menghapus mahasiswa didalam database. Pesan Error: `, err);
				result(err, null);
				return; 												
			}
			result(null, res);
		});
	}
}

module.exports = new ModelMahasiswa;