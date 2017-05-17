var express = require('express');
var app = express();
var fb = require('firebase-admin');
var moment = require('moment-timezone');
var config = require('./config/firebase');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
fb.initializeApp(config.admin);

	// var format = 'YYYY-MM-DD HH:mm:ss ZZ';

function calcTime() {

    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    var nd = new Date(utc + (3600000*7));

    // return time as a string
    return nd.toLocaleString();

}
//   console.log(indonesia);
//   // var indonesia = calcTime('indonesia', '+7');

require('./controller/background-services');  
require('./controller/rata_sensor');
require('./controller/feelslike');
app.use(require('./controller/email-services'));
  app.get('/',function(req,res){
    var indonesia = calcTime();
    var dates = new Date(indonesia);
    var bulan = dates.getMonth()+1;
    var haris = dates.getDate();
    if(bulan < 10){
      bulan = '0'+bulan;
    }
    if(haris < 10){
      haris = '0'+haris;
    }
    var now = dates.getFullYear()+'-'+bulan+'-'+haris;
    var jam = dates.getHours()+':'+dates.getMinutes();
      res.send('Cimerang , '+now+' '+jam);

  });
 

//require('./controller/background-services');	


var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('listening on '+port);
});
