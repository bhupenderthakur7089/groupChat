window.onload = (() => {
    axios
        .get('http://localhost:3000/data')
        .then((res) => {
            console.log('response is', res.data);
        })
})

let form = document.getElementById('signUp');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    uName = e.target.name.value;
    uEmail = e.target.email.value;
    uPassword = e.target.password.value;
    uMobile = (e.target.mobile.value) ;
    let user = {
        uName,
        uEmail,
        uPassword,
        uMobile
    };
    console.log(user);
    axios
        .post("http://localhost:3000/signUp", user)
        .then((res) => {
            console.log(res.data.userExists);
            if (res.data.userExists == true) {
                let div = document.getElementById('alert');
                let p = document.createElement('p');
                p.classList = 'bg-danger-subtle';
                p.innerHTML = 'User Already Exists with the Email ID';
                div.appendChild(p);
            } else {
                alert('User Registered Successfully...Proceed to login');
                window.location.href = './login.html';
            }
        });

});