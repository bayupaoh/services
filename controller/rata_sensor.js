var nodemailer = require('nodemailer');
var fb = require('firebase-admin');

var config = require('../config/firebase');


var db = fb.database();

//to add feelslike on collection kandangmirror/feelslike
const ref_kandang = db.ref('/kandangmirror/s');
ref_kandang.on('child_changed', function(snapshot){
	childSnapshot = snapshot.val();


	console.log(snapshot.key);
	console.log('First '+childSnapshot.id_kandang);
	const ref_sensor = db.ref('/kandangmirror/s');
	ref_sensor.once('value', function(snapshot2){
		var suhu = 0;
		var kelembapan = 0;
		var count = 0;
		snapshot2.forEach((sensor)=>{
				var values = sensor.val();
				
				if((values.id_kandang === childSnapshot.id_kandang) && ((snapshot.key).substr(0,1) !== 'W') && (values.id_kandang !== 'undefined') && (values.tipe === 'si')){
					var check = checkIsValid(values.a, values.b);
					if(check === false){
						suhu = suhu + parseFloat(values.a);
						kelembapan = kelembapan + parseFloat(values.b);
						count++;
					}else{
						console.log("di bawah rata-rata gan");
					}
					
				}
		});
		if(((snapshot.key).substr(0,1) !== 'W') && (childSnapshot.id_kandang !== 'undefined') && (childSnapshot.id_kandang !== undefined) && (childSnapshot.tipe === 'si')){
			var rerataSuhu = suhu/count;
			var rerataLembab = kelembapan/count;

			
				var kandang = childSnapshot.id_kandang;
				var update_ref = db.ref().child('kandangmirror/rata_sensor/kandang'+kandang);
				var data = {
					a : rerataSuhu,
					b : rerataLembab
				};

				
			
		    	update_ref.update(data).then(function(update){
		    		console.log('update rata sensor '+snapshot.key+' with value a '+rerataSuhu);
		    	});
			
			
		}
	})
});

function checkIsValid(suhu, kelembapan){
	if((suhu < 10) || (suhu > 35) || (kelembapan < 20)){
		return true;
	}

	return false;
}