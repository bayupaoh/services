var express = require('express');
var app = express.Router();
var EmailTemplates = require('swig-email-templates');
var nodemailer = require('nodemailer');
var fb = require('firebase-admin');
var async = require('async');
const CronJob = require('cron').CronJob;

var moment = require('moment-timezone');
var config = require('../config/firebase');

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'farmcimerang@gmail.com',
    pass: 'UNIKOM120'
  }
});

var db = fb.database();
// var checkFeels = db.ref('kandangmirror/feelslike');

//         checkFeels.once('value',function ref(kampret){
//            console.log(kampret.val().kandang1);
//         });
// //cron job every 30 minutes
var cronMail = new CronJob({
    cronTime: '0 */30 * * * *',
     onTick() {
        console.log('--------mulai cron perhitungan---------');
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

        console.log('Cron on gan at '+jam);
        var templates = new EmailTemplates({root: './views'});
        var checkSuhu = db.ref('kandangmirror/rata_sensor');

        checkSuhu.once('value',function ref(kampret){
            var error = 0;
            var sukses = 0;
            kampret.forEach((snapshot) => {
                const check = snapshot.val();
                var umur = check.hari;
                var a = parseFloat(check.a);
                var b = parseFloat(check.b);
                var unnormal = checkNormalize(a, b, umur);
                console.log('kandang '+check.id_kandang+' suhu '+a+' kelembapan '+b+' umur '+umur+' status '+unnormal);
                if(unnormal === 0){
                    error++;
                }else{
                    sukses++;
                } 
            }); 
            if(error > 0){
                  async.parallel({
                                kandang1 : function (callback){
                                        async.parallel({
                                            feelslike : function(callback){
                                                var checkFeels = db.ref('kandangmirror/feelslike');

                                                checkFeels.once('value',function ref(kampret){
                                                   callback(null, kampret.val().kandang1);
                                                });

                                            },
                                            suhu : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var suhu = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 1){
                                                              suhu = suhu + parseFloat(snap.val().a);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = (suhu/count);
                                                       callback(null, rata.toFixed(2));
                                                  });
                                                 
                                            },
                                            kelembapan : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var lembab = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 1){
                                                              lembab = lembab + parseFloat(snap.val().b);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = lembab/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kecepatan : function(callback){
                                                var angin = db.ref('kandangmirror/s/W1');

                                                angin.once('value',function ref(kampret){
                                                   callback(null, kampret.val().a);
                                                });
                                            },
                                            umur : function(callback){
                                                var umur = db.ref('grafik/kandang1/perhitungan');
                                                umur.once('value', function ref(snapshot){
                                                    const umur = snapshot.val().hari;

                                                    callback(null, umur);
                                                });
                                            }
                                        },function(err,results){
                                            callback(null, results);
                                        });
                                },
                                 kandang2 : function (callback){
                                        async.parallel({
                                            feelslike : function(callback){
                                                var checkFeels = db.ref('kandangmirror/feelslike');

                                                checkFeels.once('value',function ref(kampret){
                                                   callback(null, kampret.val().kandang2);
                                                });

                                            },
                                            suhu : function(callback){
                                                 const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var suhu = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 2){
                                                              suhu = suhu + parseFloat(snap.val().a);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = suhu/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kelembapan : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var lembab = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 2){
                                                              lembab = lembab + parseFloat(snap.val().b);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = lembab/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kecepatan : function(callback){
                                                var angin = db.ref('kandangmirror/s/W2');

                                                angin.once('value',function ref(kampret){
                                                   callback(null, kampret.val().a);
                                                });
                                            },
                                            umur : function(callback){
                                                var umur = db.ref('grafik/kandang2/perhitungan');
                                                umur.once('value', function ref(snapshot){
                                                    const umur = snapshot.val().hari;

                                                    callback(null, umur);
                                                });
                                            }
                                        },function(err,results){
                                            callback(null, results);
                                        });
                                },
                                kandang3 : function (callback){
                                        async.parallel({
                                            feelslike : function(callback){
                                                var checkFeels = db.ref('kandangmirror/feelslike');

                                                checkFeels.once('value',function ref(kampret){
                                                   callback(null, kampret.val().kandang3);
                                                });

                                            },
                                            suhu : function(callback){
                                                 const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var suhu = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 3){
                                                              suhu = suhu + parseFloat(snap.val().a);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = suhu/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kelembapan : function(callback){
                                                 const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var lembab = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 3){
                                                              lembab = lembab + parseFloat(snap.val().b);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = lembab/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kecepatan : function(callback){
                                                var angin = db.ref('kandangmirror/s/W3');

                                                angin.once('value',function ref(kampret){
                                                   callback(null, kampret.val().a);
                                                });
                                            },
                                            umur : function(callback){
                                                var umur = db.ref('grafik/kandang3/perhitungan');
                                                umur.once('value', function ref(snapshot){
                                                    const umur = snapshot.val().hari;

                                                    callback(null, umur);
                                                });
                                            }
                                        },function(err,results){
                                            callback(null, results);
                                        });
                                },
                                kandang4 : function (callback){
                                        async.parallel({
                                            feelslike : function(callback){
                                                var checkFeels = db.ref('kandangmirror/feelslike');

                                                checkFeels.once('value',function ref(kampret){
                                                   callback(null, kampret.val().kandang4);
                                                });

                                            },
                                            suhu : function(callback){
                                                 const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var suhu = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 4){
                                                              suhu = suhu + parseFloat(snap.val().a);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = suhu/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kelembapan : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var lembab = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 4){
                                                              lembab = lembab + parseFloat(snap.val().b);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = lembab/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kecepatan : function(callback){
                                                var angin = db.ref('kandangmirror/s/W4');

                                                angin.once('value',function ref(kampret){
                                                   callback(null, kampret.val().a);
                                                });
                                            },
                                            umur : function(callback){
                                                var umur = db.ref('grafik/kandang4/perhitungan');
                                                umur.once('value', function ref(snapshot){
                                                    const umur = snapshot.val().hari;

                                                    callback(null, umur);
                                                });
                                            }
                                        },function(err,results){
                                            callback(null, results);
                                        });
                                },
                                kandang5 : function (callback){
                                        async.parallel({
                                            feelslike : function(callback){
                                                var checkFeels = db.ref('kandangmirror/feelslike');

                                                checkFeels.once('value',function ref(kampret){
                                                   callback(null, kampret.val().kandang5);
                                                });

                                            },
                                            suhu : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var suhu = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 5){
                                                              suhu = suhu + parseFloat(snap.val().a);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = suhu/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kelembapan : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var lembab = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 5){
                                                              lembab = lembab + parseFloat(snap.val().b);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = lembab/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kecepatan : function(callback){
                                                var angin = db.ref('kandangmirror/s/W5');

                                                angin.once('value',function ref(kampret){
                                                   callback(null, kampret.val().a);
                                                });
                                            },
                                            umur : function(callback){
                                                var umur = db.ref('grafik/kandang5/perhitungan');
                                                umur.once('value', function ref(snapshot){
                                                    const umur = snapshot.val().hari;

                                                    callback(null, umur);
                                                });
                                            }
                                        },function(err,results){
                                            callback(null, results);
                                        });
                                },
                                kandang6 : function (callback){
                                        async.parallel({
                                            feelslike : function(callback){
                                                var checkFeels = db.ref('kandangmirror/feelslike');

                                                checkFeels.once('value',function ref(kampret){
                                                   callback(null, kampret.val().kandang6);
                                                });

                                            },
                                            suhu : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var suhu = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 6){
                                                              suhu = suhu + parseFloat(snap.val().a);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = suhu/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kelembapan : function(callback){
                                                  const ref_kandang = db.ref('kandangmirror/s');
                                                  ref_kandang.once('value', function (snapshot){
                                                    var lembab = 0;
                                                    var count = 0;
                                                      snapshot.forEach((snap) => {
                                                          if(snap.val().id_kandang === 6){
                                                              lembab = lembab + parseFloat(snap.val().b);
                                                              count++;
                                                          }
                                                      });
                                                        var rata = lembab/count;
                                                       callback(null, rata.toFixed(2));
                                                  });
                                            },
                                            kecepatan : function(callback){
                                                var angin = db.ref('kandangmirror/s/W6');

                                                angin.once('value',function ref(kampret){
                                                   callback(null, kampret.val().a);
                                                });
                                            },
                                            umur : function(callback){
                                                var umur = db.ref('grafik/kandang6/perhitungan');
                                                umur.once('value', function ref(snapshot){
                                                    const umur = snapshot.val().hari;

                                                    callback(null, umur);
                                                });
                                            }
                                        },function(err,results){
                                            callback(null, results);
                                        });
                                }
                          }
                        ,function(err, results){
                            //console.log(results);
                            var users = {
                                  email1: 'cimerangfarm@gmail.com',
                                  email2 : 'kerlooza@gmail.com',
                                  email3 : 'frauhoujiro@gmail.com',
                                  url: 'http://acme.com/confirm/xxx-yyy-zzz',
                                  tanggal : now,
                                  jams : jam,
                                  data : results
                              }

                            templates.render('mail3.html',users,(err, html)=>{
                                  if (err) {
                                    console.log(err);
                                  } else {
                                      transport.sendMail({
                                          from: 'Farm Cimerang <noreply@cimerang.com>',
                                          to: users.email3,
                                          subject: 'K1 '+users.data.kandang1.feelslike+'  '+users.data.kandang2.feelslike+' K2 '+users.data.kandang3.feelslike+' '+users.data.kandang4.feelslike+' K3 '+users.data.kandang5.feelslike+' '+users.data.kandang6.feelslike+' [Tanggal '+users.tanggal+' Jam : '+users.jams+']',
                                          html: html
                                          }, (err, responseStatus) => {
                                              if (err) {
                                                  console.log(err);
                                              } else {
                                                 console.log('Email send at '+jam+' to '+users.email3);
                                              }
                                          }
                                      );
                                  }
                             });
                            templates.render('mail3.html',users,(err, html)=>{
                                  if (err) {
                                    console.log(err);
                                  } else {
                                      transport.sendMail({
                                          from: 'Farm Cimerang <noreply@cimerang.com>',
                                          to: users.email1,
                                           subject: 'K1 '+users.data.kandang1.feelslike+'  '+users.data.kandang2.feelslike+' K2 '+users.data.kandang3.feelslike+' '+users.data.kandang4.feelslike+' K3 '+users.data.kandang5.feelslike+' '+users.data.kandang6.feelslike+' [Tanggal '+users.tanggal+' Jam : '+users.jams+']',
                                          html: html
                                          }, (err, responseStatus) => {
                                              if (err) {
                                                  console.log(err);
                                              } else {
                                                 console.log('Email send at '+jam+' to '+users.email1);
                                              }
                                          }
                                      );
                                  }
                             });
                             templates.render('mail3.html',users,(err, html)=>{
                                  if (err) {
                                    console.log(err);
                                  } else {
                                      transport.sendMail({
                                          from: 'Farm Cimerang <noreply@cimerang.com>',
                                          to: users.email2,
                                           subject: 'K1 '+users.data.kandang1.feelslike+'  '+users.data.kandang2.feelslike+' K2 '+users.data.kandang3.feelslike+' '+users.data.kandang4.feelslike+' K3 '+users.data.kandang5.feelslike+' '+users.data.kandang6.feelslike+' [Tanggal '+users.tanggal+' Jam : '+users.jams+']',
                                          html: html
                                          }, (err, responseStatus) => {
                                              if (err) {
                                                  console.log(err);
                                              } else {
                                                 console.log('Email send at '+jam+' to '+users.email1);
                                              }
                                          }
                                      );
                                  }
                             });
                        });
            }
        });

        
                    
               
     },
     start: true,
     timeZone: 'Asia/Jakarta',
});


//for testing via URL
app.get('/sendmail',(req, res, next) =>{
    
    var templates = new EmailTemplates({root: './views'});
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
		
    
        var templates = new EmailTemplates({root: './views'});
       
                    
                    var users = {
                        email: 'rizalyogip@gmail.com',
                        url: 'http://acme.com/confirm/xxx-yyy-zzz',
                        tanggal : now,
                        jams : jam
                    }
                    console.log(users);
                    templates.render('mail3.html',users,(err, html)=>{
                                if (err) {
                                  console.log(err);
                                } else {
                                    transport.sendMail({
                                        from: 'Farm Cimerang <noreply@cimerang.com>',
                                        to: users.email,
                                        subject: 'Kondisi Lantai Jam '+jam,
                                        html: html
                                        }, (err, responseStatus) => {
                                            if (err) {
                                                res.send(err);
                                            } else {
                                               console.log('Email send at '+jam+' to '+users.email);
                                               res.send('Mail has been send to '+users.email);
                                            }
                                        }
                                    );
                                }
                                  
   
            });
        });

// app.get('/sendmail',(req, res, next)=>{
//     res.sendFile(__dirname+'/send.html');
// });
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
    function calcTime() {

    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    var nd = new Date(utc + (3600000*7));

    // return time as a string
    return nd.toLocaleString();

}

function checkNormalize(a, b, umur){
  if((umur > 0) && (umur < 3)){
    if((a < 30) || (a > 32) || (b < 60) || (b > 70)){
      return 0;
    }else{
      return 1;
    }
    
  }else if((umur >= 3) && (umur < 6)){
    if((a < 27) || (a > 30) || (b < 60) || (b > 70)){
      return 0;
    }else{
      return 1;
    }
  }else if((umur >=6) && (umur < 9)){
    if((a < 25) || (a > 28) || (b < 60) || (b > 70)){
      return 0;
    }else{
      return 1;
    }
  }else if((umur >= 9) && (umur < 12)){
   if((a < 25) || (a > 28) || (b < 60) || (b > 70)){
      return 0;
    }else{
      return 1;
    }
  }else if((umur >= 12) && (umur < 15)){
    if((a < 25) || (a > 26) || (b < 60) || (b > 70)){
      return 0;
    }else{
      return 1;
    }
  }else{
    if((a < 24) || (a > 25) || (b < 60) || (b > 70)){
      return 0;
    }else{
      return 1;
    }
  }
}
// function getUmur(kandang){
//           var test = [];
//           const ref_umur = db.ref('grafik/kandang'+kandang+'/perhitungan');
//           ref_umur.once('value', function(grafik){
//              var umur = grafik.val().hari;
//               test.push(umur);
//           });

//     var test = 0;
//     blabla.balba((callback,result)=>{
//         test = result;
//     }).Sync();
    
//     return test;
// }
module.exports = app;


