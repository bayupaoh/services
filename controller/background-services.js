var fb = require('firebase-admin');
var moment = require('moment-timezone');
var config = require('../config/firebase');

function calcTime() {

    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    var nd = new Date(utc + (3600000*7));

    // return time as a string
    return nd.toLocaleString();

}

// added grafik firebase automatic
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
		if(changedPost.idKandang !== 0){
				var kandang = 'kandang'+changedPost.idKandang;
				
        //if(!changedPost.a < 0 || !changedPost.b > 40 || !changedPost.c > 80 || !changedPost.d < 20 || !changedPost.d > 40){
          
      				var ref_grafik = db.ref().child('grafik/'+kandang+'/grid/'+changedPost.tanggal+'/'+snapshot.key);
      				var datas = {
      						amonia : parseFloat(changedPost.b),
      						berat : parseFloat(changedPost.a),
      						kelembapan : parseFloat(changedPost.c),
      						suhu : parseFloat(changedPost.d)
      				};
              ref_grafik.update(datas).then(function(update){
            		console.log('update kandang grafik '+snapshot.key+' '+kandang);
            	});
           
		}
  	//console.log("The updated kandang  key " + snapshot.key+' '+lantai);
	});


  //fan add automatic
  var ref_fan = db.ref().child('kandang').child('fan');
  ref_fan.on('child_changed',function(snapshot){
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
      ct : (changedPost.ct).toString(),
      st : (changedPost.st).toString(),
      tanggal :now,
  		waktu : jam
    };
    var update_ref = db.ref().child('kandangmirror/fan/'+snapshot.key);
    	update_ref.update(data).then(function(update){
    		console.log('update Fan '+snapshot.key);
    	});
    	//console.log("The updated sensor key : " + snapshot.key);
  });


//add to kandang mirror when new added on collection kandang 
  var ref3 = db.ref().child('kandang').child('g');
  ref3.on('child_added',function(snapshot){

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

//add to kandang mirror when any chnaged on collection kandang 
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