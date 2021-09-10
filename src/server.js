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

//connection DB
const sockets = [];

//listen connection
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket.on("close", () => {
        console.log("Disconnected someone.")
    })

    socket.on("message", (msg) => {
        console.log(JSON.parse(msg))
        // sockets.forEach(aSocket => aSocket.send(msg.toString()))
    })
})

server.listen(PORT, handleListen);