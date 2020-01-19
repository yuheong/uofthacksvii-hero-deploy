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
    aed_coordinates: { latitude: 43.6487485, longitude: -79.3932369 },
    responder_coordinates: { latitude: 43.6489928, longitude: -79.3947052 },
    from_total: {
      distance: { text: "0.7 km", value: 739 },
      duration: { text: "10 mins", value: 585 }
    },
    from_victim: {
      distance: { text: "0.7 km", value: 739 },
      duration: { text: "10 mins", value: 585 }
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
