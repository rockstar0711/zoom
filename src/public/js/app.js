const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nicknameForm = document.querySelector('#nick');

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log("connected to server successfully.")
})

socket.addEventListener("message", (msg) => {
    console.log("server says like this: ", msg.data);
    const li = document.createElement("li");
    li.innerText = msg.data;
    messageList.append(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from server");
})

const makeNewMessage = (type, payload) => {
    let newMessage = {
        type: type,
        payload: payload
    }
    return JSON.stringify(newMessage);
}

function onSubmitMessage(event){
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeNewMessage("new_message", input.value));
    input.value = '';
}

function onSubmitNickName(event){
    event.preventDefault();
    const input = nicknameForm.querySelector('input');
    socket.send(makeNewMessage("nickname", input.value));
    input.value = '';
}

messageForm.addEventListener('submit', onSubmitMessage);

nicknameForm.addEventListener('submit', onSubmitNickName);