
function togglePassword() {
    const passField = document.getElementById('password');
    if (passField.type === 'password') {
        passField.type = 'text';
    } else {
        passField.type = 'password';
    }
}

document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
        // alert('Login Successful!');
        window.location.href = 'dashboard.html'; // You can change this page
         // ✅ Redirect to dashboard.html
         window.location.href = "dashboard.html";

    } else {
        alert('Invalid Credentials!');
    }
});