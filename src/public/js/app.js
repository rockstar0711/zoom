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

setTimeout(() => {
    socket.send("Hello. server, This is Browser")
}, 3000);