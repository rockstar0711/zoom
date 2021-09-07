const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log("connected to server successfully.")
})

socket.addEventListener("message", (msg) => {
    console.log("server says like this: ", msg.data);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from server");
})

function onSubmitMessage(event){
    event.preventDefault();
    const input = messageForm.querySelector('input');
    console.log(input.value);
    socket.send(input.value);
    input.value = '';
}

messageForm.addEventListener('submit', onSubmitMessage)