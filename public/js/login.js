const userLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(
                { username, password }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const userSignup = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstName && lastName && email && username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify(
                { firstName, lastName, email, username, password }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const loginDiv = document.querySelector('.login-div').addEventListener('submit', userLogin);

const signUpDiv = document.querySelector('.signup-div').addEventListener('submit', userSignup);