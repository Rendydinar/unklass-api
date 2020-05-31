/**
 * Sedikit Deskripsi
 * API Testing adalah salah satu tipe pengujian dalam software testing yang dimana kita menguji suatu API secara langsung dan sebagai bagian dari integration testing untuk memastikan apakah yang kita uji tadi sudah sesuai dengan ekspektasi kita atau tidak.
 * Sekarang ini sudah banyak tools yang mendukung dalam API Testing, sebut saja Postman, soapUI, Rest-Assured, MochaJS, dsb. 
 * Nah kali ini kita akan mencoba melakukan API Testing dengan salah satu tools yaitu Mocha + Chai.
 * MochaJS adalah salah satu Javascript test framework yang berjalan di NodeJs dan bersifat asynchronous. 
 * Kebanyakan orang menggunakan MochaJS karena tiap test berjalan secara pararel dan mudah untuk diimplementasikan. 
 * Chai sendiri adalah library yang digunakan untuk memudahkan Mocha dalam melakukan assertion pada setiap API yang dipanggil. 
 * Mocha dapat digunakan dalam 2 styles, BDD dan TDD, tergantung selera.
 *
 * Hal kedua adalah secara umum penggunaan MochaJS hanya terdiri dari describe() dan it(). 
 * Dengan kedua method tersebut kita sudah dapat melakukan API testing.
 * describe() untuk mendeklarasikan secara umum setiap butir test case yang ada. 
 * Kita juga bisa menggunakan describe() di dalam describe() atau sering disebut nested describe. it() adalah butir test case.
 */

/**
 * Chai API
 * Assert, The assert style is very similar to node.js’ included assert module, with a bit of extra sugar. Of the three style options, assert is the only one that is not chainable. Check out the Style Guide for a comparison.
 * Expect, The BDD style is exposed through expect or should interfaces. In both scenarios, you chain together natural language assertions.
 * Should The should style allows for the same chainable assertions as the expect interface, however it extends each object with a should property to start your chain. This style has some issues when used with Internet Explorer, so be aware of browser compatibility.
 *
 * untuk selengkapnya [https://www.chaijs.com/guide/styles/]
 */

/**
 * Pengenalan singkat mengeni module yang akan dipkai untuk melakukan testing pada REST API aplikasi UNKLASS API
 * - Mocha
 * - Chai
 * - Chai-http
 *
 * - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.
 * - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
 * - Chai-http, adalah salah satu plugin pada Chai yang digunakan dalam melakukan HTTP response assertion.  
 */

/**
 * We will be using some functions of Mocha and Chai framework for performing this tests:
 * describe(): used to club multiple tests in one collection.
 * it(): a single test unit, mentioning how it should behave and a callback to execute the test body.
 * chai.request(): to make an HTTP Request to the REST API
 * done(): metioning the test was successful.
 * xx.should.xxx(): should is a great feature in chai library, helping us to assert the test condition. If the condition fails, the test fails. In simpler terms it’s sophisticated was to make test assertion
 * beforeEach is a block of code that is going to run before each the describe blocks on the same level. Why we did that? Well we are going to remove any mahasiswa from the database to start with an empty bookstore whenever a test is run.
 */

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Mahasiswa = require('../app/models/mahasiswa.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

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
				  	res.body.should.be.a('array'); // tipe data body yang seharusnya dikembalikan 
				  	res.body.length.should.be.eql(0); // jumlah data body yang seharusnya dikembalikan 

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
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('id');
				  	res.body.should.have.property('nama_lengkap');
				  	res.body.should.have.property('nim');
				  	res.body.should.have.property('semester');
				  	res.body.should.have.property('jenis_kelamin');
				  	res.body.should.have.property('status');
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
					  	res.body.should.be.a('object');
					  	res.body.should.have.property('id');
					  	res.body.should.have.property('nama_lengkap');
					  	res.body.should.have.property('nim');
					  	res.body.should.have.property('semester');
					  	res.body.should.have.property('jenis_kelamin');
					  	res.body.should.have.property('status');


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
					  	res.body.should.be.a('object');
					  	res.body.should.have.property('nama_lengkap');
					  	res.body.should.have.property('nim');
					  	res.body.semester.should.be.eql(3);
					  	res.body.should.have.property('jenis_kelamin');
					  	res.body.should.have.property('status');

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
				  	res.body.should.be.a('object');
				  	res.body.affectedRows.should.be.eql(1);

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
				  	res.body.should.be.a('object');
				  	res.body.insertId.should.be.eql(0);

				  	if(err) console.log('error testing: ', err);
				  	done(); 
			  	});
			});

		});		
	});

});


/**
 * Penutup
 * Kita bisa membuat banyak test case sebanyak yang kita perlukan, baik yang bersifat positif atau negatif, dan itu tanpa batasan. 
 * Melakukan API Testing memang terkadang membosankan namun ini mempunyai dampak pada kualitas sistem yang kita bangun.
 * Untuk penjelasan lebih lanjut tentang MochaJS bisa dirujuk ke situsnya langsung.
 */













