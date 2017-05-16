
//cek kondisi
var ref2 = db.ref().child('kandangmirror').child('s');
  ref2.on('child_changed',function(snapshot){

    var changedPost = snapshot.val();
    var suhu = changedPost.a;
    var kelembapan = changedPost.b;
    if(changedPost.lantai === 1){
        async.parallel({
          cek_kandang1 : function(callback){
              var ref_cek1 = db.ref('grafik/kandang1/perhitungan');
              ref_cek1.once('value',function ref(vals){
                  const umur = vals.val().hari;
                  var check = checkNormalize(suhu, kelembapan, umur);

                  callback(null, check);
              });
          },  
           cek_kandang3 : function(callback){
              var ref_cek1 = db.ref('grafik/kandang3/perhitungan');
              ref_cek1.once('value',function ref(vals){
                  const umur = vals.val().hari;
                  var check = checkNormalize(suhu, kelembapan, umur);

                  callback(null, check);
              });
          }, 
          cek_kandang5: function(callback){
              var ref_cek1 = db.ref('grafik/kandang5/perhitungan');
              ref_cek1.once('value',function ref(vals){
                  const umur = vals.val().hari;
                  var check = checkNormalize(suhu, kelembapan, umur);

                  callback(null, check);
              });
          }  
        }, function (err, results){
              if((results.cek_kandang1 === 0) || (results.cek_kandang3 === 0) || (results.cek_kandang5 === 0)){

              }else{
                console.log('Everything is fine');
              }
          });
    }else{

    }
    
      
  });



  //test
  async.parallel({
                    feels_like_1: function(callback) {
                        //Database Reference
                            var ref = db.ref('kandangmirror/s');

                            //Read Data
                            ref.once('value', function ref(snapshot) {
                              var count = 0;
                              var totalSuhu = 0;
                              var totalHumidity = 0;

                              snapshot.forEach(function (childSnapshot) {

                                if (childSnapshot.val().lantai == 1) {
                                  var suhu = parseFloat(childSnapshot.val().a);
                                  var humidity = parseFloat(childSnapshot.val().b);   
                                            
                                  if (childSnapshot.val().lantai == 1) {
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
                    console.log(results);
                    var users = {
                        email1: 'kerlooza@gmail.com',
                        email2 : 'adammbachtiar@gmail.com',
                        email3 : 'rizalyogip@gmail.com',
                        url: 'http://acme.com/confirm/xxx-yyy-zzz',
                        tanggal : now,
                        jams : jam,
                        data : results
                    }
                    templates.render('mail.html',users,(err, html)=>{
                                if (err) {
                                  console.log(err);
                                } else {
                                    transport.sendMail({
                                        from: 'Farm Cimerang <noreply@cimerang.com>',
                                        to: users.email1,
                                        subject: 'Kondisi Lantai Tanggal '+now+' Jam '+jam,
                                        html: html
                                        }, (err, responseStatus) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                               console.log('Email send at '+jam+' to '+users.email);
                                            }
                                        }
                                    );
                                }
                           });
                    templates.render('mail.html',users,(err, html)=>{
                                if (err) {
                                  console.log(err);
                                } else {
                                    transport.sendMail({
                                        from: 'Farm Cimerang <noreply@cimerang.com>',
                                        to: users.email2,
                                        subject: 'Kondisi Lantai Tanggal '+now+' Jam '+jam,
                                        html: html
                                        }, (err, responseStatus) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                               console.log('Email send at '+jam+' to '+users.email);
                                            }
                                        }
                                    );
                                }
                           });