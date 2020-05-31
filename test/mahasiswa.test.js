//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Mahasiswa = require('../app/models/mahasiswa.model');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

// use server
chai.use(chaiHttp);

// Block Testing Mahasiswa
describe('Mahasiswa',() => {
	// Setiap melakukan testing diberbagai describe (route), kita hapus/reset database
	beforeEach((done) => {  
		Mahasiswa.hapusSemuaMahasiswa((err, data) => {
			done(); // metioning the test was successful
		});
	});

	// Test GET /mahasiswa route
	describe('/GET mahasiswa',() => {
		it('seharusnya mendapatkan seluruh mahasiswa',(done) => {
			chai.request(server)
			  .get('/mahasiswa')
			  .end((err, res) => {
			  	res.should.have.status(200); // status ynag seharus dikembalikan
			  	res.body.data.should.be.a('array'); // tipe data body yang seharusnya dikembalikan 
			  	res.body.data.length.should.be.eql(0); // jumlah data body yang seharusnya dikembalikan 

			  	if(err) console.log('error testing: ', err);
			  	done();
			  });
		});
	});

	// Test POST /mahasiswa route
	describe('/POST mahasiswa',() => {
		it('seharus dapat POST mahasiswa karena data mahasiswa lengkap',(done) => {
			// data dummy mahasiswa
			let mahasiswaBaru = {
				nama_lengkap: 'Umbu Theofilus Dendimara', 
				nim: '2119070', 
				semester: 2, 
				jenis_kelamin: 'L',
				status: 1
			};

			chai.request(server)
			  .post('/mahasiswa')
			  .send(mahasiswaBaru)
			  .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.status.should.be.eql(true);
			  	res.body.data.should.be.a('object');
			  	res.body.data.should.have.property('id');
			  	res.body.data.should.have.property('nama_lengkap');
			  	res.body.data.should.have.property('nim');
			  	res.body.data.should.have.property('semester');
			  	res.body.data.should.have.property('jenis_kelamin');
			  	res.body.data.should.have.property('status');
			  	done();
			  });
		});
	});

	// Test GET /mahasiswa/:nim route
	describe('/GET/:nim mahasiswa',() => {
		it('seharusnya mendapatkan mahasiswa dengan nim tertentu',(done) => {

			// data dummy mahasiswa
			let mahasiswaBaru = {
				nama_lengkap: 'Umbu Theofilus Dendimara', 
				nim: '2119070', 
				semester: 2, 
				jenis_kelamin: 'L',
				status: 1
			};

			Mahasiswa.tambahMahasiswa(mahasiswaBaru, (err, result) => {
				chai.request(server)
				  .get(`/mahasiswa/${mahasiswaBaru.nim}`)
				  .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.status.should.be.eql(true);
				  	res.body.data.should.be.a('object');
				  	res.body.data.should.have.property('id');
				  	res.body.data.should.have.property('nama_lengkap');
				  	res.body.data.should.have.property('nim');
				  	res.body.data.should.have.property('semester');
				  	res.body.data.should.have.property('jenis_kelamin');
				  	res.body.data.should.have.property('status');


				  	if(err) console.log('error testing: ', err);
				  	done();
			  	});
			});
		});
	});

	// Test PUT /mahasiswa/:nim route
	describe('/PUT/:nim mahasiswa',() => {
		it('seharus dapat PUT mahasiswa karena nim dan data mahasiswa valid',(done) => {
			// data dummy mahasiswa
			let mahasiswaBaru = {
				nama_lengkap: 'Umbu Theofilus Dendimara', 
				nim: '2119070', 
				semester: 2, 
				jenis_kelamin: 'L',
				status: 1
			};

			Mahasiswa.tambahMahasiswa(mahasiswaBaru, (err, result) => {
				chai.request(server)
				  .put(`/mahasiswa/${mahasiswaBaru.nim}`)
				  .send({ nama_lengkap: 'Umbu Theofilus Dendimara', nim: '2119070', semester: 3, jenis_kelamin: 'L', status: 1})
				  .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.status.should.be.eql(true);
				  	res.body.data.should.be.a('object');
				  	res.body.data.should.have.property('nama_lengkap');
				  	res.body.data.should.have.property('nim');
				  	res.body.data.semester.should.be.eql(3);
				  	res.body.data.should.have.property('jenis_kelamin');
				  	res.body.data.should.have.property('status');

				  	if(err) console.log('error testing: ', err);
				  	done(); 
			  	});
			});
		});
	});

	describe('/DELETE/:nim mahasiswa', () => {
		it('seharusnya dapat menghapus mahasiswa dengan nim yang valid', (done) => {
			let mahasiswa = {
				nama_lengkap: 'Umbu Theofilus Dendimara', 
				nim: '2119070', 
				semester: 2, 
				jenis_kelamin: 'L',
				status: 1
			};

			Mahasiswa.tambahMahasiswa(mahasiswa, (err, result) => {
				chai.request(server)
				  .delete(`/mahasiswa/${mahasiswa.nim}`)
				  .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.status.should.be.eql(true);
				  	res.body.data.should.be.a('object');
				  	res.body.data.affectedRows.should.be.eql(1);

				  	if(err) console.log('error testing: ', err);
				  	done(); 
			  	});
			});
		});
	});

	describe('/DELETE mahasiswa', function() {
		it('seharusnya dapat menghapus seluruh mahasiswa', (done) => {
			let mahasiswa = {
				nama_lengkap: 'Umbu Theofilus Dendimara', 
				nim: '2119070', 
				semester: 2, 
				jenis_kelamin: 'L',
				status: 1
			};

			Mahasiswa.tambahMahasiswa(mahasiswa, (err, result) => {
				chai.request(server)
				  .delete(`/mahasiswa/`)
				  .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.status.should.be.eql(true);
				  	res.body.data.should.be.a('object');
				  	res.body.data.insertId.should.be.eql(0);

				  	if(err) console.log('error testing: ', err);
				  	done(); 
			  	});
			});

		});		
	});
	
});






