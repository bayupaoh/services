var nodemailer = require('nodemailer');
var fb = require('firebase-admin');
var async = require('async');
const CronJob = require('cron').CronJob;

var config = require('../config/firebase');


var db = fb.database();

//to add feelslike on collection kandangmirror/feelslike
const ref_kandang = db.ref('/kandangmirror/s');
ref_kandang.on('child_changed', function(snapshot){
	childSnapshot = snapshot.val();
	console.log('First '+childSnapshot.id_kandang);
	const ref_sensor = db.ref('/kandangmirror/s');
	ref_sensor.once('value', function(snapshot2){
		var suhu = 0;
		var kelembapan = 0;
		var count = 0;
		snapshot2.forEach((sensor)=>{
				var values = sensor.val();
				
				if((values.id_kandang === childSnapshot.id_kandang) && ((snapshot.key).substr(0,1) !== 'W')){
					suhu = suhu + parseFloat(values.a);
					kelembapan = kelembapan + parseFloat(values.b);
					count++;
					console.log(suhu+' jajaja');
				}
		});
		var rerataSuhu = suhu/count;
		var rerataLembab = kelembapan/count;
		var feelslikes = feels_Like(rerataLembab, rerataSuhu);
		console.log(feelslikes+' Kandang '+childSnapshot.id_kandang);

		var update_ref = db.ref().child('kandangmirror/feelslike');
		var data = 0;
		var kandang = childSnapshot.id_kandang;

		if(kandang === 1){
			data = {
				kandang1 : feelslikes
			}
		}else if(kandang === 2){
			data = {
				kandang2 : feelslikes
			}
		}else if(kandang === 3){
			data = {
				kandang3 : feelslikes
			}
		}else if(kandang === 4){
			data = {
				kandang4 : feelslikes
			}
		}else if(kandang === 5){
			data = {
				kandang5 : feelslikes
			}
		}else if(kandang === 6){
			data = {
				kandang6 : feelslikes
			}
		}
	
    	update_ref.update(data).then(function(update){
    		console.log('update feelslikes '+snapshot.key+' with value '+feelslikes);
    	});

	})
});




//function for calcultae feelslike
function feels_Like(rerataHumidity, rerataSuhu) {
      var feelsLike;

      if (rerataHumidity < 50) {
        if (rerataSuhu == 0) {
          feelsLike = 0;
        } else if (rerataSuhu <= 29.0) {
          feelsLike = 24;
        } else if (rerataSuhu <= 30.2) {
          feelsLike = 25;
        } else if (rerataSuhu <= 31.3) {
          feelsLike = 26;
        } else if (rerataSuhu <= 32.5) {
          feelsLike = 27;
        } else if (rerataSuhu <= 33.7) {
          feelsLike = 28;
        } else if (rerataSuhu > 33.7) {
          feelsLike = 30;
        }
      } else if (rerataHumidity < 60) {
        if (rerataSuhu == 0) {
          feelsLike = 0;
        } else if (rerataSuhu <= 26.8) {
          feelsLike = 24;
        } else if (rerataSuhu <= 27.8) {
          feelsLike = 25;
        } else if (rerataSuhu <= 28.6) {
          feelsLike = 26;
        } else if (rerataSuhu <= 29.9) {
          feelsLike = 27;
        } else if (rerataSuhu <= 31.2) {
          feelsLike = 28;
        } else if (rerataSuhu > 31.2) {
          feelsLike = 30;
        }
      } else if (rerataHumidity < 70) {
        if (rerataSuhu == 0) {
          feelsLike = 0;
        } else if (rerataSuhu <= 24.8) {
          feelsLike = 24;
        } else if (rerataSuhu <= 25.7) {
          feelsLike = 25;
        } else if (rerataSuhu <= 26.7) {
          feelsLike = 26;
        } else if (rerataSuhu <= 27.7) {
          feelsLike = 27;
        } else if (rerataSuhu <= 28.9) {
          feelsLike = 28;
        } else if (rerataSuhu > 28.9) {
          feelsLike = 30;
        }
      } else if (rerataHumidity < 80) {
        if (rerataSuhu == 0) {
          feelsLike = 0;
        } else if (rerataSuhu <= 23.0) {
          feelsLike = 24;
        } else if (rerataSuhu <= 24.0) {
          feelsLike = 25;
        } else if (rerataSuhu <= 25.0) {
          feelsLike = 26;
        } else if (rerataSuhu <= 26.0) {
          feelsLike = 27;
        } else if (rerataSuhu <= 27.3) {
          feelsLike = 28;
        } else if (rerataSuhu > 27.3) {
          feelsLike = 30;
        }
      } else if (rerataHumidity >= 80) {
        if (rerataSuhu == 0) {
          feelsLike = 0;
        } else if (rerataSuhu <= 22.0) {
          feelsLike = 24;
        } else if (rerataSuhu <= 23.0) {
          feelsLike = 25;
        } else if (rerataSuhu <= 23.0) {
          feelsLike = 26;
        } else if (rerataSuhu <= 24.0) {
          feelsLike = 27;
        } else if (rerataSuhu <= 26.0) {
          feelsLike = 28;
        } else if (rerataSuhu > 26.0) {
          feelsLike = 30;
        }
      }

      return feelsLike;
    }