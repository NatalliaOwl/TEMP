// redirect to home page if user logged in
window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');

// select inputs
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const phoneNumber = document.querySelector('#phone-number') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notification') || null;

submitBtn.addEventListener('click', () => {
    if (name != null) {     // sign up page
        if(name.value.length < 3) {
            showAlert('Name must be at least 3 letters long.');
        } else if (!email.value.length) {
            showAlert('Please enter email address.');
        } else if (password.value.length < 8) {
            showAlert('Password must be at least 8 symbols long.')
        } else if (!phoneNumber.value.length) {
            showAlert('Please enter phone number.');
        } else if (!Number(phoneNumber.value) || phoneNumber.value.length < 10) {
            showAlert('Invalid phone number.');
        } else if (!tac.checked) {
            showAlert('Please agree to the terms and conditions.');
        } else {
            //     submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                phoneNumber: phoneNumber.value,
                tac: tac.checked,
                notification: notification.checked,
                seller: false
            })
        }
    } else {
        // login page
        if (!email.value.length || !password.value.length) {
            showAlert('Please fill out all fields.')
        } else {
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
});
