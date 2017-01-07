var express = require('express');
var app = express();
var fb = require('firebase-admin');
var moment = require('moment-timezone');
var config = require('./config/firebase');


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


	var db = fb.database();
	var ref = db.ref().child('kandangmirror').child('g');
	ref.on("child_changed", function(snapshot) {

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
    var now = dates.getFullYear()+'-'+(bulan)+'-'+haris;
    var jam = dates.getHours()+':'+dates.getMinutes();

    var changedPost = snapshot.val();
		if(changedPost.lantai !== 0){
				var lantai = '';
				if(changedPost.lantai === 1){
					lantai = 'lantai1';
				}else if(changedPost.lantai === 2){
          lantai = 'lantai2'
        }
        //if(!changedPost.a < 0 || !changedPost.b > 40 || !changedPost.c > 80 || !changedPost.d < 20 || !changedPost.d > 40){
          if(lantai !== ''){
      				var ref_grafik = db.ref().child('percobaangrafik/'+lantai+'/grid/'+now+'/'+snapshot.key);
      				var datas = {
      						amonia : (changedPost.b).toString(),
      						berat : ((changedPost.a/2).toFixed(2)).toString(),
      						kelembapan : (changedPost.c).toString(),
      						suhu : (changedPost.d).toString()
      				};
              ref_grafik.update(datas).then(function(update){
            		console.log('update kandang percobaangrafik '+snapshot.key+' '+lantai);
            	});
           }else{
              console.log('lantai not found !');
           } 

            // var ref_rata = db.ref().child('percobaangrafik/'+lantai+'/grid/'+now);
            //
            // ref_rata.once("value")
            //   .then(function (snapshot) {
            //     var rata = 0;
            //     var sum = 0;
            //     var count = 0;
            //     snapshot.forEach(function (childSnapshot) {
            //       var berat = childSnapshot.val().berat;
            //       sum += berat;
            //       count ++;
            //     });
            //
            //     rata = (sum/count).toFixed(2);
            //     console.log('rata - rata tanggal '+now+' = '+rata);
            //     var ref_mortality = db.ref().child('percobaangrafik/'+lantai+'/feedandmortality/'+now);
            //     var rerata = {
            //       berat : rata
            //     }
            //     ref_mortality.update(rerata).then(function(update){
            //   		console.log('save to feedandmortality '+lantai);
            //   	});
            //   });

        //}
		}
  	//console.log("The updated kandang  key " + snapshot.key+' '+lantai);
	});

  var ref2 = db.ref().child('kandang').child('s');
  ref2.on('child_changed',function(snapshot){
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
    var now = dates.getFullYear()+'-'+(bulan)+'-'+haris;
    var hh = dates.getHours();
    var menit = dates.getMinutes();

    if(dates.getHours() < 10){
        hh = '0'+dates.getHours();
    }
    if(dates.getMinutes() < 10){
      menit = '0'+dates.getMinutes();
    }
    var jam = hh+':'+menit;

    var changedPost = snapshot.val();
    var data = {
      a : (changedPost.a).toString(),
      b : (changedPost.b).toString(),
      tanggal :now,
  		waktu : jam
    };
    var update_ref = db.ref().child('kandangmirror/s/'+snapshot.key);
    	update_ref.update(data).then(function(update){
    		console.log('update Sensor '+snapshot.key);
    	});
    	//console.log("The updated sensor key : " + snapshot.key);
  });

  var ref3 = db.ref().child('kandang').child('g');
  ref3.on('child_changed',function(snapshot){

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
    var now = dates.getFullYear()+'-'+(bulan)+'-'+haris;
    var hh = dates.getHours();
    var menit = dates.getMinutes();

    if(dates.getHours() < 10){
        hh = '0'+dates.getHours();
    }
    if(dates.getMinutes() < 10){
      menit = '0'+dates.getMinutes();
    }
    var jam = hh+':'+menit;
    var changedPost = snapshot.val();
    var data = {
      a : (changedPost.a).toString(),
      b : (changedPost.b).toString(),
      c : (changedPost.c).toString(),
      d : (changedPost.d).toString(),
      tanggal :now,
  		waktu : jam
    };
    var update_ref = db.ref().child('kandangmirror/g/'+snapshot.key);
      update_ref.update(data).then(function(update){
        console.log('update mirror kandang..'+ snapshot.key);
      });
      //console.log("The updated kandang key :  " );
  });

//sensor v2 guys
var ref9 = db.ref().child('kandang').child('sv2');
ref9.on('child_changed',function(snapshot){
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
  var now = dates.getFullYear()+'-'+(bulan)+'-'+haris;
  var hh = dates.getHours();
  var menit = dates.getMinutes();

  if(dates.getHours() < 10){
      hh = '0'+dates.getHours();
  }
  if(dates.getMinutes() < 10){
    menit = '0'+dates.getMinutes();
  }
  var jam = hh+':'+menit;

  var changedPost = snapshot.val();
  var keys = snapshot.key;
  if(keys.substr(0,1) !== 'W'){
      var data = {
        a : (changedPost.t).toString(),
        b : (changedPost.h).toString(),
        tanggal :now,
        waktu : jam
      };
  }else{
    var data = {
      a : (changedPost.s).toString(),
      b : (changedPost.f).toString(),
      tanggal :now,
      waktu : jam
    };
  }
  var update_ref = db.ref().child('kandangmirror/s/'+snapshot.key);
    update_ref.update(data).then(function(update){
      console.log('update Sensor '+snapshot.key);
    });
    //console.log("The updated sensor key : " + snapshot.key);
});


var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('listening on '+port);
});
