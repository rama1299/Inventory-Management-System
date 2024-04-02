# Aplikasi Inventory Management System | Express Node.js TypeScript

Repositori ini berisi aplikasi Express Node.js yang dibangun dengan TypeScript. Ini menyediakan API RESTful dengan fitur otentikasi dan otorisasi.

## Instalasi

1. Pastikan Anda memiliki Node.js terpasang di sistem Anda. Jika belum, Anda dapat mengunduhnya dari [situs web Node.js](https://nodejs.org/).

2. Clone repositori ini ke mesin lokal Anda:

    ```
    git clone https://github.com/rama1299/Inventory-Management-System.git
    ```

3. Buka direktori proyek:

    ```
    cd Inventory-Management-System
    ```

4. Instal semua dependensi dengan menjalankan perintah:

    ```
    npm install
    ```
5. Sesuaikan .env dengan contoh di .envexample:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=blablabla
    DB_NAME=knitto-inventory
    PORT=3000
    ```

## Penyiapan Database

1. Pastikan Anda memiliki file cadangan database yang telah anda cloning dari repositori, dengan nama file "knitto-inventory-backup.sql".

2. Impor database ke sistem database Anda. Misalnya, jika menggunakan MySQL, Anda dapat menggunakan perintah berikut:

    ```
    mysql -u username -p database_name < knitto-inventory-backup.sql
    ```

## Menjalankan Aplikasi

1. Setelah instalasi selesai, jalankan aplikasi dengan perintah:

    ```
    npm run build
    npm run start
    ```

2. Aplikasi akan berjalan di port yang telah di atur di .env.

## Dokumentasi API

### Endpoints
- **POST /api/register**
    - Deskripsi: Endpoint untuk registrasi pengguna.
    - Input: 
        - Body:
            - username: String
            - email: String
            - password: String
            - role: String <'admin' / 'staff'>
    - Output:
        - Informasi register berhasil.

- **POST /api/login**
    - Deskripsi: Endpoint untuk otentikasi pengguna.
    - Input: 
        - Body:
            - email: String
            - password: String
    - Output:
        - Token JWT

- **GET /api/product**
    - Deskripsi: Dapatkan daftar produk.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>

- **GET /api/product/:id**
    - Deskripsi: Dapatkan informasi produk berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>

- **POST /api/product**
    - Deskripsi: Buat produk baru.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
        - Body:
            - name: String
            - description: String
            - price: String
            - stock_quantity: Number
    - Output:
        - Data json produk baru.
    
    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **PUT /api/product/:id**
    - Deskripsi: Perbarui informasi produk berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
        - Body:
            - name: String
            - description: String
            - price: String
            - stock_quantity: Number
    - Output:
        - Data json produk perbarui.

    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **PUT /api/product/:id/image**
    - Deskripsi: Perbarui informasi gambar produk berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
        - Body:
            - image: File
    - Output:
        - Informasi upload image berhasil.

    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **DELETE /api/product/:id**
    - Deskripsi: Hapus produk berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
    - Output:
        - Informasi produk di hapus berhasil.
        
    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **GET /api/transaction**
    - Deskripsi: Dapatkan daftar transaksi.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>

- **GET /api/transaction/:id**
    - Deskripsi: Dapatkan informasi transaksi berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>

- **POST /api/transaction**
    - Deskripsi: Buat transaksi baru.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
        - Body:
            - customer_id: Number
            - product_id: Number
            - price_unit: Number
            - quantity: Number
            - total_price: Number

    - Output:
        - Informasi transaksi baru berhasil.
    
    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **PUT /api/transaction/:id**
    - Deskripsi: Perbarui informasi transaksi berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
        - Body:
            - customer_id: Number
    - Output:
        - Informasi transaksi perbarui berhasil.

    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **DELETE /api/transaction/:id**
    - Deskripsi: Hapus transaksi berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
    - Output:
        - Informasi transaksi di hapus berhasil.
        
    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.
    
- **GET /api/transaction-detail**
    - Deskripsi: Dapatkan daftar detail transaksi.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>

- **GET /api/transaction-detail/:id**
    - Deskripsi: Dapatkan informasi detail transaksi berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>

- **PUT /api/transaction-detail/:id**
    - Deskripsi: Perbarui informasi detail transaksi berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
        - Body:
            - name: String
            - description: String
            - price: String
            - stock_quantity: Number
    - Output:
        - Data json detail transaksi perbarui.

    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

- **DELETE /api/transaction-detail/:id**
    - Deskripsi: Hapus detail transaksi berdasarkan ID.
    - Input:
        - Headers:
            - Authorization: Bearer <Token JWT>
    - Output:
        - Informasi detail transaksi di hapus berhasil.
        
    **Authorization**: Endpoint ini membutuhkan token JWT dengan peran sebagai admin untuk mengaksesnya.

### Otentikasi dan Otorisasi

- Untuk mengakses endpoint yang memerlukan otentikasi, setiap permintaan harus menyertakan token JWT di header Authorization. Misalnya:

    ```http
    GET /api/product HTTP/1.1
    Host: localhost:3000
    Authorization: Bearer <Token JWT>
    ```

- Hanya pengguna dengan token yang valid yang dapat mengakses endpoint yang memerlukan otentikasi.

- Endpoint POST, PUT, DELETE memerlukan token dengan peran admin. Dan endpoint GET dapat di akses dengan peran admin atau staff.
