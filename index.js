let createGroupBtn = document.getElementById('createGroupBtn');
createGroupBtn.addEventListener('click', (e) => {
    let createGroupDiv = document.getElementById('createGroupDiv');

    let groupField = document.createElement('input');
    groupField.type = 'text';
    groupField.name = 'groupName';

    let groupLabel = document.createElement('label');
    groupLabel.innerHTML = 'Enter Group Name';
    groupLabel.for = 'groupName';

    let submitBtn = document.createElement('anchor');
    submitBtn.classList='btn btn-outline-primary mt-1';
    submitBtn.innerHTML = 'Submit';
    submitBtn.addEventListener('click', (e) => {
        let groupName = {
            name: e.target.parentNode.children[1].value
        };
        const token = localStorage.getItem('token');
        console.log(token);
        axios
            .post("http://localhost:3000/createGroup", groupName, { headers: { "authorization": token } })
            .then((res) => {
                if (res.data.success == true) {
                    createGroupDiv.innerHTML = '';
                    let gName = groupName.name;
                    let groupList = document.getElementById('groupList');

                    let newGroupList = document.createElement('li');
                    newGroupList.classList = 'nav-item';

                    let newGroupBtn = document.createElement('anchor');
                    newGroupBtn.innerHTML = `${gName}`;
                    newGroupBtn.classList = 'nav-link active';

                    newGroupList.appendChild(newGroupBtn);
                    groupList.appendChild(newGroupList);
                    console.log('Group Created successfully');

                } else {
                    alert('error while inserting message');
                }
            }).catch((err) => {
                console.log(err);
            })
    });

    createGroupDiv.innerHTML = '';
    createGroupDiv.appendChild(groupLabel);
    createGroupDiv.appendChild(groupField);
    createGroupDiv.appendChild(submitBtn);
})


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
                console.log('message inserted successfully');
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

addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    let msgString = localStorage.getItem('messages');
    let localMsgs = JSON.parse(msgString);
    console.log('localMsgs are', localMsgs);
    if (localMsgs == null) {
        let lastMsgId = undefined;
        axios
            .get(`http://localhost:3000/getMessages/${lastMsgId}`, { headers: { "authorization": token } })
            .then((res) => {
                let newMsgs = res.data.messages;
                console.log('new msgs are', newMsgs);
                if (newMsgs.length > 10) {
                    newMsgs = newMsgs.slice(-10);
                    console.log('Intially no Msgs in localStorage: the latest 10 msgs after shortening are', newMsgs);
                    localStorage.setItem('messages', JSON.stringify(newMsgs));
                } else {
                    console.log('Intially no Msgs in localStorage: the latest 10 msgs without shortening are', newMsgs);
                    localStorage.setItem('messages', JSON.stringify(newMsgs));
                }
                for (let i = 0; i < newMsgs.length; i++) {
                    displayMessage(newMsgs[i]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        let lastElementIndex = localMsgs.length - 1;
        let lastMsgId = localMsgs[lastElementIndex].id;
        console.log(lastMsgId);
        axios
            .get(`http://localhost:3000/getMessages/${lastMsgId}`, { headers: { "authorization": token } })
            .then((res) => {
                if (res.data.messages == '') {
                    console.log('new messages are empty');
                    for (let i = 0; i < localMsgs.length; i++) {
                        displayMessage(localMsgs[i]);
                    }
                } else {
                    let newMsgs = res.data.messages
                    console.log('new messages after the lastMsg id in local storage is:', newMsgs);
                    for (let i = 0; i < newMsgs.length; i++) {
                        localMsgs.push(newMsgs[i]);
                    }

                    if (localMsgs.length > 10) {
                        localMsgs = localMsgs.slice(-10);
                        console.log('Msgs after the lastMsg Id in LS: the latest 10 msgs after shortening are', localMsgs);
                        localStorage.setItem('messages', JSON.stringify(localMsgs));
                    } else {
                        console.log('Msgs after the lastMsg Id in LS: the latest 10 msgs without shortening are', localMsgs);
                        localStorage.setItem('messages', JSON.stringify(localMsgs));
                    }

                    for (let i = 0; i < localMsgs.length; i++) {
                        displayMessage(localMsgs[i]);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
});


// setInterval(() => {
//     const token = localStorage.getItem('token');
//     let msgString = localStorage.getItem('messages');
//     let localMsgs = JSON.parse(msgString);
//     let lastMsgId = localMsgs[lastElementIndex].id;
//     let lastElementIndex = localMsgs.length - 1;

//     axios
//         .get(`http://localhost:3000/getMessages/${lastMsgId}`, { headers: { "authorization": token } })
//         .then((res) => {
//             let newMsgs = res.data.messages;
//             if (newMsgs.length > 10) {
//                 newMsgs = newMsgs.slice(-10);
//                 console.log('Intially no Msgs in localStorage: the latest 10 msgs after shortening are', newMsgs);
//                 localStorage.setItem('messages', JSON.stringify(newMsgs));
//             } else {
//                 console.log('Intially no Msgs in localStorage: the latest 10 msgs without shortening are', newMsgs);
//                 localStorage.setItem('messages', JSON.stringify(newMsgs));
//             }
//             for (let i = 0; i < newMsgs.length; i++) {
//                 displayMessage(newMsgs[i]);
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }, 500);