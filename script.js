// 1. Fitur Lihat Password (Mata)
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Cek tipe input saat ini
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Ganti ikon mata (buka/tutup)
    this.classList.toggle('fa-eye-slash');
});

// 2. Logika Login ke Google Sheets
const loginForm = document.getElementById('loginForm');
const loader = document.getElementById('loader');

// --- GANTI URL INI DENGAN URL DEPLOYMENT APPS SCRIPT ANDA ---
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4adQgd8l5GQeBdPELxSfW5eT13_8rZZhK1jBD0RXmgJPPRTf7eoDXhjEfaGL_TOdIKA/exec'; 

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    loader.style.display = 'block'; // Tampilkan loading

    // Fetch ke Google Sheets
    fetch(`${SCRIPT_URL}?username=${user}&password=${pass}`)
    .then(response => response.json())
    .then(data => {
        loader.style.display = 'none';
        
        if (data.status === 'sukses') {
            alert('Selamat Datang, ' + data.nama);
            // Simpan sesi (opsional)
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('namaUser', data.nama);
            // Arahkan ke Dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Username atau Password salah!');
        }
    })
    .catch(error => {
        loader.style.display = 'none';
        console.error('Error:', error);
        alert('Terjadi kesalahan koneksi.');
    });
});