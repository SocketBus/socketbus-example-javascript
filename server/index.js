const express = require('express');
const SocketBus = require('socketbus-node');

const config = { 
    app_id: 's-1-J2PCu8g8sAejZeXx',
    secret: 'cdKBpcruwYQ96kvIaYiorbTFxRDCbVfj',
    custom_encryption_key: 'My-test',
    custom_domain: 'http://localhost:3001'
}

const socketBus = new SocketBus(config);

const app = express();
const bodyParser = require('body-parser')
const port = 4000;
var path = require('path');

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});


app.post('/auth', (req, res) => {
    res.json(socketBus.auth(req.body.socket_id, req.body.channel_name, true))
});

app.post('/broadcast', (req, res) => {
    socketBus.broadcast(req.body.channel_name, 'message', {
        message: req.body.message,
        user: req.body.user
    }).then(response => {
        console.log(response, req.body);
        res.json({
            message: 'sent'
        });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})