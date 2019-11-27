const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const MONGO_URL = "mongodb://localhost:27017"
const Nexmo = require('nexmo')
const Socketio=require('socket.io')
var nodemailer = require('nodemailer');
var port = process.env.PORT || 4800;


app.use(express.urlencoded({
    extended: true
}))

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

// nodemailer has been used for sending mails

var transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
auth: {
    user: 'myentrymanager@gmail.com',
    pass: 'lovetocode'
},
secureConnection: false,
tls: {
    rejectUnauthorized: false
}
});


//nexmo was used for sending sms but required a paid version

/*const nexmo = new Nexmo({
    apiKey :  'ffadc6cb',
    apiSecret : 'mOlf1eVMN62nBHIR'
},{debug : true});
*/

let taskdb
let hostcol
let checkintab
let checkouttab

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) throw err;

  taskdb = client.db("taskdb")
  checkintab = taskdb.collection("checkintab")
})
    
app.post("/host", (req, res) => {
    
    var name = req.body.name; 
    var email =req.body.email; 
    var phone =req.body.phone;
    
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    localStorage.setItem('phone', phone)

    return res.redirect('/choice'); 
})

app.post("/mycheckin", (req, res) => {
    var name = req.body.name; 
    var email =req.body.email; 
    var phone =req.body.phone;
    var d = Date(Date.now());

    var data = { 
        "name": name, 
        "email":email,  
        "phone":phone,
        "date":d ,
        "host": localStorage.getItem('name'),
        "hostemail" : localStorage.getItem('email'),
        "hostphone" : localStorage.getItem('phone')
    } 

    checkintab.findOne({'email' :req.body.email }, function(err, result) {
        if (err) throw err;
        if(result)
        {
            res.send('Visitor has already checked in!');
        }
        else
        {
            checkintab.insertOne(data, (err, results) => {
                if(err) throw err
                console.log(results)
            })

            //code for sending mail
            var mailOptions = {
                from: 'myentrymanager@gmail.com',
                to: localStorage.getItem('email'),
                subject: 'visitors checkin details',
                html: '<ul><li> Name :'+name + ' </li><li>Email: '+email +'</li><li>Phone :' + phone +'</li><li>Check-in :' + d +'</li><li>Host :' + localStorage.getItem('name') +'</li></ul>'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log('Error--> ' + error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
            return res.redirect('/choice'); 

            //code for sending sms 

            /*const from = 'Nexmo';
            const to = localStorage.getItem('phone');
            const text = 'visitor name ';
            nexmo.message.sendSms(from, to, text,{type: 'unicode'},
            (err,res) => {
                if(err)
                {
                    console.log(err);
                }
                else{
                    console.dir(res);
                }
            }
            );*/ 
        }
    });    
})

app.post("/mycheckout", (req, res) => {
    var email =req.body.email; 
    var address =req.body.address;
    var dout = Date(Date.now());

    checkintab.findOne({'email' :req.body.email }, function(err, result) {
        if (err) throw err;
        if(result)
        {
            var mailOptions = {
                from: 'vistorsentrymanager@gmail.com',
                to: email,
                subject: 'visitors checkout details',
                html: '<ul><li> Name :'+result.name + ' </li><li>Email: '+result.email +'</li><li>phone: ' + result.phone +'</li><li>Checkin: ' + result.date +'</li><li>Checkout: ' + dout +'</li><li>host: ' + result.host +'</li><li>address: ' + address +'</li></ul>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log('Error--- ' + error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              checkintab.deleteOne({'email' :req.body.email })
              return res.redirect('/choice'); 
        }
        else
        {
            res.send('No visitor with this email-id has visited. Please check your Email-id again !');
        }
    });
    
})


app.get("/choice", (req, res) => {

    name=localStorage.getItem('name')
    mail=localStorage.getItem('email')
    phone=localStorage.getItem('phone')
    res.sendFile(__dirname + '/choice.html')
})

app.get("/checkin", (req, res) => {
    res.sendFile(__dirname + '/checkin.html')
})

app.get("/checkout", (req, res) => {
    res.sendFile(__dirname + '/checkout.html')
})

app.get("/", (req, res) => {
    if(localStorage.getItem('name'))
    {
        return res.redirect('/choice'); 
    }
    res.sendFile(__dirname + '/index.html')
})

app.get("/changehost", (req, res) => {

    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
    
    res.sendFile(__dirname + '/index.html')
})

app.use(express.json())

app.listen(port, () => {
    console.log("server running")
}) 

