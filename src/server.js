import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'))

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`)

// app.listen(PORT, handleListen);

// for websocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

//listen connection
wss.on("connection", (socket) => {
    console.log("connected someone");
    socket.send('Hello, Sammie');

    socket.on("close", () => {
        console.log("Disconnected someone.")
    })

    socket.on("message", (msg) => {
        console.log(msg.toString())
    })

    setTimeout(() => {
        socket.send("send message after one second")
    }, 1000);
})

server.listen(PORT, handleListen);