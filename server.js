var express = require('express');
var app = express();
var fb = require('firebase-admin');
var moment = require('moment-timezone');
var config = require('./config/firebase');


fb.initializeApp(config.admin);
app.get('/',function(req,res){
    res.send('Ini halaman services firebase loh');

});
	// var format = 'YYYY-MM-DD HH:mm:ss ZZ';

	var dates = new Date();
	var now = dates.getFullYear()+'-'+(dates.getMonth()+1)+'-'+dates.getDate();
	var jam = dates.getHours()+':'+dates.getMinutes();
	var db = fb.database();
	var ref = db.ref().child('kandang').child('g');
	ref.on("child_changed", function(snapshot) {
  	var changedPost = snapshot.val();
		// var data = {
		// 		tanggal :now,
		// 		waktu : jam
		// }
		// var update_ref = db.ref().child('kandang/g/'+snapshot.key);
		// update_ref.update(data).then(function(update){
		// 	console.log('update column..');
		// });

		if(changedPost.lantai != 0){
				var lantai = 'lantai1';
				if(changedPost.lantai == 2){
					lantai = 'lantai2';
				}
				var berat = changedPost.a;
				var ref_grafik = db.ref().child('percobaangrafik/'+lantai+'/grid/'+now);
				var datas = {
						amonia : parseFloat(changedPost.b),
						berat : parseFloat(changedPost.a),
						kelembapan : parseFloat(changedPost.c),
						suhu : parseFloat(changedPost.d)
				};
				ref_grafik.push().set(datas);
		}
  	console.log("The updated kandang  key " + snapshot.key);
	});

  var ref2 = db.ref().child('kandang').child('s');
  ref2.on('child_changed',function(snapshot){
    var changedPost = snapshot.val();
    var data = {
      a : changedPost.a,
      b : changedPost.b
    };
    var update_ref = db.ref().child('kandangmirror/s/'+snapshot.key);
    	update_ref.update(data).then(function(update){
    		console.log('update Sensor..');
    	});
    	console.log("The updated sensor key : " + snapshot.key);
  });

  var ref3 = db.ref().child('kandang').child('g');
  ref3.on('child_changed',function(snapshot){
    var changedPost = snapshot.val();
    var data = {
      a : changedPost.a,
      b : changedPost.b,
      c : changedPost.c,
      d : changedPost.d,
      tanggal :now,
  		waktu : jam
    };
    var update_ref = db.ref().child('kandangmirror/g/'+snapshot.key);
      update_ref.update(data).then(function(update){
        console.log('update mirror kandang..');
      });
      console.log("The updated kandang key :  " + snapshot.key);
  });

var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('listening on '+port);
});
