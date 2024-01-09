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
});

function displayMessage(message) {
    let messages = document.querySelector('#messages');
    let list = document.createElement('li');
    list.name = message.id;
    list.classList = 'list-group-item';
    list.textContent = message.content;
    messages.appendChild(list);
}

window.onload = () => {
    const token = localStorage.getItem('token');
    axios
        .get("http://localhost:3000/message", { headers: { "authorization": token } })
        .then((res) => {
            console.log('messages are:', res.data);
            let items = document.querySelector('#messages');
            items.innerHTML = '';
            for (let i = 0; i < res.data.messages.length; i++) {
                displayMessage(res.data.messages[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}