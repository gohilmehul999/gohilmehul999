// mongo db data data inserted
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "mehul", address: "Highway 8" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });


// mongodb find one data in database 
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) { if (err) throw err;  var dbo = db.db("mydb");
//   //Find the first document in the customers collection:
//   dbo.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.address);
//     db.close();
//   });
// });

// mongodb some data in database
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err)
//         throw err;
//     var dbo = db.db('mydb');
//     dbo.collection("customers").find({},{projection:{_id: 0, name: 1 }}).toArray(function (err, result) {
//         if (err)
//             throw err;
//         console.log(result);
//         db.close();
//     })
// })

// mongodb quiry to filter database record 
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err)
//         throw err;
//     var dbo = db.db('mydb');
//     var quiry = {address:"Highway 8"}
//     dbo.collection("customers").find(quiry).toArray(function (err, result) {
//         if (err)
//             throw err;
//         console.log(result);
//         db.close();
//     })
// })

// mongodb regular exresstion to filter the database record
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err)
//         throw err;
//     var dbo = db.db('mydb');
//     var quiry = {name:/^m/,address:/^H/}
//     dbo.collection("customers").find(quiry).toArray(function (err, result) {
//         if (err)
//             throw err;
//         console.log(result);
//         db.close();
//     })
// })



// mongodb regular exresstion to filter the database record
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err)
//         throw err;
//     var dbo = db.db('mydb');
//     var sortrecord = {name:-1}
//     dbo.collection("customers").find().sort(sortrecord).toArray(function (err, result) {
//         if (err)
//             throw err;
//         console.log(result);
//         db.close();
//     })
// })


// mongodb record delete in databse
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/';

// MongoClient.connect(url,function(err,db){
//     if(err) throw err;
//     var dbo = db.db('mydb');
//     var deleterecord = {name:'mehul'};

//     dbo.collection('customers').deleteOne(deleterecord,function(err,result){
//         if(err) throw err;
//         console.log("1 document deleted");
//         db.close();
//     })
// })


// collection drop in mongo database
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").drop(function(err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("Collection deleted");
//     db.close();
//   });
// });


// updateone record in mongo database
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/';

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db('mydb');
//     var oldvalue = { name: 'SHIVAM' }
//     var newvalue = { $set: { name: "Michael", address: "Canyon 123"  } }
//     dbo.collection('user').updateOne(oldvalue, newvalue, function (err, upvalue) {
//         if (err) throw err;
//         console.log("updated")
//     })
// });