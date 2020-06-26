const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

//init nexmo
const nexmo = new Nexmo({
    apiKey:'a54e1db0',
    apiSecret: 'hEgMANuLMh4JLvpr'
}, {debug:true});

//Init app
const app = express();

//Template Engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//Public folder setuo
app.use(express.static(__dirname+ '/public'));

//Body parser middileware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Index route
app.get('/', (req, res)=> {
    res.render('index');
});

//Catch form submit
app.post('/', (req, res) => {
   // res.send(req.body);
    //console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        '917686962350', number , text , {type: 'unicode'},
        (err, responseData) => {
            if(err){
                console.log(err);
                
            }else{
                console.dir(responseData);
                
            }
        }
    );
});

//Define port
const port = 3000;
//Start Server
const server = app.listen(port, () => console.log(`Server started on port ${port}`)
) ;