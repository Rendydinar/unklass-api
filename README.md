# UNKLASS API


## Mulai
**1. Clone repo ini** 
  ```sh 
    $ git clone https://github.com/Rendydinar/unklass-api/
  ```
**2. Install & Setup** 
  </br>
  *setting database mysql sesuai pentunjuk yang tersedia*
  ```sh
    $ cd unklass-api/
    $ npm install
  ```
**3. Jalankan Aplikasi**
  ```sh
    $ npm start or 
    $ npm test 
  ```
### Tampilkan Semua Mahasiswa
----
  Return json data semua mahasiswa.
* **URL:**
  /mahasiswa
* **Method:**
  `GET`
*  **URL Params:**
   None
* **Data Params**
  None
* **Success Response:**
  * **Code:** 200 
    **Content:** `{ status: true, data}`
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ status: false, error }`
* **contoh syntaks:**
  ```javascript
    $.ajax({
      url: "/mahasiswa/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
**Tampilkan 1 Mahasiswa**
----
  Return json data 1 mahasiswa.
* **URL:**
  /mahasiswa/:nim
* **Method:**
  `GET`
*  **URL Params:**
   **Required:**
   `nim=[integer]`
* **Data Params**
  None
* **Success Response:**
  * **Code:** 200 
    **Content:** `{ status: true, data}`
* **Error Response:**
  * **Code:** 404 NOT FOUND 
  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ status: false, error }`
* **contoh syntaks:**
  ```javascript
    $.ajax({
      url: "/mahasiswa/2119070",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });    
### Menambahkan 1 Mahasiswa
----
  Return json data 1 mahasiswa yang baru ditambahkan.
* **URL:**
  /mahasiswa
* **Method:**
  `POST`
*  **URL Params:**
   None
* **Data Params**
  **Required:**
  ```javascript
    {
      nama_lengkap: 'Rinto Tanggu Djama',
      nim: '2119030',
      semester: 2,
      jenis_kelamin: 'L',
      status: true
    }
* **Success Response:**
  * **Code:** 200 
    **Content:** `{ status: true, data}`
* **Error Response:**
  * **Code:** 400 BAD REQUEST 
  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ status: false, error }`
* **contoh syntaks:**
  ```javascript
    $.ajax({
      url: "/mahasiswa",
      dataType: "json",
      type : "POST",
      data: {
        nama_lengkap: 'Rinto Tanggu Djama',
        nim: '2119030',
        semester: 2,
        jenis_kelamin: 'L',
        status: true
      },
      success : function(r) {
        console.log(r);
      }
    });        
### Mengubah 1 Mahasiswa
----
  Return json data 1 mahasiswa yang baru diubah.
* **URL:**
  /mahasiswa/:nim
* **Method:**
  `PUT`
*  **URL Params:**
   **Required:**
   `nim=[integer]`
* **Data Params**
  **Required:**
  ```javascript
    {
      nama_lengkap: 'Rinto Tanggu Djama',
      nim: '2119030',
      semester: 2,
      jenis_kelamin: 'L',
      status: true
    }
* **Success Response:**
  * **Code:** 200 
    **Content:** `{ status: true, data}`
* **Error Response:**
  * **Code:** 400 BAD REQUEST 
  * **Code:** 404 NOT FOUND 
  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ status: false, error }`
* **contoh syntaks:**
  ```javascript
    $.ajax({
      url: "/mahasiswa/:nim",
      dataType: "json",
      type : "PUT",
      data: {
        nama_lengkap: 'Rinto Tanggu Djama',
        nim: '2119030',
        semester: 2,
        jenis_kelamin: 'L',
        status: true
      },
      success : function(r) {
        console.log(r);
      }
    });            
### Hapus 1 Mahasiswa
----
  Return json data.
* **URL:**
  /mahasiswa/:nim
* **Method:**
  `DELETE`
*  **URL Params:**
   **Required:**
   `nim=[integer]`
* **Data Params**
  None
* **Success Response:**
  * **Code:** 200 
    **Content:** `{ status: true, data}`
* **Error Response:**
  * **Code:** 404 NOT FOUND 
  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ status: false, error }`
* **contoh syntaks:**
  ```javascript
    $.ajax({
      url: "/mahasiswa/:nim",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
### Hapus Semua Mahasiswa
----
  Return json data.
* **URL:**
  /mahasiswa
* **Method:**
  `DELETE`
*  **URL Params:**
   None
* **Data Params**
  None
* **Success Response:**
  * **Code:** 200 
    **Content:** `{ status: true, data}`
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ status: false, error }`
* **contoh syntaks:**
  ```javascript
    $.ajax({
      url: "/mahasiswa",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });    
