const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/alert', function(req, res){
  console.log('body:', req.body);
  let time = new Date().getTime();
  data = {
    victim_coordinates: { latitude: 43.6458709, longitude: -79.3898179 },
    aed_coordinates: { latitude: 43.6461039, longitude: -79.3886814 },
    responder_coordinates: { latitude: 43.6456224, longitude: -79.390698 },
    from_total: {
      "distance": 872,
      "duration": 633
    },
    from_victim: {
      "distance": 76,
      "duration": 57
    }
  }
  console.log('sending data: ', data);
  io.emit('alert', data);
  res.send(req.body);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

setInterval(() => {
  io.emit('ping', { data: (new Date())});
}, 1000);

http.listen(8080, function(){
  console.log('listening on *:8080');
});
