const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/alert', function(req, res){
  console.log('aa', req.body);
  let time = new Date().getTime();
  data = {
    time: req.body.y,
    x: 123
  }
  console.log(data);
  io.emit('alert', data);
  res.send(req.body);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

setInterval(() => {
  io.emit('ping', { data: (new Date())/1});
}, 1000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
