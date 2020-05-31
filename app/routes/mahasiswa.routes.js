const router = require('express').Router();
const MahasiswaController = require('../controllers/mahasiswa.controller');

/**
 * @route       GET  /mahasiswa 
 * @params      none
 * @deskripsi   Tampilkan seluruh mahasiswa
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.status(500).send({ message: err.message || "Beberapa kesalahan terjadi saat mencari Mahasiswa." }); || res.send(data);
 */
router.get('/', MahasiswaController.cariSemuaMahasiswa);

/**
 * @route       GET  /mahasiswa/:nim 
 * @params      :nim nim mahasiswa
 * @deskripsi   Tampilkan mahasiswa berdasarkan nim
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.status(404).send({ message: `Tidak ditemukan mahasiswa dengan nim ${req.params.nim}` }) || res.status(500).send({ message: err.message || "Beberapa kesalahan terjadi saat mencari Mahasiswa." }); || res.send(data);
 */
router.get('/:nim', MahasiswaController.cariMahasiswa);

/**
 * @route       POST  /mahasiswa 
 * @params      none
 * @deskripsi   Handle penambahan mahasiswa
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.status(400).send({ message: "Konten tidak boleh kosong!" }) || res.status(500).send( message: err.message || "Beberapa kesalahan terjadi saat menambah Mahasiswa." }); || || res.send(data);
 */
router.post('/', MahasiswaController.tambahMahasiswa);

/**
 * @route       PUT  /mahasiswa/:nim 
 * @params      :nim nim mahasiswa
 * @deskripsi   Ubah data mahasiswa berdasarkan nim 
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.status(400).send({ message: "Konten tidak boleh kosong!" }) || res.status(500).send( message: err.message || "Beberapa kesalahan terjadi saat mengubah Mahasiswa." }); || res.status(404).send({ message: `Tidak ditemukan mahasiswa dengan nim ${req.params.nim}` }) || res.send(data);
 */
router.put('/:nim', MahasiswaController.editDataMahasiswa);

/**
 * @route       DELETE  /mahasiswa 
 * @params      none
 * @deskripsi   Hapus seluruh mahasiswa
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.status(500).send({ message: err.message || "Beberapa kesalahan terjadi saat menghapu Mahasiswa." }); || res.send(data);
 */
router.delete('/', MahasiswaController.hapusSemuaMahasiswa);

/**
 * @route       GET  /mahasiswa/:nim 
 * @params      :nim nim mahasiswa
 * @deskripsi   Hapus mahasiswa berdasarkan nim 
 * @access      Public    
 * @Protection  none
 * @middleware  none
 * @ereturn     res.status(404).send({ message: `Tidak ditemukan mahasiswa dengan nim ${req.params.nim}` }) || res.status(500).send({ message: err.message || "Beberapa kesalahan terjadi saat menghapus Mahasiswa." }); || res.send(data);
 */
router.delete('/:nim', MahasiswaController.hapusMahasiswa);

module.exports = router;