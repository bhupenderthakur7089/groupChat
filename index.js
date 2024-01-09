let msgSend = document.getElementById('msgSend');
msgSend.addEventListener('click', (e) => {
    let content = document.getElementById('msgContent').value;
    console.log('message is ', content);

    let message = {
        content
    }
    const token = localStorage.getItem('token');
    axios
        .post("http://localhost:3000/message", message, { headers: { "authorization": token } })
        .then((res) => {
            console.log('resposne object returned by backend is', res);
            if (res.data.success == true) {
                alert('message inserted successfully');
            } else {
                alert('error while inserting message');
            }
        }).catch((err) => {
            console.log(err);
        })
}) 