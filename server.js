var express = require('express');
var app = express();
var fb = require('firebase-admin');
var config = require('./config/firebase');


fb.initializeApp(config.admin);
app.get('/',function(req,res){
    res.send('Ini halaman services firebase loh');

});
	var dates = new Date();
	var now = dates.getFullYear()+'-'+(dates.getMonth()+1)+'-'+dates.getDate();
	var jam = dates.getHours()+':'+dates.getMinutes();

	var db = fb.database();
	var ref = db.ref().child('kandang').child('g');
	ref.on("child_changed", function(snapshot) {
  	var changedPost = snapshot.val();
		var data = {
				tanggal : now,
				waktu : jam
		}
		var update_ref = db.ref().child('kandang/g/'+snapshot.key);
		update_ref.update(data).then(function(update){
			console.log('update column..');
		});

		if(changedPost.lantai != 0){
				var lantai = 'lantai1';
				if(changedPost.lantai == 2){
					lantai = 'lantai2';
				}
				var berat = changedPost.a;
				var ref_grafik = db.ref().child('percobaangrafik/'+lantai+'/grid/'+now);
				var datas = {
						amonia : changedPost.b,
						berat : changedPost.a,
						kelembapan : changedPost.c,
						suhu : changedPost.d
				};
				ref_grafik.push().set(datas);
		}
  	console.log("The updated post title is " + snapshot.key);
	});

app.listen(3000,function(){
    console.log('ahahah 3000')
});
