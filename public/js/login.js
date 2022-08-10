const userLogin = async (event) => {
    event.preventDefault();
    console.log('in user login')
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        console.log('in the if block');
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(
                {
                    user_name: username,
                    password: password
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log('past fetch request code block');

        if (response.ok) {
            // go to their profile
            console.log('response ok')
            document.location.replace('/user');
        } else {
            alert(response.statusText);
        }
    }
};

const userSignup = async (event) => {
    event.preventDefault();

    console.log('in user signup');
    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstName && lastName && email && username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(
                {
                    first_name: firstName,
                    last_name: lastName,
                    user_name: username,
                    email: email,
                    password: password
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            // go to their profile
            document.location.replace('/user');
            console.log('response ok');
        } else {
            alert(response.statusText);
        }
    }
};

const loginButton = document.querySelector('#login-button').addEventListener('click', userLogin);
const signUpButton = document.querySelector('#signup-button').addEventListener('click', userSignup);