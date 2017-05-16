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
var checkFeels = db.ref('kandangmirror/feelslike');

        checkFeels.once('value',function ref(kampret){
           console.log(kampret.val().kandang1);
        });
//cron job every 30 minutes
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
        var checkFeels = db.ref('kandangmirror/feelslike');

        checkFeels.once('value',function ref(kampret){
            var error = 0;
            var sukses = 0;
            kampret.forEach((snapshot) => {
                const check = snapshot.val();
             
                if((check < 23.5) || (check > 30.5)){
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
                                                  const suhu = 29;
                                                  callback(null, suhu);
                                            },
                                            kelembapan : function(callback){
                                                  const kelembapan = 80;
                                                  callback(null, kelembapan);
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
                                                  const suhu = 30;
                                                  callback(null, suhu);
                                            },
                                            kelembapan : function(callback){
                                                  const kelembapan = 80;
                                                  callback(null, kelembapan);
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
                                                  const suhu = 33;
                                                  callback(null, suhu);
                                            },
                                            kelembapan : function(callback){
                                                  const kelembapan = 80;
                                                  callback(null, kelembapan);
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
                                                  const suhu = 33;
                                                  callback(null, suhu);
                                            },
                                            kelembapan : function(callback){
                                                  const kelembapan = 80;
                                                  callback(null, kelembapan);
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
                                                  const suhu = 33;
                                                  callback(null, suhu);
                                            },
                                            kelembapan : function(callback){
                                                  const kelembapan = 80;
                                                  callback(null, kelembapan);
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
                                                  const suhu = 33;
                                                  callback(null, suhu);
                                            },
                                            kelembapan : function(callback){
                                                  const kelembapan = 80;
                                                  callback(null, kelembapan);
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
                            console.log(results);
                            var users = {
                                  email1: 'kerlooza@gmail.com',
                                  email2 : 'fsbayuaji@gmail.com',
                                  email3 : 'rizalyogip@gmail.com',
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
                                          subject: 'K1L1 '+users.data.kandang1.feelslike+' K1L2 '+users.data.kandang2.feelslike+' K2L1 '+users.data.kandang3.feelslike+' K2L2 '+users.data.kandang4.feelslike+' K3L1 '+users.data.kandang5.feelslike+' K3L2 '+users.data.kandang6.feelslike+' [Tanggal '+users.tanggal+' Jam : '+users.jams+']',
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
                                          subject: 'K1L1 '+users.data.kandang1.feelslike+' K1L2 '+users.data.kandang2.feelslike+' K2L1 '+users.data.kandang3.feelslike+' K2L2 '+users.data.kandang4.feelslike+' K3L1 '+users.data.kandang5.feelslike+' K3L2 '+users.data.kandang6.feelslike+' [Tanggal '+users.tanggal+' Jam : '+users.jams+']',
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
                                          subject: 'K1L1 '+users.data.kandang1.feelslike+' K1L2 '+users.data.kandang2.feelslike+' K2L1 '+users.data.kandang3.feelslike+' K2L2 '+users.data.kandang4.feelslike+' K3L1 '+users.data.kandang5.feelslike+' K3L2 '+users.data.kandang6.feelslike+' [Tanggal '+users.tanggal+' Jam : '+users.jams+']',
                                          html: html
                                          }, (err, responseStatus) => {
                                              if (err) {
                                                  console.log(err);
                                              } else {
                                                 console.log('Email send at '+jam+' to '+users.email2);
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
        async.parallel({
                    feels_like_1: function(callback) {
                        //Database Reference
                            var ref = db.ref('grafik/kandang1/perhitungan');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              // var count = 0;
                              // var totalSuhu = 0;
                              // var totalHumidity = 0;

                              // snapshot.forEach(function (childSnapshot) {

                              //   if (childSnapshot.val().lantai == 1) {
                              //     var suhu = parseFloat(childSnapshot.val().a);
                              //     var humidity = parseFloat(childSnapshot.val().b);   
                                            
                              //     if (childSnapshot.val().lantai == 1) {
                              //       totalSuhu = totalSuhu + suhu;
                              //       totalHumidity += humidity;
                              //       count++;
                              //     }

                              //   }
                              // });

                              // var rerataSuhu = totalSuhu / count;
                              // var rerataHumidity = totalHumidity / count;

                              // var rerataFeelsLike = feels_Like(rerataHumidity, rerataSuhu);
                              // console.log(snapshot);
                              const rerataFeelsLike = 23;
                              callback(null, rerataFeelsLike);
                            });
                    },
                    feels_like_2: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;
                              var totalHumidity = 0;
                              snapshot.forEach(function (childSnapshot) {

                                if (childSnapshot.val().lantai == 2) {
                                  var suhu = parseFloat(childSnapshot.val().a);
                                  var humidity = parseFloat(childSnapshot.val().b);   
                                          
                                  if (childSnapshot.val().lantai == 2) {
                                    totalSuhu = totalSuhu + suhu;
                                    totalHumidity += humidity;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = totalSuhu / count;
                              var rerataHumidity = totalHumidity / count;

                              var rerataFeelsLike = feels_Like(rerataHumidity, rerataSuhu);
                              callback(null, rerataFeelsLike);
                            });
                    },
                    suhu_indor_1: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;

                              snapshot.forEach(function (childSnapshot) {

                                if ((childSnapshot.val().lantai == 1)  && ((childSnapshot.key).substring(0,1) == 'S')) {
                                  var suhu = parseFloat(childSnapshot.val().a);
                                            
                                  if (childSnapshot.val().lantai == 1) {
                                    totalSuhu = totalSuhu + suhu;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = (totalSuhu / count).toFixed(2);

                              
                              callback(null, rerataSuhu);
                            });
                    },
                    suhu_indor_2: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;

                              snapshot.forEach(function (childSnapshot) {
                                if ((childSnapshot.val().lantai == 2) && ((childSnapshot.key).substring(0,1) == 'S')) {
                                  var suhu = parseFloat(childSnapshot.val().a);
                                            
                                  if (childSnapshot.val().lantai == 2) {
                                    totalSuhu = totalSuhu + suhu;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = (totalSuhu / count).toFixed(2);

                              
                              callback(null, rerataSuhu);
                            });
                    },
                    
                    kelembaban_indor_1: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;

                              snapshot.forEach(function (childSnapshot) {

                                if ((childSnapshot.val().lantai == 1)  && ((childSnapshot.key).substring(0,1) == 'S')) {
                                  var suhu = parseFloat(childSnapshot.val().b);
                                            
                                  if (childSnapshot.val().lantai == 1) {
                                    totalSuhu = totalSuhu + suhu;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = (totalSuhu / count).toFixed(2);

                              
                              callback(null, rerataSuhu);
                            });
                    },
                    kelambaban_indor_2: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;

                              snapshot.forEach(function (childSnapshot) {
                                if ((childSnapshot.val().lantai == 2) && ((childSnapshot.key).substring(0,1) == 'S')) {
                                  var suhu = parseFloat(childSnapshot.val().b);
                                            
                                  if (childSnapshot.val().lantai == 2) {
                                    totalSuhu = totalSuhu + suhu;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = (totalSuhu / count).toFixed(2);

                              
                              callback(null, rerataSuhu);
                            });
                    },
                    kecepatan_indor_1: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;

                              snapshot.forEach(function (childSnapshot) {

                                if ((childSnapshot.val().lantai == 1)  && ((childSnapshot.key).substring(0,1) == 'W')) {
                                  var suhu = parseFloat(childSnapshot.val().a);
                                            
                                  if (childSnapshot.val().lantai == 1) {
                                    totalSuhu = totalSuhu + suhu;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = (totalSuhu / count).toFixed(2);

                              
                              callback(null, rerataSuhu);
                            });
                    },
                    kecepatan_indor_2: function(callback) {
                        var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;

                              snapshot.forEach(function (childSnapshot) {
                                if ((childSnapshot.val().lantai == 2) && ((childSnapshot.key).substring(0,1) == 'W')) {
                                  var suhu = parseFloat(childSnapshot.val().a);
                                            
                                  if (childSnapshot.val().lantai == 2) {
                                    totalSuhu = totalSuhu + suhu;
                                    count++;
                                  }

                                }
                              });

                              var rerataSuhu = (totalSuhu / count).toFixed(2);

                              
                              callback(null, rerataSuhu);
                            });
                    }
                }, function(err, results) {
                    
                    var users = {
                        email: 'kerlooza@gmail.com',
                        url: 'http://acme.com/confirm/xxx-yyy-zzz',
                        tanggal : now,
                        jams : jam,
                        data : results
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
                                                console.log(err);
                                            } else {
                                               console.log('Email send at '+jam+' to '+users.email);
                                               res.send('Mail has been send to '+users.email);
                                            }
                                        }
                                    );
                                }
                           
                    //res.send("test");                    
                });
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
  if(umur === 1){
    if((a < 29.25) || (a > 32.25) || (b < 60) || (b > 70)){
      return 0;
    }
    
  }else if((umur === 3) && (a < 27) || (a > 30) && (b < 60) || (b > 70)){
    return 0;
  }else if((umur === 6) && (a < 25) || (a > 28) && (b < 60) || (b > 70)){
    return 0;
  }else if((umur === 9) && (a < 25) || (a > 28) && (b < 60) || (b > 70)){
    return 0;
  }else if((umur === 12) && (a < 25) || (a > 26) && (b < 60) || (b > 70)){
    return 0;
  }else if((umur > 15) && (a < 24) || (a > 25) || (b < 60) || (b > 70)){
    return 0;
  }else{
    return 1;
  }
}
module.exports = app;


