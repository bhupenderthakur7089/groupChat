let form = document.getElementById('signUp');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    uName = e.target.name.value;
    uEmail = e.target.email.value;
    uPassword = e.target.password.value;
    uMobile = e.target.mobile.value;
    let user = {
        uName,
        uEmail,
        uPassword,
        uMobile
    };
    console.log(user);
    
});